import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/tastehome.png'
//import Mode from "../../../Layout/DarkMode/Mode";
import Theme from "../Theme/Theme";

const Navbar = () => {
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
        <Link to='/menu'>OUR MENU</Link>
      </li>
      <li>
        <Link to='/order/salad'>order Food</Link>
      </li>
      <li>
        <NavLink to="/contactus">Dashboard</NavLink>
      </li>

      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 opacity-70 max-w-screen-xl bg-black h-20 my-5 text-white ">
      <div className="navbar-start">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
            
           <img className="w-40 h-28 " src={logo} alt="TASTE-OF-HOME" /> 
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      

      {/* <Search/> */}

      <div className="navbar-end">
        <Theme/>
      </div>
    </div>
  );
};

export default Navbar;
