import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/profiles/create",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      // Assuming the server responds with the created profile
      navigate(`/profiles/${response.data.id}`);
    } catch (error) {
      setError("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-xl max-w-sm w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create Profile
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
