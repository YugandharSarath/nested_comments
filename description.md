
---
## 🧵 Nested Comments
---

### 📌 Requirements

- Users should be able to **add new top-level comments**.

  - Enter text in the top-level comment input (`data-testid="new-comment-input"`).
  - Click `"Add Comment"` (`data-testid="add-comment-btn"`) to post.

- Users should be able to **reply to any existing comment**, supporting **infinite nesting**.

  - Each comment shows an `"Add a reply"` button (`data-testid="reply-btn-{id}"`).
  - Clicking the button opens a reply input (`data-testid="reply-input-{id}"`) and a submit button (`data-testid="submit-reply-{id}"`).

- Each comment can have its **own reply box** toggled independently.

- Replies must be displayed **nested under their parent comment**, inside the comment container (`data-testid="comment-{id}"`).

- The system must maintain **hierarchical order**:

  - Replying to a comment places the reply directly under it.
  - Replying to a reply nests under that reply, and so on.

- **All interactive and key display elements must include `data-testid` attributes** for reliable automated testing.

---

### ⚠️ Edge Cases & Constraints

- 🧼 **Empty input must not be allowed** – clicking submit with blank/whitespace-only text should not add a comment or reply.

- 🔁 **Multiple replies** to the same comment should be supported without overwriting existing ones.

- 🌀 Must handle **deep nesting** without UI breaking or recursion errors (tested with nested reply).

- 🗂 **Reply box state isolation** – opening a reply box for one comment should not affect others.

- 🔢 **Unique IDs**:

  - All comments and replies must have unique numeric IDs.
  - These IDs are also used in `data-testid` attributes for targeting in tests.

---

---

- The **top-level comment input field** must have `data-testid="new-comment-input"`.
- The **"Add Comment"** button must have `data-testid="add-comment-btn"`.
- Every **comment container** must have a unique `data-testid` in the format `comment-{id}`.
- Every **reply button** must have a unique `data-testid` in the format `reply-btn-{id}`.
- Every **reply input field** must have a unique `data-testid` in the format `reply-input-{id}`.
- Every **submit reply** button must have a unique `data-testid` in the format `submit-reply-{id}`.
- Use mock.json to preload comments when the app loads.
- mock.json should contain an array of top-level comments, each with:
     id (unique number or string)
     text (string)
     replies (array of nested comment objects with same structure)
- This ensures test cases can start with existing nested comments for verification.
---
