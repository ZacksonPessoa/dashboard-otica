import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useDateRange } from "@/contexts/DateRangeContext";

export function useProductAnalysis() {
  const { dateRange } = useDateRange();
  
  const fromDate = dateRange?.from ? dateRange.from.toISOString().split("T")[0] : undefined;
  const toDate = dateRange?.to ? dateRange.to.toISOString().split("T")[0] : undefined;

  return useQuery({
    queryKey: ["product-analysis", fromDate, toDate],
    queryFn: () => api.getProductAnalysis(fromDate, toDate),
    staleTime: 2 * 60 * 1000, // Cache por 2 minutos
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
    onError: (error) => {
      console.error("Erro ao buscar análise de produtos:", error);
    },
  });
}

