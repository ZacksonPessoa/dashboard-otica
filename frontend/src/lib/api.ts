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

export interface Stats {
  totalSales: number;
  todaySales: number;
  pendingShipments: number;
  cancelled: number;
}

export interface FinanceData {
  day: string;
  renda: number;
  despesas: number;
  rendaValue: number;
  despesasValue: number;
  highlight: boolean;
}

export interface ProductsData {
  productsLaunched: number;
  salesOfLaunchedProducts: number;
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

  async getStats(): Promise<Stats> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/stats`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Stats API Error Response:", errorText);
        throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (import.meta.env.DEV) {
        console.log("📊 Stats Response:", data);
      }
      
      if (!data.ok) {
        throw new Error(data.error || "Failed to fetch stats");
      }
      
      if (!data.stats) {
        throw new Error("Stats data not found in response");
      }
      
      return data.stats;
    } catch (error) {
      console.error("Error in getStats:", error);
      throw error;
    }
  },

  async getFinance(): Promise<{ data: FinanceData[]; maxValue: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/finance`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Finance API Error Response:", errorText);
        throw new Error(`Failed to fetch finance data: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (import.meta.env.DEV) {
        console.log("💰 Finance Response:", result);
      }
      
      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch finance data");
      }
      
      return {
        data: result.data || [],
        maxValue: result.maxValue || 100,
      };
    } catch (error) {
      console.error("Error in getFinance:", error);
      throw error;
    }
  },

  async getProducts(): Promise<ProductsData> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/products`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Products API Error Response:", errorText);
        throw new Error(`Failed to fetch products data: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (import.meta.env.DEV) {
        console.log("📦 Products Response:", result);
      }
      
      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch products data");
      }
      
      if (!result.data) {
        throw new Error("Products data not found in response");
      }
      
      return result.data;
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  },
};

