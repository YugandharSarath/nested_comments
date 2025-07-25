
---

## 🧵 Nested Comments 

---

### 📌 Requirements

* Users should be able to **add new top-level comments**.
* Users should be able to **reply to any existing comment**, supporting **infinite nesting**.
* Each comment can have its **own reply box** toggled independently.
* Replies must be displayed **nested under their parent comment**.
* UI should remain **clean and readable** even with many levels of nesting.

---

### ⚠️ Edge Cases & Constraints

* 🧼 **Empty input must not be allowed** – submission should be blocked or disabled.
* 🔁 **Multiple replies** should work without UI conflicts or state overwrite.
* 🌀 Must handle **deep nesting** without crashing or UI breaking (e.g., 10+ levels deep).
* 🗑 If **delete is supported**, removing a comment should also remove **all of its nested replies**.
* 🔽 (If implemented) **Collapse/Expand** must toggle only the replies of that specific comment.
* 💬 **Replying** to a reply must appear directly under that reply in the hierarchy.

---

