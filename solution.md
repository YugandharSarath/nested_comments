# Nested Comments System — React Solution

```jsx
import React, { useState } from 'react';

const Comment = ({ comment, addReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  return (
    <div data-testid={`comment-${comment.id}`} style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
      <div>{comment.text}</div>
      <button
        data-testid={`reply-btn-${comment.id}`}
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        Add a reply
      </button>

      {showReplyInput && (
        <div>
          <input
            data-testid={`reply-input-${comment.id}`}
            type="text"
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            data-testid={`submit-reply-btn-${comment.id}`}
            onClick={() => {
              if (replyText.trim()) {
                addReply(comment.id, replyText);
                setReplyText('');
                setShowReplyInput(false);
              }
            }}
          >
            Submit
          </button>
        </div>
      )}

      <div>
        {comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { id: Date.now(), text: newComment, replies: [] }
      ]);
      setNewComment('');
    }
  };

  const addReply = (parentId, text) => {
    const newReply = {
      id: Date.now(),
      text,
      replies: []
    };

    const addToTree = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId) {
          return { ...node, replies: [...node.replies, newReply] };
        }
        return { ...node, replies: addToTree(node.replies) };
      });
    };

    setComments((prev) => addToTree(prev));
  };

  return (
    <div>
      <h1>Comment Section</h1>
      <input
        data-testid="new-comment-input"
        type="text"
        placeholder="Type a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        data-testid="add-comment-btn"
        onClick={addComment}
      >
        Add Comment
      </button>

      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};

export default App;
