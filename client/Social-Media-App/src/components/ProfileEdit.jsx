// src/components/ProfileEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    profile_picture: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/profiles/${id}`)
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [id]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/profiles/${id}`, profileData);
      navigate(`/profiles/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleInputChange}
          ></textarea>
        </label>
        {/* Add more fields as needed */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profile_picture"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profile_picture"
            onChange={(e) =>
              setProfileData({
                ...profileData,
                profile_picture: e.target.files[0],
              })
            }
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
