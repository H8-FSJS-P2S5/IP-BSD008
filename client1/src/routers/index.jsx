import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/home";
import Province from "../pages/province";
import User from "../pages/users";
import AllData from "../pages/all-data-covid";
import DataIndonesia from "../pages/data-indonesia";
import UpdateUser from "../pages/update-user";
import AddHistory from "../pages/addHistory";
import Github from "../component/Github";
import Countries from "../pages/Countries";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return redirect("/home");
      }
      return null;
    },
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/github",
        element: <Github />,
      },
    ],
  },
  {
    path: "/",
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/all-data",
        element: <AllData />,
      },
      {
        path: "/data-indonesia",
        element: <DataIndonesia />,
      },
      {
        path: "/get-continents",
        element: <Province />,
      },
      {
        path: "/get-users",
        element: <User />,
      },
      {
        path: "/users/:id",
        element: <UpdateUser />,
      },
      {
        path: "/add-history",
        element: <AddHistory />,
      },
      {
        path: "/show-countries",
        element: <Countries />,
      },
    ],
  },
]);

export default router;
