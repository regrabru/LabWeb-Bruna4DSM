import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const AddTask = ({ categoryId }) => {
  const [taskName, setTaskName] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(categoryId, taskName);
      setTaskName('');
    }
  };

  return (
    <div>
      <span>Adicionar Tarefa</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Nova tarefa..."
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddTask;
