import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthLayout } from "../layouts/AuthLayout";

export function Login() {
  useAuth(false, true);
  const navigate = useNavigate();
  const {
    loading,
    error,
    fetchData: login,
  } = useFetch<{ verified: boolean; token: string; otp_url: string }>(
    "/api/auth/login"
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const data = await login("POST", null, body);
    if (data) {
      if (data.verified) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else window.location.href = data.otp_url;
    }
  };

  return (
    <AuthLayout title="Login" loading={loading} error={error}>
      <form onSubmit={onSubmit}>
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Button type="submit" color="primary" center>
          Login
        </Button>
      </form>
      <small>
        Don't have an account? <Link to="/register">Register</Link>
      </small>
    </AuthLayout>
  );
}
