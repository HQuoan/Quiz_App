import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginAPI,
} from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, mutate: login } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      toast.success("Đăng nhập thành công!");
      queryClient.setQueryData(["user"], user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login };
}

