import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskList = ({ categoryId, tasks }) => {
  const { toggleTask } = useTaskContext();

  if (tasks.length === 0) {
    return <p>Nenhuma tarefa adicionada ainda.</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(categoryId, task.id)}
            />
            <span style={task.completed ? { textDecoration: 'line-through' } : {}}>
              {task.name}
            </span>
          </label>
          {' - '}
          <span>{task.completed ? 'Concluída' : 'Pendente'}</span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
