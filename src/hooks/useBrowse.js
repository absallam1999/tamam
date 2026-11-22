import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";

// ============================================
// Query Keys
// ============================================

export const BROWSE_STORES_KEY = "browse-stores";
export const BROWSE_CITIES_KEY = "browse-cities";
export const ALL_STORES_KEY = "all-stores";

// ============================================
// Constants
// ============================================

const PAGE_SIZE = 12;

// Fallback radius when the city object doesn't expose one
const DEFAULT_RADIUS_KM = 50;

// ============================================
// Helpers
// ============================================

function unwrap(response) {
  if (response && typeof response === "object" && "data" in response) {
    return response.data;
  }
  return response;
}

/**
 * Normalizes a store-listing API response.
 */
function normalizeStoresResponse(result, requestedPage) {
  const inner =
    result &&
    typeof result === "object" &&
    "data" in result &&
    !Array.isArray(result)
      ? result.data
      : result;

  if (Array.isArray(inner)) {
    return {
      stores: inner,
      total: inner.length,
      totalPages: 1,
      page: requestedPage,
    };
  }

  const stores = Array.isArray(inner?.items) ? inner.items : [];
  const total =
    inner?.total ?? inner?.totalCount ?? inner?.totalItems ?? stores.length;
  const totalPages =
    inner?.totalPages ??
    inner?.pageCount ??
    Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = inner?.page ?? inner?.pageIndex ?? requestedPage;

  return { stores, total, totalPages, page };
}

/**
 * Picks the "effective" city for location context:
 *   - the explicitly selected one, OR
 *   - the first city in the browse list (default landing area)
 * Returns null while cities haven't loaded yet.
 */
function resolveEffectiveCity(cities, selectedCityId) {
  if (!cities || cities.length === 0) return null;
  if (!selectedCityId) return cities[0];
  return cities.find((c) => c.id === selectedCityId) ?? cities[0];
}

// ============================================
// useBrowse Hook (Home page)
// ============================================

export function useBrowse() {
  const [search, setSearch] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  // ── Cities (needed for coordinates) ────────────────────────────────────
  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: [BROWSE_CITIES_KEY],
    queryFn: async () => {
      const response = await apiClient.get("/api/cities/browse");
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    staleTime: 5 * 60_000,
  });

  // ── Derive location context from the effective city ────────────────────
  const effectiveCity = resolveEffectiveCity(cities, selectedCityId);
  const latitude = effectiveCity?.centerLatitude ?? null;
  const longitude = effectiveCity?.centerLongitude ?? null;
  const radiusKm = effectiveCity?.radiusKm ?? DEFAULT_RADIUS_KM;

  // ── Stores ─────────────────────────────────────────────────────────────
  const {
    data: stores,
    isLoading: storesQueryLoading,
    isError: storesError,
    error: storesErr,
    refetch: refetchStores,
  } = useQuery({
    queryKey: [
      BROWSE_STORES_KEY,
      search,
      selectedCityId,
      latitude,
      longitude,
    ],
    queryFn: async () => {
      const params = {};
      if (search) params.q = search;
      if (selectedCityId) params.cityId = selectedCityId;

      // /nearby requires location context — pass lat/lng + radius when
      // we're not performing a text search.
      if (!search && latitude != null && longitude != null) {
        params.latitude = latitude;
        params.longitude = longitude;
        params.radiusKm = radiusKm;
      }

      const endpoint = search
        ? "/api/browse/stores/search"
        : "/api/browse/stores/nearby";

      const response = await apiClient.get(endpoint, params);
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    // Wait for cities → coords before firing /nearby (search can fire immediately)
    enabled: !!search || (latitude != null && longitude != null),
    staleTime: 60_000,
  });

  // Combined loading state — includes the “waiting for cities” phase so the
  // UI shows the skeleton instead of a false “no stores” flash.
  const storesLoading = storesQueryLoading || (!search && citiesLoading);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleCityChange = useCallback((cityId) => {
    setSelectedCityId(cityId);
  }, []);

  return {
    stores: stores ?? [],
    cities: cities ?? [],
    search,
    selectedCityId,
    storesLoading,
    citiesLoading,
    storesError,
    storesErr,
    handleSearch,
    handleCityChange,
    refetchStores,
  };
}

// ============================================
// useAllStores Hook (Stores page with pagination)
// ============================================

export function useAllStores() {
  const [search, setSearch] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [page, setPage] = useState(1);

  // ── Cities ─────────────────────────────────────────────────────────────
  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: [BROWSE_CITIES_KEY],
    queryFn: async () => {
      const response = await apiClient.get("/api/cities/browse");
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    staleTime: 5 * 60_000,
  });

  // ── Effective city → coordinates ───────────────────────────────────────
  const effectiveCity = resolveEffectiveCity(cities, selectedCityId);
  const latitude = effectiveCity?.centerLatitude ?? null;
  const longitude = effectiveCity?.centerLongitude ?? null;
  const radiusKm = effectiveCity?.radiusKm ?? DEFAULT_RADIUS_KM;

  // ── Stores ─────────────────────────────────────────────────────────────
  const {
    data: storesData,
    isLoading: storesQueryLoading,
    isError: storesError,
    error: storesErr,
    refetch: refetchStores,
  } = useQuery({
    queryKey: [
      ALL_STORES_KEY,
      search,
      selectedCityId,
      page,
      latitude,
      longitude,
    ],
    queryFn: async () => {
      const params = { page, limit: PAGE_SIZE };
      if (selectedCityId) params.cityId = selectedCityId;
      if (search) params.q = search;

      if (!search && latitude != null && longitude != null) {
        params.latitude = latitude;
        params.longitude = longitude;
        params.radiusKm = radiusKm;
      }

      const endpoint = search
        ? "/api/browse/stores/search"
        : "/api/browse/stores/nearby";

      const response = await apiClient.get(endpoint, params);
      const result = unwrap(response.data);

      return normalizeStoresResponse(result, page);
    },
    enabled: !!search || (latitude != null && longitude != null),
    staleTime: 60_000,
    keepPreviousData: true,
  });

  const storesLoading = storesQueryLoading || (!search && citiesLoading);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCityChange = useCallback((cityId) => {
    setSelectedCityId(cityId);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return {
    stores: storesData?.stores ?? [],
    cities: cities ?? [],
    search,
    selectedCityId,
    page,
    totalPages: storesData?.totalPages ?? 0,
    total: storesData?.total ?? 0,
    storesLoading,
    citiesLoading,
    storesError,
    storesErr,
    handleSearch,
    handleCityChange,
    handlePageChange,
    refetchStores,
    pageSize: PAGE_SIZE,
  };
}