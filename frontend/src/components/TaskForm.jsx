import { useState } from 'react';

const statusOptions = ['Pending', 'In Progress', 'Complete'];
const priorityOptions = ['Low', 'Medium', 'High'];

function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(task);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!formData.dueDate) {
      setError('Due date is required.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task.title ? 'Edit Task' : 'Create Task'}</h2>
      {error && <div className="form-error">{error}</div>}
      <label>
        Title
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title"
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description"
        />
      </label>
      <label>
        Due Date
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </label>
      <div className="field-row">
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select name="priority" value={formData.priority} onChange={handleChange}>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save Task
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
