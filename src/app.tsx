// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { createComponent } from '@lit/react';
// import { DemoGreeting as DemoGreetingWC } from './demo-greeting.js';

// // Creates a React component from a Lit component
// const DemoGreeting = createComponent({
//   react: React,
//   tagName: 'demo-greeting',
//   elementClass: DemoGreetingWC,
// });

// const root = createRoot(document.getElementById('app')!);

// root.render(<DemoGreeting name="React" />);

import React, { useState } from 'react';
import { Modal } from './components/Modal';
import { elementsArray } from './lib/data';
import ElementItem from './types/element.type';
import { ElementsList } from './components/ElementsList';
// import { elementsArray } from './lib/data';
// import { ButtonGroup } from './components/ButtonGroup';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([5, 51]); // Выбранные элементы по умолчанию
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elements, setElements] = useState<ElementItem[]>(elementsArray);

  // const handleSave = (newSelectedItems: number[]) => {
  //   setSelectedItems(newSelectedItems);
  //   setIsModalOpen(false);
  // };

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
          <span key={item} className="tag">
            Element {item}{' '}
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
      <div>
        <h1>Element Selector</h1>
        {/* Используем Lit компонент через React обертку */}
        <ElementsList elements={elements} onToggleItem={handleToggleItem} />
      </div>

      {isModalOpen && (
        <Modal
          // selectedItems={selectedItems}
          // onSave={handleSave}
          // onCancel={() => setIsModalOpen(false)}
          elements={elements}
        />
      )}
    </div>
  );
};

export default App;
