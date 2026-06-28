const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

const handleResponse = async (response) => {
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.error || 'API request failed');
  }
  return body;
};

export const fetchTasks = async (filters) => {
  const query = new URLSearchParams();

  if (filters.search) query.set('search', filters.search);
  if (filters.status) query.set('status', filters.status);
  if (filters.sort) query.set('sort', filters.sort);

  const response = await fetch(`${API_URL}?${query.toString()}`);
  return handleResponse(response);
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
