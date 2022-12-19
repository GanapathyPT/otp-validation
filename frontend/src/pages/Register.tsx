import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthLayout } from "../layouts/AuthLayout";

export function Register() {
  useAuth(false, true);
  const {
    loading,
    error,
    fetchData: register,
  } = useFetch<{ otp_url: string }>("/api/auth/register");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const data = await register("POST", null, body);
    if (data) window.location.href = data.otp_url;
  };

  return (
    <AuthLayout title="Register" loading={loading} error={error}>
      <form onSubmit={onSubmit}>
        <Input type="text" name="username" label="User name" />
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Button type="submit" color="primary" center>
          Register
        </Button>
      </form>
      <small>
        Already have an account? <Link to="/login">Login</Link>
      </small>
    </AuthLayout>
  );
}
