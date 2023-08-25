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
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,

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
            path: "upload/detail",
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
