import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { AuthLayout } from "../layouts/AuthLayout";

export function OTPSuccess() {
  return (
    <AuthLayout title="OTP verified Successfully">
      <Link to="/login">
        <Button color="primary">Login Now</Button>
      </Link>
    </AuthLayout>
  );
}
