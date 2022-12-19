import { Button } from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import { DefaultLayout } from "../layouts/DefaultLayout";

export function Home() {
  const { loading, user, logout } = useAuth();

  return (
    <DefaultLayout loading={loading}>
      <h1>Hey {user?.username}!</h1>
      <p>You are successfully logged in</p>

      <div>
        <h3>Your Data:</h3>
        <table border={1}>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{user?.id}</td>
            </tr>

            <tr>
              <th>Username</th>
              <td>{user?.username}</td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{user?.email}</td>
            </tr>

            <tr>
              <th>Verified</th>
              <td>{user?.verified ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button color="secondary" onClick={logout}>
        Logout
      </Button>
    </DefaultLayout>
  );
}
