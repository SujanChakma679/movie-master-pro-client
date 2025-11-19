import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);

  const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        // console.log(result.user)
        alert("Sign Out Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const links = <>
         <li><NavLink to="/">Home</NavLink></li>
         <li><NavLink to="/movies">All Movies</NavLink></li>
         {/* <li><NavLink to="/register">Register</NavLink></li> */}

         {user && (
        <>
          <li>
            <NavLink to="/movies/my-watch-list"> My WatchList </NavLink>
          </li>
          <li>
            <NavLink to="movies/add"> Add Movies </NavLink>
          </li>
           <li>
            <NavLink to="movies/my-collections"> My Collections </NavLink>
          </li>
        </>
      )}
        
    </>


    return (
        <div className="navbar bg-base-100 shadow-sm mb-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Movie Master</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
     {user ? (
          <a onClick={handleLogOutUser} className="btn btn-primary">
            Sign Out
          </a>
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

