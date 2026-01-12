import { useQuery } from "@tanstack/react-query";
import { api, UserMe } from "@/lib/api";

export function useMe() {
  return useQuery<UserMe>({
    queryKey: ["me"],
    queryFn: api.getMe,
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    retry: 2,
    onError: (error) => {
      console.error("Erro ao buscar dados do usuário:", error);
    },
  });
}

