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
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-clean max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
          Task Manager Pro
        </h1>

        <section className="mb-12">
          <TaskForm onTaskAdded={addTask} />
        </section>

        <section className="mb-12">
          <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
        </section>

        {selectedTask && (
          <section className="p-8 rounded-xl shadow-inner border border-gray-300">
            <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
              <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
                Comments for: <span className="text-primary">{selectedTask.title}</span>
              </h2>
              <button
                onClick={deleteTask}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl shadow transition"
                title="Delete Task"
              >
                Delete Task
              </button>
            </div>

            <CommentForm taskId={selectedTask.id} onSaved={refreshCommentList} />

            <div className="mt-8">
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
