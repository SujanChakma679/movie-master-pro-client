import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { RxAvatar } from "react-icons/rx";
import { IoMdLogOut } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
 
 
 

  const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          title: "Signed Out!",
          text: "You have successfully signed out.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/movies">All Movies</NavLink>
      </li>
      <li>
        <NavLink to="movies/add">Add Movies</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/movies/my-watch-list">My WatchList</NavLink>
          </li>

          <li>
            <NavLink to="movies/my-collections">My Collections</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-200 shadow-sm  sticky top-0 z-50">
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
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost font-semibold text-xl bg-gradient-to-tr from-purple-700 to-emerald-600 bg-clip-text text-transparent"
        >
          Movie Master
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        {/* searchbar */}
        <form
          className="hidden lg:flex items-center gap-2"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search movie"
              
              className="input input-bordered w-64 pl-10"
            />
            <IoIosSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </form>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="relative">
            {/* Avatar */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10
                          flex items-center justify-center
                          rounded-full
                          hover:bg-gray-300
                          transition"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User profile"
                  className="w-10 h-10 rounded-full object-cover border  hover:bg-gray-200
                          transition"
                />
              ) : (
                <RxAvatar className="w-10 h-10 text-gray-500" />
              )}
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border p-3 z-50 ${
                  isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
                }`}
              >
                <div className="flex items-center justify-center">
                  <img
                    src={user.photoURL}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </div>

                <p className="text-sm text-center font-semibold">
                  {user.displayName}
                </p>
                <p className="text-xs text-center text-gray-500 truncate">
                  {user.email}
                </p>

                <hr className="my-2" />

                <Link
                  to="/my-profile"
                  onClick={() => setOpen(false)}
                  className={`block w-full text-left text-sm px-2 py-1 rounded
                      ${
                        isDark
                          ? "hover:bg-gray-800 hover:text-white"
                          : "hover:bg-gray-200 hover:text-black"
                      }
                    `}
                >
                  My Profile
                </Link>

                <NavLink
                  to="/movies/my-watch-list"
                  onClick={() => setOpen(false)}
                  className={`block w-full text-left text-sm px-2 py-1 rounded
                      ${
                        isDark
                          ? "hover:bg-gray-800 hover:text-white"
                          : "hover:bg-gray-200 hover:text-black"
                      }
                    `}
                >
                  My Watchlist
                </NavLink>

                <NavLink
                  to="/movies/my-collections"
                  onClick={() => setOpen(false)}
                  className={`block w-full text-left text-sm px-2 py-1 rounded
                      ${
                        isDark
                          ? "hover:bg-gray-800 hover:text-white"
                          : "hover:bg-gray-200 hover:text-black"
                      }
                    `}
                >
                  My Collections
                </NavLink>

                <button
                  onClick={() => {
                    handleLogOutUser();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-x-0.5 text-left text-sm px-2 py-1 text-purple-800 hover:bg-red-100 rounded"
                >
                  Sign Out <IoMdLogOut />
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
