import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormHistory = () => {
  const [history, setHistory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      let data = await axios.post(
        "http://localhost:3000/posts",
        {
          history,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="col-span-full">
          <label for="bio" className="text-sm">
            Bio
          </label>

          <textarea
            id="history"
            placeholder="History..."
            onChange={(e) => setHistory(e.target.value)}
            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
          ></textarea>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="submit"
            className="px-4 py-2 border rounded-md border-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormHistory;
