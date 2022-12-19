import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { AuthLayout } from "../layouts/AuthLayout";

export function OTPFail() {
  return (
    <AuthLayout title="OTP verified Failed">
      <Link to="/login">
        <Button color="primary">I'll Verify Later</Button>
      </Link>
    </AuthLayout>
  );
}
