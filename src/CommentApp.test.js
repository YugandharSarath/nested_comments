import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

function addComment(text) {
  const input = screen.getByPlaceholderText('Type a comment...');
  fireEvent.change(input, { target: { value: text } });
  fireEvent.click(screen.getByText('Add Comment'));
}

function addReplyToFirstComment(text) {
  const replyButtons = screen.getAllByText('Add a reply');
  fireEvent.click(replyButtons[0]);
  const replyInput = screen.getByPlaceholderText('Type your reply...');
  fireEvent.change(replyInput, { target: { value: text } });
  fireEvent.click(screen.getByText('Submit'));
}

describe('App', () => {
  test('renders the comment section', () => {
    render(<App />);
    expect(screen.getByText('Comment Section')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a comment...')).toBeInTheDocument();
  });

  test('can add a new comment', () => {
    render(<App />);
    addComment('This is a new comment');
    expect(screen.getByText('This is a new comment')).toBeInTheDocument();
  });

  test('can add a reply to a comment', () => {
    render(<App />);
    addReplyToFirstComment('This is a reply');
    expect(screen.getByText('This is a reply')).toBeInTheDocument();
  });

  test('can add a nested reply', () => {
    render(<App />);
    addReplyToFirstComment('First reply');
    const replyButtons = screen.getAllByText('Add a reply');
    fireEvent.click(replyButtons[1]); // reply to the reply
    const replyInput = screen.getByPlaceholderText('Type your reply...');
    fireEvent.change(replyInput, { target: { value: 'Nested reply' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Nested reply')).toBeInTheDocument();
  });
});
