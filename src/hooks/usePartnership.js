import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../lib/api-client";

// ============================================
// Hook
// ============================================

export function usePartnership() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [storeTypes, setStoreTypes] = useState([]);
  const [typesLoading, setTypesLoading] = useState(false);

  /**
   * Fetch available store types
   * GET /api/admin/stores/types/active
   */
  useEffect(() => {
    setTypesLoading(true);
    apiClient
      .get("/api/admin/stores/types/active")
      .then((res) => {
        const data = res?.data || res;
        setStoreTypes(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // Silent fail — store types are optional
        setStoreTypes([]);
      })
      .finally(() => setTypesLoading(false));
  }, []);

  /**
   * Submit a store partnership request
   * POST /api/requests
   */
  const submitStoreRequest = useCallback(async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const dto = {
        name: formData.businessName || formData.ownerName,
        phoneNumber: formData.phone,
        email: formData.email || "",
        address: formData.address || "",
        city: formData.city || "",
        prandName: formData.businessName || "",
        note: formData.description || "",
        types:
          formData.selectedTypes?.length > 0
            ? formData.selectedTypes
            : formData.category
              ? [formData.category]
              : ["other"],
      };

      const response = await apiClient.post("/api/requests", dto);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || "Failed to submit request");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  /**
   * Submit a store request with attachment
   * POST /api/requests/with-attachment
   */
  const submitStoreRequestWithAttachment = useCallback(
    async (formData, file) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const form = new FormData();
        form.append("name", formData.businessName || formData.ownerName);
        form.append("phoneNumber", formData.phone);
        form.append("email", formData.email || "");
        form.append("address", formData.address || "");
        form.append("city", formData.city || "");
        form.append("prandName", formData.businessName || "");
        form.append("note", formData.description || "");
        form.append(
          "types",
          formData.selectedTypes?.length > 0
            ? formData.selectedTypes.join(",")
            : formData.category || "other",
        );
        form.append("requestType", "store");
        if (file) {
          form.append("attachment", file);
        }

        const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(
          `${API_BASE}/api/requests/with-attachment`,
          {
            method: "POST",
            body: form,
            credentials: "include",
          },
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.message || "Failed to submit request");
        }

        setSuccess(true);
        return await response.json();
      } catch (err) {
        setError(err.message || "Failed to submit request");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  /**
   * Submit a courier/driver interest request
   */
  const submitCourierRequest = useCallback(async (formData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const dto = {
        name: formData.ownerName,
        phoneNumber: formData.phone,
        email: formData.email || "",
        address: formData.address || "",
        city: formData.city || "",
        prandName: "",
        note: `Courier application: ${formData.description || ""}. Vehicle: ${formData.vehicleType || "Not specified"}`,
        types: ["courier"],
        requestType: "courier",
      };

      const response = await apiClient.post("/api/requests", dto);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message || "Failed to submit request");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    error,
    success,
    storeTypes,
    typesLoading,
    submitStoreRequest,
    submitStoreRequestWithAttachment,
    submitCourierRequest,
    reset,
  };
}
