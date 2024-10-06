import React, { useEffect, useState } from 'react';
import { Modal } from './components/Modal';
import { generateElements } from './lib/data';
import ElementItem from './types/element.type';

import './index.css';

const App = () => {
  const [selectedItems, setSelectedItems] = useState<ElementItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ElementItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elements, setElements] = useState<ElementItem[]>([]);

  useEffect(() => {
    const initialState = generateElements();
    setElements(initialState);
    setFilteredItems(initialState);
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
    const newItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== itemId
    );
    setSelectedItems(newItems);
  };

  const handleDeleteClick = (itemId: number) => () => {
    handleDelete(itemId);
  };

  const handleSetIsModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id} className="selected-item">
            Element {item.id}
            <button
              role="button"
              onClick={handleDeleteClick(item.id)}
              className="button"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <button className="delete-button" onClick={handleSetIsModalOpen}>
        Change my choice
      </button>
      {isModalOpen && (
        <Modal
          selectedItems={selectedItems}
          onSave={(items) => handleSave(items)}
          onCancel={() => handleCancel()}
          elements={elements}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
        />
      )}
    </>
  );
};

export default App;
