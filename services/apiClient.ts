import { getToken } from "./authService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://uniclick-backend.onrender.com";

const headersWithToken = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

export const apiClient = {
  get: async (endpoint: string, params?: Record<string, any>) => {
    const urlParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    const response = await fetch(`${API_URL}${endpoint}${urlParams}`, {
      headers: headersWithToken(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: headersWithToken(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: headersWithToken(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },

  delete: async (endpoint: string, data?: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: headersWithToken(),
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },

  uploadFile: async (endpoint: string, formData: FormData) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },
};
