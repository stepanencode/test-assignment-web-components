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
// import { elementsArray } from './lib/data';
// import { ButtonGroup } from './components/ButtonGroup';

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([5, 51]); // Выбранные элементы по умолчанию
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newSelectedItems: number[]) => {
    setSelectedItems(newSelectedItems);
    setIsModalOpen(false);
  };

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

      {isModalOpen && (
        <Modal
          selectedItems={selectedItems}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
