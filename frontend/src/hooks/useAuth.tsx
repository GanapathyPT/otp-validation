import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";

interface User {
  id: number;
  username: string;
  email: string;
  verified: boolean;
}

export function useAuth(privateRoute = true, authRoute = false) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const { fetchData, loading } = useFetch<User>("/api/me");

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetchData("GET", token);
        if (data) {
          setUser(data);
          if (authRoute) navigate("/");
        } else if (privateRoute) navigate("/login");
      } else if (privateRoute) navigate("/login");
    })();
  }, [privateRoute, authRoute]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return { loading, user, logout };
}
