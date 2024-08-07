import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Expose a global function to initialize the component
(window as any).initButtonAndModal = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
};
