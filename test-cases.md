# Test Cases for Nested Comments System

## Add a Comment
- Enter a comment in the input field and click "Add Comment"
- ✅ Expected: The comment should appear in the comment list

## Add a Reply to a Comment
- Click "Add a reply" under any comment
- Enter reply text and click "Submit"
- ✅ Expected: The reply should appear nested under the comment

## Add Nested Reply
- Add a reply to an existing reply
- ✅ Expected: The nested reply should appear in a tree-like format

## Toggle Reply Box
- Click "Add a reply" again
- ✅ Expected: Reply input box should hide
