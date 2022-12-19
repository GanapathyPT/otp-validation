import { Button } from "../components/Button/Button";
import { AuthLayout } from "../layouts/AuthLayout";

export function OTPSuccess() {
  return (
    <AuthLayout title="OTP verified Successfully">
      <Button color="primary">Login Now</Button>
    </AuthLayout>
  );
}
