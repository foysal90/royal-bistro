import { MdOutlineMenuBook } from "react-icons/md";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { CiForkAndKnife } from "react-icons/ci";
import { FcConferenceCall, FcDataSheet, FcList, FcPlanner } from "react-icons/fc";
import { BiSolidContact, BiSolidShoppingBags } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";


const Dashboard = () => {
  const [cart] = useCart();

  //todo
  const isAdmin = true;
  return (
    <div className="drawer lg:drawer-open bg-transparent ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center ">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#d1a054] ">
          {/* Sidebar content here */}

          {isAdmin ? (
            <>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myprofile">
                <CiForkAndKnife />Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservation">
                <FcList />Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/managebookings">
                <FcDataSheet />Manage Bookings
                </NavLink>
              </li>
              <li className="w-40">
                <NavLink to="/dashboard/allusers">
                <FcConferenceCall />All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myprofile">
                  <FaHome></FaHome>My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservation">
                <FcPlanner />Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/history">
                  <FaWallet></FaWallet>Payment History
                </NavLink>
              </li>
              <li className="w-40">
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart{" "}
                  <span className="badge badge-primary text-white">
                    {cart?.length}
                  </span>
                </NavLink>{" "}
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <MdOutlineMenuBook></MdOutlineMenuBook>Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <BiSolidShoppingBags></BiSolidShoppingBags>Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="contactus">
              <BiSolidContact></BiSolidContact>Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
