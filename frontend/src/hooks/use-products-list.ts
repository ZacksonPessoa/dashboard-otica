import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProductsList() {
    return useQuery({
        queryKey: ["products-list"],
        queryFn: api.getProductsList,
        staleTime: 5 * 60 * 1000, // Cache por 5 minutos
        refetchInterval: 10 * 60 * 1000, // Refetch a cada 10 minutos
    });
}
