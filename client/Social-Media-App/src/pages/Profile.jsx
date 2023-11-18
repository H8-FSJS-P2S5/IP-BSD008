import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../api/firebase";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/profiles/${id}`
        );
        if (response.status === 200) {
          setUser(response.data);
          setUrl(response.data.profile_picture);
        } else {
          setError("Profile not found.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChange = useCallback((e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      setUser({ ...user, profile_picture: downloadURL });
    }
  }, [image, user]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setIsSubmitting(true);
      try {
        await axios.put(`http://localhost:3000/profiles/${id}`, user, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        navigate(`/profiles/${id}`);
      } catch (error) {
        console.error("Error updating profile:", error);
        setError(error.response?.data?.message || "Failed to update profile.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [user, id, authState.token, navigate]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        <p className="mb-6">{user.bio}</p>
        <img
          src={url}
          alt={user.name}
          className="w-64 h-64 object-cover rounded-full mx-auto mb-6"
        />

        {authState.user && authState.user.id === user.user_id && (
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-600 font-semibold">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="text-gray-600 font-semibold">Bio:</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-32"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Update Profile
              </button>
            </form>

            <div className="mt-6">
              <input
                type="file"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          "
              />
              <button
                onClick={handleUpload}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
