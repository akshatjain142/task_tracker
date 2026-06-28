import { useEffect, useMemo, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterSortSearch from './components/FilterSortSearch';
import Toast from './components/Toast';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';

const initialTask = {
  title: '',
  description: '',
  dueDate: '',
  status: 'Pending',
  priority: 'Medium',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(initialTask);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ search: '', status: '', sort: '' });

  const loadTasks = async () => {
    const data = await fetchTasks(filters);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (task) => {
    const saved = await createTask(task);
    if (saved) {
      showToast('Task created');
      setTasks((prev) => [saved, ...prev]);
      setActiveTask(initialTask);
    }
  };

  const handleUpdate = async (task) => {
    const updated = await updateTask(editingId, task);
    if (updated) {
      showToast('Task updated');
      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      setEditingId(null);
      setActiveTask(initialTask);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setActiveTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate.slice(0, 10),
      status: task.status,
      priority: task.priority,
    });
  };

  const handleDelete = async (id) => {
    const result = await deleteTask(id);
    if (result) {
      showToast('Task deleted', 'info');
      setTasks((prev) => prev.filter((task) => task._id !== id));
    }
  };

  const handleSubmit = async (task) => {
    if (editingId) {
      await handleUpdate(task);
      return;
    }
    await handleCreate(task);
  };

  const filteredTasks = useMemo(() => tasks, [tasks]);

  return (
    <div className="app-shell">
      <header>
        <h1>Task Tracker</h1>
        <p>Manage tasks, filter by status, search and update instantly.</p>
      </header>

      <main>
        <section className="card form-card">
          <TaskForm
            key={editingId || 'new'}
            task={activeTask}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingId(null);
              setActiveTask(initialTask);
            }}
          />
        </section>

        <section className="card controls-card">
          <FilterSortSearch filters={filters} onChange={setFilters} />
        </section>

        <section className="card list-card">
          <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
