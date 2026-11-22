import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../lib/api-client";

const STORE_ONBOARDING_ENDPOINT = "/api/onboarding/store";
const DRIVER_ONBOARDING_ENDPOINT = "/api/onboarding/driver";
const SUPERVISOR_ONBOARDING_ENDPOINT = "/api/onboarding/supervisor";
const STORE_CATEGORIES_ACTIVE_ENDPOINT = "/api/browse/store-categories";

function unwrapResponse(response) {
  let current = response;
  if (current && typeof current === "object" && "data" in current) {
    current = current.data;
  }
  if (
    current &&
    typeof current === "object" &&
    !Array.isArray(current) &&
    "success" in current &&
    "data" in current
  ) {
    current = current.data;
  }
  return current;
}

function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.title ||
    error?.message ||
    fallback
  );
}

function requiredValue(value, fieldName) {
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
  return value;
}

// ---------------------------------------------------------------------------
// Payload builders
// ---------------------------------------------------------------------------

function getStorePayload(formData) {
  return {
    ownerName: requiredValue(
      formData.ownerName || formData.businessOwnerName,
      "Owner name",
    ),
    phoneNumber: requiredValue(
      formData.phone || formData.phoneNumber,
      "Phone number",
    ),
    email: formData.email?.trim() || null,
    storeNameAr: requiredValue(
      formData.storeNameAr || formData.businessNameAr || formData.businessName,
      "Arabic store name",
    ),
    storeNameEn: requiredValue(
      formData.storeNameEn || formData.businessNameEn || formData.businessName,
      "English store name",
    ),
    storeDescriptionAr:
      formData.storeDescriptionAr ||
      formData.descriptionAr ||
      formData.description ||
      null,
    storeDescriptionEn:
      formData.storeDescriptionEn ||
      formData.descriptionEn ||
      formData.description ||
      null,
    storeCategoryId: requiredValue(
      formData.storeCategoryId || formData.categoryId,
      "Store category",
    ),
    storeStreetAr:
      formData.storeStreetAr || formData.streetAr || formData.address || null,
    storeStreetEn:
      formData.storeStreetEn || formData.streetEn || formData.address || null,
    cityId: requiredValue(formData.cityId, "City"),
    latitude: formData.latitude ?? formData.lat ?? null,
    longitude: formData.longitude ?? formData.lng ?? null,
    notes: formData.notes || formData.description || null,
  };
}

function getDriverPayload(formData) {
  return {
    fullName: requiredValue(
      formData.fullName || formData.ownerName || formData.name,
      "Full name",
    ),
    phoneNumber: requiredValue(
      formData.phone || formData.phoneNumber,
      "Phone number",
    ),
    email: formData.email?.trim() || null,
    vehicleType: requiredValue(formData.vehicleType, "Vehicle type"),
    vehiclePlate: requiredValue(
      formData.vehiclePlate || formData.plateNumber,
      "Vehicle plate",
    ),
    licenseNumber: formData.licenseNumber || null,
    licenseExpiresAt: formData.licenseExpiresAt || null,
    cityId: requiredValue(formData.cityId, "City"),
    area: formData.area || null,
    attachmentUrl: formData.attachmentUrl || null,
    attachmentUrls: Array.isArray(formData.attachmentUrls)
      ? formData.attachmentUrls
      : null,
    notes:
      formData.notes ||
      `Courier application: ${formData.description || ""}`.trim(),
  };
}

function getSupervisorPayload(formData) {
  return {
    fullName: requiredValue(
      formData.fullName || formData.ownerName || formData.name,
      "Full name",
    ),
    phoneNumber: requiredValue(
      formData.phone || formData.phoneNumber,
      "Phone number",
    ),
    email: formData.email?.trim() || null,
    cityId: requiredValue(formData.cityId, "City"),
    areaIds: Array.isArray(formData.areaIds) ? formData.areaIds : null,
    notes: formData.notes || formData.description || null,
  };
}

export function usePartnership() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [storeCategories, setStoreCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const fetchActiveStoreCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const response = await apiClient.get(STORE_CATEGORIES_ACTIVE_ENDPOINT);
      const data = unwrapResponse(response);
      const items = Array.isArray(data) ? data : data?.items;
      const result = Array.isArray(items) ? items : [];
      setStoreCategories(result);
      return result;
    } catch (cause) {
      setStoreCategories([]);
      throw cause;
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveStoreCategories().catch(() => {
      // Store categories are optional
    });
  }, [fetchActiveStoreCategories]);

  const submit = useCallback(async (endpoint, payload) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await apiClient.post(endpoint, payload);
      const result = unwrapResponse(response);
      setSuccess(true);
      return result;
    } catch (cause) {
      const message = getErrorMessage(
        cause,
        "Failed to submit onboarding request",
      );
      setError(message);
      throw cause;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const submitStoreRequest = useCallback(
    (formData) => submit(STORE_ONBOARDING_ENDPOINT, getStorePayload(formData)),
    [submit],
  );

  const submitStoreRequestWithAttachment = useCallback(() => {
    const cause = new Error(
      "Store onboarding attachments are not supported by the current API contract.",
    );
    setError(cause.message);
    return Promise.reject(cause);
  }, []);

  const submitCourierRequest = useCallback(
    (formData) => submit(DRIVER_ONBOARDING_ENDPOINT, getDriverPayload(formData)),
    [submit],
  );

  const submitDriverRequest = submitCourierRequest;

  const submitSupervisorRequest = useCallback(
    (formData) =>
      submit(SUPERVISOR_ONBOARDING_ENDPOINT, getSupervisorPayload(formData)),
    [submit],
  );

  const submitSupervisorOnboarding = submitSupervisorRequest;

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    storeCategories,
    categoriesLoading,
    fetchActiveStoreCategories,
    submitStoreRequest,
    submitStoreRequestWithAttachment,
    submitCourierRequest,
    submitDriverRequest,
    submitSupervisorRequest,
    submitSupervisorOnboarding,
    reset,
  };
}