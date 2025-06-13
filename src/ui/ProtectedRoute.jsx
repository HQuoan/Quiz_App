import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isPending, isAuthenticated, navigate]);

  if (isPending || !isAuthenticated) return null;

  return children;
}

export default ProtectedRoute;
