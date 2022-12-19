import { Link } from "react-router-dom";
import { Button } from "../components/Button/Button";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function NotFound() {
  return (
    <DefaultLayout>
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL</p>
      <Link to="..">
        <Button color="secondary">Go Back</Button>
      </Link>
    </DefaultLayout>
  );
}
