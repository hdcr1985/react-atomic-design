import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Button from '../atoms/Button';

const TaskItem = ({ task, onEdit }) => {
  const { handleToggleTaskStatus, handleDeleteTask, loading } = useContext(TaskContext);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          className='mycheck'
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggleTaskStatus(task)}
        />
        <span className={task.completed ? 'text-decoration-line-through' : ''}>
          {task.title}
        </span>
        <span className="text-muted ms-2"> 
          {new Date(task.created_at).toLocaleDateString()}
        </span>        
      </div>
      <div>
        {loading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <>
            <Button className="btn-warning me-1" onClick={() => onEdit(task)}>
              <i className="fas fa-edit"></i>
            </Button>
            <Button className="btn-danger" onClick={() => handleDeleteTask(task.id)}>
              <i className="fas fa-trash"></i>
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;