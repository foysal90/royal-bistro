import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import OrderFood from "../pages/Order/OrderFood/OrderFood";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      // {
      //   path: "/order",
      //   element: <OrderFood />,
      // },
      {
        path: "/order/:category",
        element: <OrderFood />,
      },
    ],
  },
]);
