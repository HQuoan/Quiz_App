import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkAnswer  as checkAnswerAPI} from "../../services/apiUserAnswers";


export function useCheckAnswer() {
  const { mutate: checkAnswer, isPending } = useMutation({
    mutationFn: checkAnswerAPI,
    onSuccess: () => {
      // toast.success("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, checkAnswer };
}
