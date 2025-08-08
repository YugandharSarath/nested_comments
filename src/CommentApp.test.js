import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

function addComment(text) {
  const input = screen.getByTestId('new-comment-input');
  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(screen.getByTestId('add-comment-btn'));
}

function addReplyToComment(commentId, text) {
  fireEvent.click(screen.getByTestId(`reply-btn-${commentId}`));
  const replyInput = screen.getByTestId(`reply-input-${commentId}`);
  fireEvent.change(replyInput, { target: { value: text } });
  fireEvent.click(screen.getByTestId(`submit-reply-${commentId}`));
}

describe('CommentApp', () => {
  test('renders the comment section', () => {
    render(<App />);
    expect(screen.getByText('Comment Section')).toBeInTheDocument();
    expect(screen.getByTestId('new-comment-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-comment-btn')).toBeInTheDocument();
  });

  test('can add a new comment', () => {
    render(<App />);
    addComment('This is a new comment');
    expect(screen.getByText('This is a new comment')).toBeInTheDocument();
  });

  test('can add a reply to a comment', () => {
    render(<App />);
    const firstCommentId = 1; // assuming first mock comment has id=1
    addReplyToComment(firstCommentId, 'This is a reply');
    expect(screen.getByText('This is a reply')).toBeInTheDocument();
  });

  test('can add a nested reply', () => {
    render(<App />);
    const firstCommentId = 1;
    addReplyToComment(firstCommentId, 'First reply');

    // The first reply will have a new auto-generated id = 2
    addReplyToComment(2, 'Nested reply');
    expect(screen.getByText('Nested reply')).toBeInTheDocument();
  });
});
