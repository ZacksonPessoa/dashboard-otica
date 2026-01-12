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
  totalSales: number; // Receita bruta
  todaySales: number;
  pendingShipments: number;
  cancelled: number;
  totalOrders: number; // Nº de pedidos
  netRevenue: number; // Receita líquida
  realProfit: number; // Lucro real
  margin: number; // Margem (%)
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

export interface Product {
  id: string;
  title: string;
  price: number;
  listing_type_id: string;
  sold_quantity: number;
  permalink: string;
  thumbnail: string;
}

export interface Transaction {
  id: string;
  productName: string;
  date: string;
  status: string;
  quantity: number;
  price: number;
  buyer: string;
  cpf: string;
  address: string;
}

export interface ProductAnalysis {
  id: string;
  productName: string;
  sku: string;
  orderId: string;
  salePrice: number;
  productCost: number;
  commission: number;
  shipping: number;
  totalCosts: number;
  profit: number;
  margin: number;
  problems: string[];
  quantity: number;
  date: string;
}

export interface ProductAnalysisSummary {
  total: number;
  withProfit: number;
  withLoss: number;
  totalProfit: number;
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

  async getStats(fromDate?: string, toDate?: string): Promise<Stats> {
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      const queryString = params.toString();
      const url = `${API_BASE_URL}/ml/stats${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);

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

  async getFinance(fromDate?: string, toDate?: string): Promise<{ data: FinanceData[]; maxValue: number }> {
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      const queryString = params.toString();
      const url = `${API_BASE_URL}/ml/finance${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);

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

  async getProductsList(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ml/products-list`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Products List API Error Response:", errorText);
        throw new Error(`Failed to fetch products list: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (import.meta.env.DEV) {
        console.log("📦 Products List Response:", result);
      }

      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch products list");
      }

      return result.products || [];
    } catch (error) {
      console.error("Error in getProductsList:", error);
      throw error;
    }
  },

  async getTransactions(fromDate?: string, toDate?: string): Promise<Transaction[]> {
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      const queryString = params.toString();
      const url = `${API_BASE_URL}/ml/transactions${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Transactions API Error Response:", errorText);
        throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (import.meta.env.DEV) {
        console.log("💳 Transactions Response:", result);
      }

      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch transactions");
      }

      return result.transactions || [];
    } catch (error) {
      console.error("Error in getTransactions:", error);
      throw error;
    }
  },

  async getProductAnalysis(fromDate?: string, toDate?: string): Promise<{ summary: ProductAnalysisSummary; products: ProductAnalysis[] }> {
    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);
      const queryString = params.toString();
      const url = `${API_BASE_URL}/ml/product-analysis${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Product Analysis API Error Response:", errorText);
        throw new Error(`Failed to fetch product analysis: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (import.meta.env.DEV) {
        console.log("📊 Product Analysis Response:", result);
      }

      if (!result.ok) {
        throw new Error(result.error || "Failed to fetch product analysis");
      }

      return {
        summary: result.summary || { total: 0, withProfit: 0, withLoss: 0, totalProfit: 0 },
        products: result.products || [],
      };
    } catch (error) {
      console.error("Error in getProductAnalysis:", error);
      throw error;
    }
  },
};

