import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: api.getNotifications,
    refetchInterval: 30000, // Refetch a cada 30 segundos
  });
}

