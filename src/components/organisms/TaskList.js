import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from '../molecules/TaskItem';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ setIsEditing, setTaskToEdit }) => {
  const { tasks, loading, sorting, sortTasks } = useContext(TaskContext);

  const startEdit = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <p>Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <Button className="btn btn-secondary me-2" onClick={() => sortTasks('date')}>
          {sorting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Ordenar por Fecha'}
        </Button>
        <Button className="btn btn-secondary me-2" onClick={() => sortTasks('completed')}>
          {sorting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Ordenar por Estatus'}
        </Button>
        <Button className="btn btn-secondary me-2" onClick={() => sortTasks('only_completed')}>
          {sorting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Solo por Estatus'}
        </Button>                
      </div>

      {tasks.length === 0 ? (
        <div class="alert alert-secondary" role="alert">
            No hay tareas disponibles
        </div>    
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={() => startEdit(task)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;