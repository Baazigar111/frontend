import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const refreshCommentList = () => {
    setRefreshComments((prev) => !prev);
  };

  const deleteTask = async () => {
    if (!selectedTask) return;

    if (!window.confirm(`Delete task "${selectedTask.title}"?`)) return;

    try {
      const res = await fetch(`${apiUrl}/tasks/${selectedTask.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTasks(tasks.filter((t) => t.id !== selectedTask.id));
        setSelectedTask(null);
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting task');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-tr from-teal-100 via-cyan-100 to-purple-200 flex flex-col">
      <h1 className="text-5xl font-extrabold mt-12 mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-xl">
        Task Manager Pro
      </h1>
      <div className="flex-1 w-full bg-white rounded-none shadow-none p-8">
        <section className="mb-12 p-8 rounded-2xl shadow-lg border border-cyan-300 hover:shadow-xl transition-shadow duration-300">
          <TaskForm onTaskAdded={addTask} />
        </section>

        <section className="mb-12 p-8 rounded-2xl shadow-lg border border-cyan-300 hover:shadow-xl transition-shadow duration-300">
          <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
        </section>

        {selectedTask && (
          <section className="p-10 rounded-3xl shadow-lg border border-purple-400">
            <div className="flex justify-between items-center mb-8 border-b border-purple-300 pb-6">
              <h2 className="text-3xl font-bold text-purple-800 tracking-wide">
                Comments for: <span className="text-cyan-600">{selectedTask.title}</span>
              </h2>
              <button
                onClick={deleteTask}
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-colors duration-300 active:scale-95"
                title="Delete Task"
              >
                Delete Task
              </button>
            </div>

            <CommentForm taskId={selectedTask.id} onSaved={refreshCommentList} />

            <div className="mt-10">
              <CommentList
                taskId={selectedTask.id}
                refresh={refreshComments}
                onDeleted={refreshCommentList}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
