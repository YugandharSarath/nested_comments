import React, { useState } from "react";

const Comment = ({ comment, addReply }) => {
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

export default Comment;
