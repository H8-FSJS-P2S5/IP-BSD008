import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { googleLogout } from "@react-oauth/google";

const NavBar = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = authState && authState.token;
  const userId = authState.user ? authState.user.id : null; // Assuming the user object has an id
  const username = authState.user ? authState.user.username : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    logout();
    googleLogout();
    navigate("/login");
  };

  const shouldHideHomeLink = () => {
    const hiddenPaths = ["/login", "/register", "/profiles/:id", "/posts/:id"];
    return hiddenPaths.includes(location.pathname);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-indigo-500 to-pink-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          <img
            src="https://img.freepik.com/free-vector/red-rooster-cock-side-view-abstract_1284-16627.jpg?w=1060&t=st=1700070730~exp=1700071330~hmac=e4260fcedad55cad749f38fa6fe2791743a24f7d14c7f1520225e5bba9c3a7ec"
            alt="logo"
            className="w-10 h-10 inline mr-2"
          />
        </Link>
        <ul className="flex space-x-4">
          {isLoggedIn && !shouldHideHomeLink() && (
            <>
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/profiles/${userId}`}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  My Profile
                </Link>
              </li>
            </>
          )}
          {!isLoggedIn && !shouldHideHomeLink() && (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="text-white">Welcome, {username || "User"}!</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
