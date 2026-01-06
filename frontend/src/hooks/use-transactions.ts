import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: api.getTransactions,
    staleTime: 1 * 60 * 1000, // Cache por 1 minuto
    refetchInterval: 2 * 60 * 1000, // Refetch a cada 2 minutos
    onError: (error) => {
      console.error("Erro ao buscar transações:", error);
    },
  });
}

