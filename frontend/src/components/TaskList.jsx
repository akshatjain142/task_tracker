function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Add a task to get started.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-card-header">
            <div>
              <h3>{task.title}</h3>
              <p className="meta">
                Due {new Date(task.dueDate).toLocaleDateString()} · {task.priority}
              </p>
            </div>
            <span className={`status-pill status-${task.status.replace(' ', '-').toLowerCase()}`}>
              {task.status}
            </span>
          </div>
          <p>{task.description || 'No description provided.'}</p>
          <div className="task-actions">
            <button className="btn btn-small" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button className="btn btn-small btn-danger" onClick={() => onDelete(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
