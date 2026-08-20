const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function buildUrl(endpoint, params = {}) {
  const url = new URL(`${API_BASE}${endpoint}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

/**
 * Generic request function
 */
async function request(endpoint, options = {}) {
  const { params, body, method = "GET", headers = {} } = options;

  const url = buildUrl(endpoint, params);

  // Build headers based on method - avoid setting Content-Type for GET requests
  // as it triggers unnecessary CORS preflight
  const defaultHeaders = {
    Accept: "application/json",
  };

  // Only add Content-Type for methods that have a body
  if (method !== "GET" && method !== "HEAD") {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  // Add body for non-GET requests
  if (body && method !== "GET" && method !== "HEAD") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Log successful requests in development
    if (import.meta.env.DEV) {
      console.log(`[API] ${method} ${endpoint} - ${response.status}`);
    }

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData?.message || errorData?.Message || errorMessage;
      } catch {
        // If response isn't JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      throw new Error(errorMessage);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return { data: null, status: 204 };
    }

    const data = await response.json().catch(() => null);
    return { data, status: response.status };
  } catch (error) {
    // Handle CORS errors specifically
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      console.error(`[CORS Error] ${method} ${endpoint}`);
      console.error("Request URL:", url);
      console.error("Request config:", {
        ...config,
        headers: config.headers,
      });

      throw new Error(
        "Network error: Unable to connect to server. This may be due to CORS restrictions. " +
          "Please ensure the backend allows requests from this origin.",
      );
    }

    // Re-throw other errors
    throw error;
  }
}

/**
 * Public API client - for non-authenticated endpoints
 */
export const apiClient = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {object} params - Query parameters
   * @returns {Promise<{data: any, status: number}>}
   */
  get(endpoint, params) {
    return request(endpoint, { method: "GET", params });
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @returns {Promise<{data: any, status: number}>}
   */
  post(endpoint, body) {
    return request(endpoint, { method: "POST", body });
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @returns {Promise<{data: any, status: number}>}
   */
  put(endpoint, body) {
    return request(endpoint, { method: "PUT", body });
  },

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {object} body - Request body
   * @returns {Promise<{data: any, status: number}>}
   */
  patch(endpoint, body) {
    return request(endpoint, { method: "PATCH", body });
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<{data: any, status: number}>}
   */
  delete(endpoint) {
    return request(endpoint, { method: "DELETE" });
  },
};

/**
 * Authenticated API client - for endpoints requiring authentication
 * Uses credentials: 'include' to send cookies
 */
export const authApiClient = {
  get(endpoint, params) {
    return request(endpoint, { method: "GET", params });
  },

  post(endpoint, body) {
    return request(endpoint, { method: "POST", body });
  },

  put(endpoint, body) {
    return request(endpoint, { method: "PUT", body });
  },

  patch(endpoint, body) {
    return request(endpoint, { method: "PATCH", body });
  },

  delete(endpoint) {
    return request(endpoint, { method: "DELETE" });
  },
};

export default apiClient;
