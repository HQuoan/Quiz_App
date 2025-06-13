import toast from "react-hot-toast";
import { startQuizSession as startQuizSessionAPI } from "../../services/apiQuizSessions";
import { useMutation } from "@tanstack/react-query";


export function useStartQuizSession() {
  const { mutate: startQuizSession, isPending } = useMutation({
    mutationFn: startQuizSessionAPI,
    onSuccess: () => {
      // toast.success("Tạo thành công");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, startQuizSession };
}
