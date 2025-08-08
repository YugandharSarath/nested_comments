# Nested Comments System — Test Cases

## 1. Render the comment section
- The title "Comment Section" should be displayed.
- The top-level comment input should be rendered with:
  - `data-testid="new-comment-input"`
  - `placeholder="Type a comment..."`
- The top-level "Add Comment" button should be rendered with:
  - `data-testid="add-comment-btn"`

---

## 2. Add a new comment
- Enter text into `data-testid="new-comment-input"`.
- Click `data-testid="add-comment-btn"`.
- The new comment's text should appear in the DOM inside `data-testid="comment-{id}"`.

---

## 3. Add a reply to a comment
- For the first comment, click `data-testid="reply-btn-{id}"`.
- A reply input with `data-testid="reply-input-{id}"` should appear.
- Enter text in that reply input and click `data-testid="submit-reply-btn-{id}"`.
- The reply's text should appear inside the corresponding comment's replies section.

---

## 4. Add a nested reply
- Add a reply to the first comment.
- Locate that reply’s `reply-btn-{id}` and click it.
- A nested reply input should appear (`reply-input-{id}`).
- Enter text and click `submit-reply-btn-{id}`.
- The nested reply text should appear inside the correct nested replies list.

---

## 5. Data-testid verification
All interactive elements and comment containers should have `data-testid` attributes:
- Top-level input: `new-comment-input`
- Top-level button: `add-comment-btn`
- Each comment wrapper: `comment-{id}`
- Each comment's reply button: `reply-btn-{id}`
- Each reply input: `reply-input-{id}`
- Each reply submit button: `submit-reply-btn-{id}`
