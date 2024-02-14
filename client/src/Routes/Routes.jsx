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
import ManageItems from "../pages/DashBoard/ManageItems/ManageItems";
//import EditItem from "../pages/DashBoard/EditItem/EditItem";
import UpdateItem from "../pages/DashBoard/UpdateItem/UpdateItem";
import Payment from "../pages/DashBoard/Payment/Payment";
import OrderConfirmForm from "../pages/DashBoard/OrderConfirmForm/OrderConfirmForm";
import AdminHome from "../pages/DashBoard/AdminHome/AdminHome";
import UserHome from "../pages/DashBoard/UserHome/UserHome";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import Reservation from "../pages/DashBoard/Reservation/Reservation";
import MyBookings from "../pages/DashBoard/MyBookings/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorElement />,
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
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/order/:category",
        element: <OrderFood />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    // errorElement: <ErrorElement/>,
    children: [
      {
        path: "mycart",
        element: <MyCart />,
      },
      {
        path: "myprofile",
        element: <UserProfile />,
      },
      {
        path: "userhome",
        element: <UserHome />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "myBookings",
        element: <MyBookings />,
      },
      {
        path: "orderConfirm",
        element: <OrderConfirmForm />,
      },
      //admin routes
      {
        path: "adminhome",
        element: (
          <AdminRoutes>
            <AdminHome />
          </AdminRoutes>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRoutes>
            {" "}
            <AllUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "managebookings",
        element: (
          <AdminRoutes>
            <ManageBookings />
          </AdminRoutes>
        ),
      },
      {
        path: "additem",
        element: (
          <AdminRoutes>
            <AddItem />
          </AdminRoutes>
        ),
      },
      {
        path: "manageItem",
        element: (
          <AdminRoutes>
            <ManageItems />
          </AdminRoutes>
        ),
      },

      {
        path: "update/:id",
        element: (
          <AdminRoutes>
            <UpdateItem />
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
        // loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
    ],
  },
]);
