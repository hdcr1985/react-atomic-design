import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskForm = ({ isEditing, taskToEdit, setIsEditing }) => {
  const { handleAddTask, handleEditTask, loading } = useContext(TaskContext);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isEditing && taskToEdit) {
      setTitle(taskToEdit.title);
    } else {
      setTitle('');
    }
  }, [isEditing, taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditTask({ ...taskToEdit, title });
      setIsEditing(false);
    } else {
      handleAddTask({ title, created_at: new Date().toISOString() });
    }
    setTitle('');
  };

  return (
    <div className="mb-3 mt-3">
      <h2 className="mb-3">{isEditing ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escriba su nueva tarea"
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className={isEditing ? 'fas fa-save' : 'fas fa-plus'}></i>
            )}
            {isEditing ? ' Guardar' : ' Agregar Tarea'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;