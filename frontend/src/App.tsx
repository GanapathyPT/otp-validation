import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { OTPFail } from "./pages/OTPFail";
import { OTPSuccess } from "./pages/OTPSuccess";
import { Register } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp-success",
    element: <OTPSuccess />,
  },
  {
    path: "/otp-failure",
    element: <OTPFail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
