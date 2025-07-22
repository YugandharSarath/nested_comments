
---

## 🧵 Nested Comments 

### 🧠 Goal

Build a **nested comment system** where users can:

* Add comments
* Reply to any comment (supports infinite nesting)
* Delete comments (optional)
* Collapse long threads (optional)

---

### ✅ Core Features

* ➕ Add new top-level comments
* 💬 Reply to any comment (recursively nested)
* 🗑 Delete any comment or reply (optional)
* 🔽 Collapse/Expand replies (optional)

---

### 📚 Requirements & Edge Cases

| Case                          | Behavior                                       |
| ----------------------------- | ---------------------------------------------- |
| 🧼 Empty input                | Disable or block submission                    |
| 🌀 Deeply nested replies      | Component handles deep levels without crashing |
| 🔁 Repeated add/reply actions | Must work correctly on multiple interactions   |
| 🗑 Delete a parent comment    | Deletes all nested replies inside              |

---

### 🧪 Testing Notes (React Testing Library)

Use realistic user simulation:

```tsx
// Replying to a comment with ID 1
fireEvent.click(screen.getByTestId('reply-btn-1'));
fireEvent.change(screen.getByTestId('reply-input-1'), {
  target: { value: 'Nested reply' },
});
fireEvent.click(screen.getByText('Submit'));
```

#### ✅ Suggested Unit Tests

* Add a top-level comment
* Add a reply to a comment
* Add nested reply to a reply
* Prevent submitting empty comment
* Delete comment and all children (optional)
* Collapse/Expand a thread (optional)

---

### 🏷️ Suggested Test IDs

| Element           | `data-testid`                        |
| ----------------- | ------------------------------------ |
| Comment container | `comment-${id}`                      |
| Reply button      | `reply-btn-${id}`                    |
| Reply input       | `reply-input-${id}`                  |
| Submit button     | (button with visible label "Submit") |
| Delete button     | `delete-btn-${id}` (optional)        |
| Collapse toggle   | `collapse-btn-${id}` (optional)      |

---

### 💡 Bonus Features (Optional)

* 📝 Markdown or emoji support
* ⏱ Show timestamps
* 🧠 Collapse long threads by default
* 💾 Save/load from local storage or backend

---
