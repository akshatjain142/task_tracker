const API_URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

const handleResponse = async (response) => {
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.error || "API request failed");
  }

  return body;
};

export const fetchTasks = async (filters = {}) => {
  const query = new URLSearchParams();

  if (filters.search) query.set("search", filters.search);
  if (filters.status) query.set("status", filters.status);
  if (filters.sort) query.set("sort", filters.sort);

  const response = await fetch(`${API_URL}?${query.toString()}`);
  return handleResponse(response);
};

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};