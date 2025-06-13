import { useState } from "react";
import { useLogin } from "../features/authentication/useLogin";

function LoginPage() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") return;
    login({ username });
  };

  const { isPending, login } = useLogin();

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          className="form-control my-3"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={isPending}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
