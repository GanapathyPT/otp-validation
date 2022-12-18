import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { useFetch } from "../hooks/useFetch";
import { AuthLayout } from "../layouts/AuthLayout";

export function Register() {
  const {
    loading,
    error,
    fetchData: register,
  } = useFetch("/api/auth/register", "POST", true);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data);
    register(body);
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
    </AuthLayout>
  );
}
