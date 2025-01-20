import React, { useState } from "react";

interface Task {
  _id: string;
  title: string;
  isComplete: boolean;
}

const TaskList: React.FC<{
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
  onCreate: (title: string) => void;
}> = ({ tasks, onToggle, onDelete, onUpdate, onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const openModal = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setNewTitle(currentTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
    setNewTitle("");
  };

  const handleUpdate = () => {
    if (editingTaskId) {
      onUpdate(editingTaskId, newTitle);
      closeModal();
    }
  };

  const handleCreate = () => {
    if (newTaskTitle.trim()) {
      onCreate(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Your Tasks</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="p-2 border rounded"
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-600 text-white rounded"
          onClick={handleCreate}
        >
          Create Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center mb-2">
            <span className={task.isComplete ? "line-through" : ""}>
              {task.title}
            </span>
            <div className="flex gap-2">
              <button
                className={`px-4 py-1 rounded ${
                  task.isComplete ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => onToggle(task._id)}
              >
                {task.isComplete ? "Completed" : "Mark Complete"}
              </button>
              <button
                className="px-4 py-1 rounded bg-yellow-500 text-white"
                onClick={() => openModal(task._id, task.title)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1 rounded bg-red-500 text-white"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for editing task */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          style={{ zIndex: "9999" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Edit Task</h3>
            <label className="block text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 rounded bg-blue-600 text-white"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
