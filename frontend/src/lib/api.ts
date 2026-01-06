// Para desenvolvimento local, use: http://localhost:3000/api
// Para produção, configure a variável VITE_API_BASE_URL com a URL do seu backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Log para debug (remover em produção)
if (import.meta.env.DEV) {
  console.log("🔗 API Base URL:", API_BASE_URL);
}

export interface Notification {
  id: string;
  type: string;
  resource: string | null;
  data: any;
  timestamp: string;
  read: boolean;
}

export interface UserMe {
  id: number | string;
  nickname?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  picture?: string;
  [key: string]: any;
}

export const api = {
  async getNotifications(): Promise<Notification[]> {
    const response = await fetch(`${API_BASE_URL}/ml/notifications`);
    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    const data = await response.json();
    return data.notifications || [];
  },

  async getMe(): Promise<UserMe> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/me`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (import.meta.env.DEV) {
        console.log("📦 API Response:", data);
      }
      
      if (!data.ok) {
        throw new Error(data.error || "Failed to fetch user data");
      }
      
      if (!data.me) {
        throw new Error("User data not found in response");
      }
      
      return data.me;
    } catch (error) {
      console.error("Error in getMe:", error);
      throw error;
    }
  },
};

