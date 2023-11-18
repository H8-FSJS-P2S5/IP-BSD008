// pages/Login.jsx is the Login page component that will be rendered when the user is not logged in.
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = "827517944c04238a7f37"; // Keep as a constant

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userData, setUserData] = useState({}); // Add this line
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && !localStorage.getItem("token")) {
      getAccessToken(codeParam);
    }
  }, []);

  async function googleLogin(codeResponse) {
    try {
      const googleToken = codeResponse?.credential;
      if (googleToken) {
        localStorage.setItem("token", googleToken);

        const response = await axios.post(
          "http://localhost:3000/auth/google-login",
          null,
          {
            headers: {
              Authorization: `Bearer ${googleToken}`,
            },
          }
        );
        setAuthState({ token: googleToken, user: response.data.user });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const getAccessToken = async (codeParam) => {
    try {
      const response = await fetch(
        `http://localhost:3000/GetAccessToken?code=${codeParam}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        setAuthState({ token: data.access_token, user: userData });
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      setAuthState({ token: response.data.token, user: response.data.user });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Login
        </button>
        <GoogleLogin
          clientId={
            "616851447665-fhujr9mld5ds3ehkdoo6stdeufnnms6p.apps.googleusercontent.com"
          }
          onSuccess={googleLogin}
          onFailure={googleLogin}
          cookiePolicy={"single_host_origin"}
        />
        <div className="text-center text-sm text-gray-500 mt-4">
          Or login with
        </div>
        <div className="flex items-center justify-center mt-4">
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-600 text-sm font-semibold"
          >
            Register
          </a>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={loginWithGithub}
            className="w-8 h-8 rounded-full bg-gray-100 p-1 mr-2"
          >
            <svg
              className="w-full h-full text-gray-700"
              viewBox="0 0 16 16"
              version="1.1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47
              15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02
              15.02 6.01 14.39 6.01 13.72C4 14.09 3.48
              13.23 3.32 12.78C3.23 12.55 2.91 11.84 2.63
              11.65C2.34 11.46 1.82 10.84 2.49 10.83C3.15
              10.81 3.58 11.5 3.73 11.75C4.44 12.92 5.61
              12.57 6.05 12.39C6.12 12.03 6.33 11.73 6.56
              11.54C4.76 11.34 2.91 10.65 2.91 7.58C2.91
              6.72 3.22 5.99 3.73 5.43C3.65 5.23 3.38 4.41
              3.82 3.31C3.82 3.31 4.49 3.1 6.02
              4.13C6.67 3.95 7.34 3.86 8 3.86C8.66 3.86 9.33
              3.95 9.98 4.13C11.51 3.09 12.18 3.31 12.18
              3.31C12.62 4.41 12.35 5.23 12.27 5.43C12.78
              5.99 13.09 6.72 13.09 7.58C13.09 10.66 11.23
              11.34 9.43 11.54C9.76 11.78 10 12.26 10
              13.01C10 14.11 9.99 14.94 9.99 15.21C9.99
              15.42 10.14 15.67 10.55 15.59C13.71 14.53
              16 11.53 16 8C16 3.58 12.42 0 8 0Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
