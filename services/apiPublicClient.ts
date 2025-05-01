const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://uniclick-backend.onrender.com";

const headers = {
  "Content-Type": "application/json",
};

export const apiPublicClient = {
  get: async (endpoint: string, params?: Record<string, any>) => {
    const urlParams = params ? `?${new URLSearchParams(params).toString()}` : '';
    const response = await fetch(`${API_URL}${endpoint}${urlParams}`, { headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
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
      headers,
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
      headers,
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${response.status}`);
    }
    return response.json();
  },
};
