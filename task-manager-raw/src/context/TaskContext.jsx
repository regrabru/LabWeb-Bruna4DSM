import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const addCategory = (categoryName) => {
    if (categoryName.trim() === '') return;
    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      tasks: []
    };
    setCategories([...categories, newCategory]);
  };

  const addTask = (categoryId, taskName) => {
    if (taskName.trim() === '') return;
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          tasks: [...category.tasks, {
            id: Date.now(),
            name: taskName.trim(),
            completed: false
          }]
        };
      }
      return category;
    }));
  };

  const toggleTask = (categoryId, taskId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          tasks: category.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        };
      }
      return category;
    }));
  };

  return (
    <TaskContext.Provider value={{ categories, addCategory, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
  }
  return context;
};

export default TaskContext;
