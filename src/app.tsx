import React, { useEffect, useState } from 'react';
import { Modal } from './components/Modal';
import { generateElements } from './lib/data';
import ElementItem from './types/element.type';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<ElementItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    setElements(generateElements());
  }, []);

  const handleSave = (newSelectedItems: ElementItem[]) => {
    setSelectedItems(newSelectedItems);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedItems(selectedItems);
    setIsModalOpen(false);
  };

  const handleDelete = (itemId: number) => {
    const newItems = selectedItems.filter((i) => i.id !== itemId);
    setSelectedItems(newItems);
  };

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <span key={item.id} className="tag">
            Element {item.id}
            <button onClick={() => handleDelete(item.id)}>x</button>
          </span>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Change my choice</button>
      {isModalOpen && (
        <Modal
          selectedItems={selectedItems}
          onSave={(items) => handleSave(items)}
          onCancel={() => handleCancel()}
          elements={elements}
        />
      )}
    </div>
  );
};

export default App;
