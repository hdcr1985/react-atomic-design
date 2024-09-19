import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks';

// Obtener todas las tareas
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Agregar una tarea
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Editar una tarea
export const editTask = async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Cambiar el estado de una tarea
export const toggleTaskStatus = async (task) => {
  const updatedTask = { ...task, completed: !task.completed };
  const response = await axios.put(`${API_URL}/${task.id}`, updatedTask);
  return response.data;
};
// Obtener todas las tareas ordenadas por fecha
export const getTasksOrder = async (order) => {
  const response = await axios.get(`${API_URL}/getTaskOrderDate/${order}`);
  return response.data;
};
// Obtener todas las tareas ordenadas por estatus
export const getTasksOrderStatus = async (order) => {
  const response = await axios.get(`${API_URL}/getTasksOrderStatus/${order}`);
  return response.data;
};
// Obtener solo las tareas por estatus
export const getTasksCompleted = async (status) => {
  const response = await axios.get(`${API_URL}/getTasksCompleted/${status}`);
  return response.data;
};
