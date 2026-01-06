import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useDateRange } from "@/contexts/DateRangeContext";

export function useTransactions() {
  const { dateRange } = useDateRange();
  
  const fromDate = dateRange?.from ? dateRange.from.toISOString().split("T")[0] : undefined;
  const toDate = dateRange?.to ? dateRange.to.toISOString().split("T")[0] : undefined;

  return useQuery({
    queryKey: ["transactions", fromDate, toDate],
    queryFn: () => api.getTransactions(fromDate, toDate),
    staleTime: 1 * 60 * 1000, // Cache por 1 minuto
    refetchInterval: 2 * 60 * 1000, // Refetch a cada 2 minutos
    onError: (error) => {
      console.error("Erro ao buscar transações:", error);
    },
  });
}

