import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const auth = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    auth.loginFetch(username, password);
  }

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <p>{import.meta.env.VITE_TEST_VAR}</p>
        <h2>Login</h2>
        <label htmlFor="username"></label>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>{auth.error}</p>
    </>
  );
}
