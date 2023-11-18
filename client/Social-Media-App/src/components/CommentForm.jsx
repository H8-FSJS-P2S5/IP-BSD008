// CommentForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for authentication

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { authState } = useContext(AuthContext); // Use AuthContext
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/comments`,
        { content, postId },
        {
          headers: { Authorization: `Bearer ${authState.token}` },
        }
      );
      onCommentAdded(response.data);
      setContent("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="border border-gray-300 p-2 w-full rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isSubmitting ? "opacity-50" : ""
        }`}
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
