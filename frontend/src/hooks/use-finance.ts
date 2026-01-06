import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useFinance() {
  return useQuery({
    queryKey: ["finance"],
    queryFn: api.getFinance,
    staleTime: 2 * 60 * 1000, // Cache por 2 minutos
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
    onError: (error) => {
      console.error("Erro ao buscar dados financeiros:", error);
    },
  });
}

