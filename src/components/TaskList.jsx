import React from 'react';

function TaskList({ tasks, onSelectTask }) {
  return (
    <ul className="divide-y divide-gray-300 max-h-64 overflow-y-auto rounded-lg border border-gray-200 shadow-inner p-4 bg-white">
      {tasks.length === 0 && <li className="text-gray-500 text-center">No Tasks Yet</li>}
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => onSelectTask(task)}
          className="cursor-pointer py-2 px-3 rounded hover:bg-cyan-100 transition select-none text-black"
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
