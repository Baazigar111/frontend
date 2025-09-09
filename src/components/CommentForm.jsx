import React, { useState, useEffect } from 'react';

function CommentForm({ taskId, commentToEdit, onSaved }) {
  const [text, setText] = useState(commentToEdit ? commentToEdit.text : '');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (commentToEdit) setText(commentToEdit.text);
  }, [commentToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const url = commentToEdit
      ? `${apiUrl}/tasks/${taskId}/comments/${commentToEdit.id}`
      : `${apiUrl}/tasks/${taskId}/comments`;

    const method = commentToEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to save comment');
      setText('');
      onSaved();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!taskId) return null;

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-black bg-white"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
      >
        {commentToEdit ? 'Update' : 'Add'} Comment
      </button>
    </form>
  );
}

export default CommentForm;
