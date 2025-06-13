import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getQuizzes } from "../../services/apiQuizzes";

export function useQuizzes() {
  const { isPending, data, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => getQuizzes(),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const quizzes = data?.result ?? [];
  const pagination = data?.pagination ?? null;

  return { isPending, error, quizzes, pagination };
}
