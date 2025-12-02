import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import AddTask from './AddTask';
import TaskList from './TaskList';

const CategoryList = () => {
  const { categories } = useTaskContext();

  if (categories.length === 0) {
    return <p>Nenhuma categoria criada ainda.</p>;
  }

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <AddTask categoryId={category.id} />
          <TaskList categoryId={category.id} tasks={category.tasks} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
