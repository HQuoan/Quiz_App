import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {reviewSession } from "../../services/apiQuizSessions";

export function useReviewSession(quizSessionId) {
  const { isPending, data, error } = useQuery({
    queryKey: ["review-session", quizSessionId],
    queryFn: () => reviewSession(quizSessionId),
    enabled: !!quizSessionId, 
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const userAnswers = data?.result ?? [];
  const pagination = data?.pagination ?? null;

  return { isPending, error, userAnswers, pagination };
}

