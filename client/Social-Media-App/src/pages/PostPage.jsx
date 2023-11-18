import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setPost({ ...post, Comments: [...post.Comments, newComment] });
  };

  const handleCommentDelete = async (commentId) => {
    try {
      // Assuming an API endpoint for comment deletion
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      setPost({
        ...post,
        Comments: post.Comments.filter((c) => c.id !== commentId),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!post) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="border-b border-gray-300 mb-4 pb-4">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-xl">{post.content}</p>
        <p className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>
      <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
      <div className="space-y-4">
        <h2 className="text-xl font-semibold"></h2>
        {post.Comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
