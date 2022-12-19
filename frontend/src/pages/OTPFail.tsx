import { Button } from "../components/Button/Button";
import { AuthLayout } from "../layouts/AuthLayout";

export function OTPFail() {
  return (
    <AuthLayout title="OTP verified Failed">
      <Button color="primary">I'll Verify Later</Button>
    </AuthLayout>
  );
}
