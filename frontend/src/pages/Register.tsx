import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { AuthLayout } from "../layouts/AuthLayout";

export function Register() {
  return (
    <AuthLayout title="Register">
      <form>
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
