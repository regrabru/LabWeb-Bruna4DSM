import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      addCategory(categoryName);
      setCategoryName('');
    }
  };

  return (
    <div>
      <p>Adicionar Nova Categoria</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Ex: Trabalho, Estudos, Casa..."
        />
        <button type="submit">Adicionar</button>
      </form>
      <hr />
    </div>
  );
};

export default AddCategory;
