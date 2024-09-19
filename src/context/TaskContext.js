import React, { createContext, useState, useEffect } from 'react';
import { getTasks, addTask, editTask, deleteTask, toggleTaskStatus, getTasksOrder, getTasksOrderStatus, getTasksCompleted } from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(false);
  const [order, setOrder] = useState('ASC');
  const [status, setStatus] = useState('ASC');
  const [statusType, setStatusType] = useState(0);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true); 
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleAddTask = async (task) => {
    setLoading(true);
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (task) => {
    setLoading(true);
    try {
      const updatedTask = await editTask(task);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to edit task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTaskStatus = async (task) => {
    setLoading(true);
    try {
      const updatedTask = await toggleTaskStatus(task);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = async (criteria) => {
    setSorting(true);
    setLoading(true);
  
    console.log("CRITERIO: " + criteria);
  
    setOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    setStatus((prevStatus) => (prevStatus === 'ASC' ? 'DESC' : 'ASC'));
    setStatusType((prevStatusType) => (prevStatusType === 0 ? 1 : 0));
  
    try {
      let data;
      if (criteria === 'date') {
        data = await getTasksOrder(order === 'ASC' ? 'DESC' : 'ASC');
      } else if (criteria === 'completed') {
        data = await getTasksOrderStatus(status === 'ASC' ? 'DESC' : 'ASC');
      }else if (criteria === 'only_completed') {
        data = await getTasksCompleted(statusType === 0 ? 1 : 0);
      }
      
      if (data) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false); 
      setSorting(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, sorting, handleAddTask, handleEditTask, handleDeleteTask, handleToggleTaskStatus, sortTasks }}>
      {children}
    </TaskContext.Provider>
  );
};