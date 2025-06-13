import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMySessions } from "../../services/apiQuizSessions";

export function useMySessions() {
  const { isPending, data, error } = useQuery({
    queryKey: ["my-sessions"],
    queryFn: () => getMySessions(),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const sessions = data?.result ?? [];
  const pagination = data?.pagination ?? null;

  return { isPending, error, sessions, pagination };
}
