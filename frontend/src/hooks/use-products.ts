import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: api.getProducts,
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    refetchInterval: 10 * 60 * 1000, // Refetch a cada 10 minutos
    onError: (error) => {
      console.error("Erro ao buscar dados de produtos:", error);
    },
  });
}

