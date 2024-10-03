import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { elementsArray } from './lib/data';
import ElementItem from './types/element.type';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<ElementItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elements, setElements] = useState<ElementItem[]>(elementsArray);

  const handleSave = (newSelectedItems: ElementItem[]) => {
    setSelectedItems(newSelectedItems);
    setIsModalOpen(false);
  };

  function handleToggleItem(id: number) {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id
          ? { ...element, isChecked: !element.isChecked }
          : element
      )
    );
  }

  return (
    <div>
      <div>
        {selectedItems.map((item) => (
          <span key={item.id} className="tag">
            Element {item.id}{' '}
            <button
              onClick={() =>
                setSelectedItems((prev) => prev.filter((i) => i !== item))
              }
            >
              x
            </button>
          </span>
        ))}
      </div>
      <button onClick={() => setIsModalOpen(true)}>Change my choice</button>
      {isModalOpen && (
        <Modal
          onToggle={handleToggleItem}
          selectedItems={selectedItems}
          onSave={(items) => handleSave(items)}
          onCancel={() => setIsModalOpen(false)}
          elements={elements}
        />
      )}
    </div>
  );
};

export default App;
