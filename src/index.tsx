import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Импорт основного компонента App

// Находим корневой элемент в HTML, куда будет монтироваться приложение
const rootElement = document.getElementById('app');

if (rootElement) {
  // Создаем React root
  const root = createRoot(rootElement);

  // Рендерим App компонент в корневой элемент
  root.render(<App />);
}
