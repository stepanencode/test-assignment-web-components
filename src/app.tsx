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
    <div className="container">
      <span className="header">Select Items</span>
      {selectedItems.length > 0 ? (
        <p>You currently have {selectedItems.length} selected items</p>
      ) : (
        <p>You currently haven't selected items</p>
      )}
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id} className="selected-item">
            <span>Element {item.id}</span>
            <div className="selected-item-divider"></div>
            <button
              role="button"
              onClick={handleDeleteClick(item.id)}
              className="delete-button"
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <button className="change-button" onClick={handleSetIsModalOpen}>
        Change my choice
      </button>
      {isModalOpen && (
        <Modal
          selected={selectedItems}
          onSave={(items) => handleSave(items)}
          onCancel={() => handleCancel()}
          elements={elements}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
        />
      )}
    </div>
  );
};

export default App;
