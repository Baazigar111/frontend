import React, { useState } from 'react';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const submitTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add task');

      const newTask = await res.json();
      onTaskAdded(newTask);
      setTitle('');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submitTask} className="flex gap-4">
      <input
        type="text"
        placeholder="New Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-black bg-white"
      />
      <button
        type="submit"
        className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg border-2 border-white transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
