import React from 'react';
import { TaskProvider } from './context/TaskContext';
import AddCategory from './components/AddCategory';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <TaskProvider>
      <div>
        <h1>Gerenciador de Tarefas por Categoria</h1>
        <AddCategory />
        <CategoryList />
      </div>
    </TaskProvider>
  );
}

export default App;
