import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import OrderFood from "../pages/Order/OrderFood/OrderFood";
import Login from "../pages/Login/Login";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import Register from "../pages/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../pages/Shared/Profile/Profile";
import Cart from "../pages/Shared/Cart/Cart";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/DashBoard/MyCart/MyCart";
import UserProfile from "../pages/DashBoard/UserProfile/UserProfile";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import ManageBookings from "../pages/DashBoard/ManageBookings/ManageBookings";
import AddItem from "../pages/DashBoard/AddItem/AddItem";
import AdminRoutes from "./AdminRoutes";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorElement/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
  
      {
        path: "/cart",
        element: <ProtectedRoutes><Cart/></ProtectedRoutes>
      },
      {
        path: "/profile",
        element: <ProtectedRoutes><Profile/></ProtectedRoutes>
      },
      {
        path: "/order/:category",
        element:<OrderFood />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard/></ProtectedRoutes>,
    // errorElement: <ErrorElement/>,
    children: [
      {
        path: 'mycart',
        element: <MyCart/>
      },
      {
        path: 'myprofile',
        element: <UserProfile/>
      },
      {
        path: 'allusers',
        element:<AdminRoutes> <AllUsers/></AdminRoutes>
      },
      {
        path: 'managebookings',
        element: <ManageBookings/>
      },
      {
        path: 'additem',
        element: <AdminRoutes><AddItem/></AdminRoutes>
      }

    ]
  }
]);
