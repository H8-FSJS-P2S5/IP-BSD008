// pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard"; // Make sure to use PostCard
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {currentUser && (
        <div className="text-center mb-12">
          <p className="text-2xl font-semibold">
            Welcome, {currentUser.username}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
