import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useFetch } from "../hooks/useFetch";
import { AuthLayout } from "../layouts/AuthLayout";

export function Register() {
  const {
    loading,
    error,
    fetchData: register,
  } = useFetch<{ otp_url: string }>("/api/auth/register");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData);
    const data = await register("POST", body);
    if (data) window.location.href = data.otp_url;
  };

  return (
    <AuthLayout title="Register" loading={loading} error={error}>
      <form onSubmit={onSubmit}>
        <Input type="text" name="username" label="User name" />
        <Input type="email" name="email" label="Email" />
        <Input type="password" name="password" label="Password" />
        <Button type="submit" color="primary" center>
          Verify Email and Register
        </Button>
      </form>
    </AuthLayout>
  );
}
