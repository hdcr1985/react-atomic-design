import React, { useState, useContext } from 'react';
import TaskList from '../organisms/TaskList';
import TaskForm from '../molecules/TaskForm';
import { TaskContext } from '../../context/TaskContext';
import '../../index.css';

const TaskPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { loading } = useContext(TaskContext);

  return (
    <div className="container">
      <TaskForm
        isEditing={isEditing}
        taskToEdit={taskToEdit}
        setIsEditing={setIsEditing}
        setTaskToEdit={setTaskToEdit}
      />
      {loading ? (
        <div className="text-center mt-4">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
          <p className='loading-text'>Cargando Tareas...</p>
        </div>
      ) : (
        <TaskList
          setIsEditing={setIsEditing}
          setTaskToEdit={setTaskToEdit}
        />
      )}
    </div>
  );
};

export default TaskPage;