import React, { useState } from "react";
import "./styles.css";
import mockComments from "./data/mock.json";
import { CommentType } from "./data/types";

let idCounter = 1;

const Comment = ({
  comment,
  addReply,
}: {
  comment: CommentType;
  addReply: (id: number, text: string) => void;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <div>{comment.text}</div>
      <button
        className="reply-btn"
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        Add a reply
      </button>
      {showReplyInput && (
        <div className="reply-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
          />
          <button onClick={handleReply}>Submit</button>
        </div>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState<CommentType[]>(
    mockComments as CommentType[]
  );
  const [newComment, setNewComment] = useState("");

  const addReply = (id: number, text: string) => {
    const addNestedReply = (comments: CommentType[]): CommentType[] => {
      return comments.map((comment) => {
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
};

export default App;
