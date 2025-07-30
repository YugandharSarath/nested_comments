💡 Hints

---

## ❓What You’re Building

A **Nested Comments System** — like you see on Reddit or Hacker News — where:

* Users can post a **top-level comment**
* Users can reply to **any comment**
* Replies are **nested under** their parent comment
* Each comment can be replied to, **forever** (infinite nesting)

---

## ⚙️ Hints (With Code & Explanation)

---

### 1. 🧠 **Use a Tree-like Data Structure**

Each comment should be an object like this:

```js
{
  id: 1,
  text: "This is a comment",
  replies: [  // nested replies
    {
      id: 2,
      text: "This is a reply",
      replies: [ ... ]
    }
  ]
}
```

🔁 This structure allows **infinite nesting**.

---

### 2. 🧱 **Recursive Component Rendering**

You need a `Comment` component that renders itself **and its children**.

```jsx
const Comment = ({ comment, addReply }) => {
  return (
    <div className="comment">
      <div>{comment.text}</div>

      {/* Reply form (explained later) */}

      {/* Recursively render replies */}
      <div className="replies">
        {comment.replies.map(reply => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
      </div>
    </div>
  );
};
```

This is the **core logic** for showing nested replies under each comment.

---

### 3. 💬 **Replying to a Comment**

You should have a small input box + submit button to add a reply:

```jsx
const [showReplyInput, setShowReplyInput] = useState(false);
const [replyText, setReplyText] = useState("");

return (
  <>
    <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
    {showReplyInput && (
      <div>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button onClick={() => {
          if (replyText.trim()) {
            addReply(comment.id, replyText);
            setReplyText("");
            setShowReplyInput(false);
          }
        }}>Submit</button>
      </div>
    )}
  </>
);
```

---

### 4. 🧩 **Managing State in the Parent**

Store all comments (and replies) in a state like this:

```js
const [comments, setComments] = useState([]);
```

When you add a reply, use a recursive helper:

```js
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

This makes sure the **new reply** is added to the correct comment.

---

### 5. 🎬 **Putting it All Together**

Your top-level component:

```jsx
const NestedComments = () => {
  const [comments, setComments] = useState([]);

  const addComment = (text) => {
    setComments(prev => [...prev, { id: Date.now(), text, replies: [] }]);
  };

  return (
    <div>
      <input type="text" onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          addComment(e.target.value);
          e.target.value = "";
        }
      }} placeholder="Add a comment..." />

      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} addReply={addReply} />
      ))}
    </div>
  );
};
```

---


