import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [posts, setPosts] = useState([]);
  // removePost(post.id); remove is not defined
  const removePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };
  const [profilePicture, setProfilePicture] = useState(
    post.user?.profile_picture || "default-profile-pic-url"
  );

  useEffect(() => {
    setLikesCount(post.likes);
  });

  const handleLike = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/posts/${post.id}/like`
      );
      setLiked(response.data.liked);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  });

  const handleUnlike = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/posts/${post.id}/unlike`
      );
      setLiked(response.data.liked);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  });

  const handleDelete = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${post.id}`);
      // Assuming a function to remove the post from the UI
      removePost(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={profilePicture}
            alt="Profile"
          />
          <p className="text-gray-800 font-semibold ml-2">
            {post.user?.username}
          </p>
        </div>
        <div>
          <button
            onClick={liked ? handleUnlike : handleLike}
            className={`${
              liked ? "text-red-500" : "text-gray-500"
            } font-semibold text-sm`}
          >
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </button>
        </div>
      </div>
      <img
        className="object-cover w-full"
        src={post.image_url}
        alt="Post"
        style={{ height: "400px" }}
      />
      <div className="px-4 py-2">
        <p className="text-gray-800 font-semibold">{post.title}</p>
        <p className="text-gray-700">{post.content}</p>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={profilePicture}
            alt="Profile"
          />
          <p className="text-gray-800 font-semibold">{post.user?.username}</p>
        </div>
        <p className="text-gray-600 text-xs">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="px-4 py-2 bg-gray-100">
        <button
          onClick={handleDelete}
          className="text-red-500 font-semibold text-sm"
        >
          Delete Post
        </button>

        <Link
          to={`/posts/${post.id}`}
          className="text-blue-500 font-semibold text-sm"
        >
          View Post
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
