import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: api.getStats,
    staleTime: 2 * 60 * 1000, // Cache por 2 minutos
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
    onError: (error) => {
      console.error("Erro ao buscar estatísticas:", error);
    },
  });
}

