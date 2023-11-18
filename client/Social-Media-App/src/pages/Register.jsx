// pages/Register.jsx is the Register page component that will be rendered when the user clicks on the Register button on the Login page.
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/auth/register`, {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Register</h2>
        {/* Username, Email, and Password input fields */}
        <div className="mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Register
        </button>
        <GoogleLogin
          clientId={
            "616851447665-fhujr9mld5ds3ehkdoo6stdeufnnms6p.apps.googleusercontent.com"
          }
          onSuccess={googleLogin}
          onFailure={googleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </form>
    </div>
  );
};

export default Register;
