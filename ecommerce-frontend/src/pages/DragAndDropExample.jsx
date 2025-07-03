import React, { useState } from 'react';

const DragAndDropExample = () => {
  const [droppedItem, setDroppedItem] = useState(null);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    setDroppedItem(data);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Para permitir el drop
  };
  
  return (
    <div className="p-6 flex flex-col gap-6">
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, '🐶 Dog')}
        className="w-32 h-16 bg-blue-200 text-center leading-16 cursor-move rounded shadow"
      >
        Arrastrame
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-400 flex items-center justify-center rounded"
      >
        {droppedItem ? `Soltaste: ${droppedItem}` : 'Soltá algo acá'}
      </div>
    </div>
  );
};

export default DragAndDropExample;
