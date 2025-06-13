import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { endQuizSession as endQuizSessionAPI } from "../../services/apiQuizSessions";


export function useEndQuizSession() {
  const { mutate: endQuizSession, isPending } = useMutation({
    mutationFn: endQuizSessionAPI,
    onSuccess: () => {
      // toast.success("Tạo n thành công");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, endQuizSession };
}
