import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  MainPage,
  SecondPage,
  ThirdPage,
} from "./pages";

import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { loader as dashboardLoader } from "./pages/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,

        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "upload/list",
            element: <SecondPage />,
          },
          {
            path: "upload/:jobId",
            element: <ThirdPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
