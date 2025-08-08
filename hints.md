
---

## ❓ What You’re Building

A **Nested Comments System** — like on Reddit or Hacker News — where:

* Users can post a **top-level comment**
* Users can reply to **any comment**
* Replies are **nested under** their parent comment
* Each comment can be replied to, **forever** (infinite nesting)

---

## ⚙️ Hints (With Code & Explanation)

---

### 1. 🧠 **Use a Tree-like Data Structure**

Each comment should be an object like:

```js
{
  id: 1,
  text: "This is a comment",
  replies: [
    {
      id: 2,
      text: "This is a reply",
      replies: [ ... ]
    }
  ]
}
```

🔁 This allows **infinite nesting**.

---

### 2. 🧱 **Recursive Component Rendering**

A `Comment` component should render itself **and its children**:

```jsx
const Comment = ({ comment, addReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div data-testid={`comment-${comment.id}`} className="comment">
      <div>{comment.text}</div>

      <button
        data-testid={`reply-btn-${comment.id}`}
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        Reply
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
                setReplyText("");
                setShowReplyInput(false);
              }
            }}
          >
            Submit
          </button>
        </div>
      )}

      <div className="replies">
        {comment.replies.map(reply => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};
```

---

### 3. 💬 **Replying to a Comment**

* Each comment has its own **Reply** button.
* Clicking it shows an input (`placeholder="Type your reply..."`) and **Submit** button.
* Use `data-testid` on all interactive elements for testing.

---

### 4. 🧩 **Managing State in the Parent**

Store all comments in the parent component:

```jsx
const [comments, setComments] = useState([]);

const addReply = (parentId, text) => {
  const newReply = {
    id: Date.now(),
    text,
    replies: []
  };

  const addToTree = (nodes) => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return { ...node, replies: [...node.replies, newReply] };
      }
      return { ...node, replies: addToTree(node.replies) };
    });
  };

  setComments(prev => addToTree(prev));
};
```

---

### 5. 🎬 **Top-Level Comment Input**

Your top-level component should allow adding new comments:

```jsx
const NestedComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments(prev => [
        ...prev,
        { id: Date.now(), text: newComment, replies: [] }
      ]);
      setNewComment("");
    }
  };

  return (
    <div>
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

      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};
```

---

### ✅ Summary of `data-testid` values for testing

* `new-comment-input` — top-level comment input
* `add-comment-btn` — button to add a top-level comment
* `comment-{id}` — wrapper div for each comment
* `reply-btn-{id}` — button to show reply input for a comment
* `reply-input-{id}` — input for typing a reply
* `submit-reply-btn-{id}` — button to submit a reply

---

This way, the hints now exactly match your test requirements and code structure.

---
