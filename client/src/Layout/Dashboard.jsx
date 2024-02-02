import { MdOutlineMenuBook } from "react-icons/md";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaCalendarCheck, FaWallet } from "react-icons/fa6";

import { BiSolidContact, BiSolidShoppingBags } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open ">
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
          
          <li><NavLink to='/home'><FaHome></FaHome>User Home</NavLink></li>
          <li><NavLink to='/reservation'><FaCalendarCheck></FaCalendarCheck>Reservations</NavLink></li>
          <li><NavLink to='/history'><FaWallet></FaWallet>Payment History</NavLink></li>
          <li> <NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>My Cart</NavLink> </li>
          <div className="divider"></div>
          <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
          <li><NavLink to='/menu'><MdOutlineMenuBook></MdOutlineMenuBook>Menu</NavLink></li>
          <li><NavLink to='/order/salad'><BiSolidShoppingBags ></BiSolidShoppingBags>Shop</NavLink></li>
          <li><NavLink to='contactus'><BiSolidContact ></BiSolidContact>Contact</NavLink></li>
          
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
