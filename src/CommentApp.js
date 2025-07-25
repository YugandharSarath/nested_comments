import React, { useState } from "react";
import "./styles.css";
import mockComments from "./data/mock.json";
import Comment from "./Comment";

let idCounter = 1;

export default function CommentApp() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  const addReply = (id, text) => {
    const addNestedReply = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: ++idCounter, text, replies: [] },
            ],
          };
        }
        return {
          ...comment,
          replies: addNestedReply(comment.replies),
        };
      });
    };

    setComments(addNestedReply(comments));
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: ++idCounter, text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="App">
      <h2>Comment Section</h2>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type a comment..."
        />
        <button onClick={addComment}>Add Comment</button>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </div>
    </div>
  );
}
