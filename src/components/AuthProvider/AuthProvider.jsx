// Code from https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5

import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("JWT") || null);

  let navigate = useNavigate();

  async function loginFetch(username, password) {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      console.log(res);
      if (res.user) {
        setUser(res.user);
        setToken(res.token);
        console.log("USER FROM LOGIN", res.user);
        console.log("USER FROM LOGIN", res.token);
        localStorage.setItem("JWT", res.token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (error) {
      console.log(error);
    }
  }

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("JWT");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginFetch, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
