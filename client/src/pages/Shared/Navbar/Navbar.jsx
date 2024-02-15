import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/tastehome.png";

import Mode from "../../../Layout/DarkMode/Mode";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { FcBusinessman, FcExport } from "react-icons/fc";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
//import GreetingMessage from "../../../components/GreetingMessage/GreetingMessage";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const handleLoggedOut = () => {
    logOut().then(() => {
      Swal.fire({
        title: "User logged out successfully",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contactus">Contact us</NavLink>
      </li>
      <li>
        <Link to="/menu">OUR MENU</Link>
      </li>
      <li>
        <Link to="/order/salad">order Food</Link>
      </li>

      <li>
        <NavLink to={isAdmin ? "/dashboard/adminhome" : "/dashboard/userhome"}>
          Dahboard
        </NavLink>
      </li>
      {/* {isAdmin ? (
        <li>
          <NavLink to="/dashboard/adminhome">Dashboard</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/dashboard/userhome">Dashboard</NavLink>
        </li> */}
      {/* )} */}
      <li>
        <Link to="/dashboard/mycart" className="">
          <FaCartPlus className="w-6 h-6" />
          <div className="badge badge-secondary">{cart?.length || 0}</div>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar fixed -top-5 z-10 md:opacity-70 sm:opacity-80 max-w-screen-xl bg-black h-20 my-5 text-white ">
      <div className="navbar-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-500 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="navbar-center ml-20">
          <Link to="/">
            <img
              className="lg:w-36 lg:h-24 sm:w-20 h-20 "
              src={logo}
              alt="TASTE-OF-HOME"
            />
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* <Search/> */}

      <div className="navbar-end mr-5">
        <>
          {user ? (
            <div className="">
              {/* <p><GreetingMessage/>, {user.displayName}  </p> */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn  btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      className="w-8 h-8"
                      src={user.photoURL
                      }
                      alt="loading"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content  bg-blue-950 text-white rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      <div className="flex gap-1">
                        <FcBusinessman className="w-4 h-4" />
                        <span>Profile</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <p>
                      <Mode />
                    </p>
                  </li>
                  <li>
                    <div className="flex gap-1">
                      <FcExport className="w-6 h-6" />
                      <button onClick={handleLoggedOut}>Logout</button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </>
      </div>
    </div>
  );
};

export default Navbar;
