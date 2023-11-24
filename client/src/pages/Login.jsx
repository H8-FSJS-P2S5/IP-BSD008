import axios from "axios";
import { useState } from "react";
import "../App";
const Login = () => {
  const BASE_URL = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      const token = res.data.data.access_token;
      localStorage.setItem("access_token", token);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Lakukan pengambilan token dari Google (gunakan Google Sign-In atau library OAuth2 di frontend)
      const googleToken = "YOUR_GOOGLE_TOKEN"; // Gantilah dengan token yang diperoleh dari Google

      // Panggil endpoint `googleLogin` di backend dengan token dari Google menggunakan axios
      const response = await axios.post(
        `${BASE_URL}/google-Login`,
        { token: googleToken },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const data = response.data;
        setAccessToken(data); // Atur token akses ke state atau lakukan apa yang diperlukan
      } else {
        setError("Failed to login with Google");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return <></>;
};

export default Login;
