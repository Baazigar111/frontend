import React, { useEffect, useState } from 'react';

function CommentList({ taskId, refresh, onDeleted }) {
  const [comments, setComments] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!taskId) return;
    fetch(`${apiUrl}/tasks/${taskId}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .catch(console.error);
  }, [taskId, refresh]);

  const deleteComment = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/tasks/${taskId}/comments/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete comment');
      onDeleted();
    } catch (err) {
      alert(err.message);
    }
  };

  if (comments.length === 0) return <p className="text-gray-500">No comments yet.</p>;

  return (
    <ul className="space-y-4 max-h-64 overflow-y-auto">
      {comments.map((c) => (
        <li
          key={c.id}
          className="flex justify-between items-center bg-purple-50 rounded-lg p-3 shadow-sm"
        >
          <span className="text-gray-700">{c.text}</span>
          <button
            onClick={() => deleteComment(c.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            title="Delete Comment"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
