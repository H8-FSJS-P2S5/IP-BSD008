// components/CommentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async (commentId) => {
    try {
      // Assuming an API endpoint for comment deletion
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onDelete={handleDelete} />
      ))}
          <p className="font-semibold">{comment.User?.username}</p>
          <p>{comment.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
