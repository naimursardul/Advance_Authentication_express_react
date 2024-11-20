import { NavLink } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import ThemeController from "./ThemeController";

function Navbar() {
  const user = false;
  return (
    <div className="navbar bg-base-100 shadow-md px-[16px] sm:px-[50px]  ">
      <div className="sm:navbar-start w-full">
        <div className="dropdown lg:hidden">
          {/* Humburger & close button */}
          <HiBars3BottomLeft role="button" tabIndex={0} className="h-5 w-5" />
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] my-4 w-52 p-3 shadow"
          >
            <li>
              <NavLink to={"/"}>HOME</NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>SERVICES</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>ABOUT</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>CONTACT</NavLink>
            </li>
            <ThemeController />
            {!user && (
              <li className="space-y-3 mt-2">
                <NavLink to={"/login"} className="btn btn-sm btn-outline">
                  Login
                </NavLink>
                <NavLink to={"/signup"} className="btn btn-primary btn-sm">
                  Sign up
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <a className="menu-title font-bold text-lg sm:text-2xl ">
          Auth Simplified
        </a>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <NavLink to={"/"}>HOME</NavLink>
          </li>
          <li>
            <NavLink to={"/services"}>SERVICES</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>ABOUT</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>CONTACT</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-3 ">
        <div className="hidden lg:flex">
          <ThemeController />
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] bg-base-200 shadow rounded-box w-[150px] my-1 px-2 py-5"
            >
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-2">
            <NavLink to={"/login"} className="btn btn-sm">
              Login
            </NavLink>
            <NavLink to={"/signup"} className="btn btn-primary btn-sm">
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
