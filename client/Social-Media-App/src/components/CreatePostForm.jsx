// components/CreatePostForm.jsx
import React, { useState } from "react";
import axios from "axios";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/posts", { title, content });
      // Handle successful post creation (maybe refresh the list of posts)
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        className="border border-gray-300 p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
