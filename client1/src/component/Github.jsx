import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Github() {
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  console.log(search, 9);
  const code = search.split("=")[1];
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/github-login",
          {
            code,
          }
        );
        console.log(data, "<<<<<<<<<");
        localStorage.setItem("access_token", data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <>please wait.....</>;
  } else {
    return <Navigate to={"/home"} />;
  }
}

export default Github;
