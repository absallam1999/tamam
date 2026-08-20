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

// ============================================
// Helpers
// ============================================

function unwrap(response) {
  if (response && typeof response === "object" && "data" in response) {
    return response.data;
  }
  return response;
}

// ============================================
// useBrowse Hook (Home page)
// ============================================

export function useBrowse() {
  const [search, setSearch] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");

  const {
    data: stores,
    isLoading: storesLoading,
    isError: storesError,
    error: storesErr,
    refetch: refetchStores,
  } = useQuery({
    queryKey: [BROWSE_STORES_KEY, search, selectedCityId],
    queryFn: async () => {
      const params = {};
      if (search) params.query = search;
      if (selectedCityId) params.cityId = selectedCityId;

      const response = await apiClient.get(
        search ? "/api/browse/stores/search" : "/api/browse/stores/nearby",
        params,
      );
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    staleTime: 60_000,
  });

  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: [BROWSE_CITIES_KEY],
    queryFn: async () => {
      const response = await apiClient.get("/api/public/cities");
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    staleTime: 5 * 60_000,
  });

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

  const {
    data: storesData,
    isLoading: storesLoading,
    isError: storesError,
    error: storesErr,
    refetch: refetchStores,
  } = useQuery({
    queryKey: [ALL_STORES_KEY, search, selectedCityId, page],
    queryFn: async () => {
      const params = {
        page,
        limit: PAGE_SIZE,
      };
      if (search) params.query = search;
      if (selectedCityId) params.cityId = selectedCityId;

      const response = await apiClient.get("/api/browse/stores/search", params);
      const result = unwrap(response);

      return {
        stores: Array.isArray(result) ? result : (result?.data ?? []),
        total: result?.total ?? 0,
        totalPages:
          result?.totalPages ?? Math.ceil((result?.total ?? 0) / PAGE_SIZE),
        page: result?.page ?? page,
      };
    },
    staleTime: 60_000,
    keepPreviousData: true,
  });

  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: [BROWSE_CITIES_KEY],
    queryFn: async () => {
      const response = await apiClient.get("/api/public/cities");
      const result = unwrap(response.data);
      return Array.isArray(result) ? result : (result?.data ?? []);
    },
    staleTime: 5 * 60_000,
  });

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
