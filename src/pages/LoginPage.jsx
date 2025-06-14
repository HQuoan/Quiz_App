import { useState } from "react";
import { useLogin } from "../features/authentication/useLogin";

function LoginPage() {
  const [username, setUsername] = useState("");
  const { isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") return;
    login({ username });
  };

  return (
    <>
      <div >
        <div className="text-center mb-4">
          <h3 className="fw-bold">Welcome Back</h3>
          <p className="text-muted mb-0">Please enter your username to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. huyvo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
