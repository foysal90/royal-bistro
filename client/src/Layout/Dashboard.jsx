import { MdOutlineMenuBook } from "react-icons/md";
import { FaBars, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { CiForkAndKnife } from "react-icons/ci";
import { FcConferenceCall, FcDataSheet, FcList, FcPlanner } from "react-icons/fc";
import { BiSolidContact, BiSolidShoppingBags } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import Mode from "./DarkMode/Mode";


const Dashboard = () => {
  const [cart] = useCart();

  //todo
  //const isAdmin = false;
  const [isAdmin] = useAdmin();



  return (
    <div className="drawer lg:drawer-open bg-transparent ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <FaBars />
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#d1a054] ">
          {/* Sidebar content here */}

          {isAdmin ? 
            <>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/additem">
                <CiForkAndKnife />Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItem">
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
           : 
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
                  My Cart
                  <span className="badge badge-primary text-white">
                    {cart?.length}
                  </span>
                </NavLink>
              </li>
            </>
          }

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
         <span className="bg-blue-600 w-20 p-1 rounded-full mx-auto "> <Mode/></span>
        </ul>
       
      </div>
      
    </div>
  );
};

export default Dashboard;
