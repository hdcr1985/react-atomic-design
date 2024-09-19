import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskPage from './components/templates/TaskPage';

function App() {
  return (
    <TaskProvider>
      <TaskPage />
    </TaskProvider>
  );
}

export default App;