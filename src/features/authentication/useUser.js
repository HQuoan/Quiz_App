import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    retry: false,
  });

  const isAuthenticated = Boolean(user);

  return { user, isPending, isAuthenticated };
}
