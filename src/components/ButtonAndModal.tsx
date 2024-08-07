import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import 'flowbite';
import '../styles/tailwind.css'; // Ensure Tailwind CSS is included

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalStyle = `
    #modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    #overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 999;
    }
    button {
      margin-top: 20px;
    }
  `;

  useEffect(() => {
    const shadowHost = document.createElement('div');
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = modalStyle;
    shadowRoot.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.onclick = onClose;
    shadowRoot.appendChild(overlay);

    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.innerHTML = `
      <h2 class="text-lg font-semibold">Modal Title</h2>
      <p>This is a modal content.</p>
      <button id="closeButton" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Close</button>
    `;
    shadowRoot.appendChild(modal);

    const closeButton = modal.querySelector('#closeButton');
    closeButton?.addEventListener('click', onClose);

    document.body.appendChild(shadowHost);

    return () => {
      if (document.body.contains(shadowHost)) {
        document.body.removeChild(shadowHost);
      }
    };
  }, [onClose]);

  return null;
};

const ButtonAndModal: React.FC<{ targetSelector: string }> = ({ targetSelector }) => {
  const [buttonInserted, setButtonInserted] = useState(false);
  const [root, setRoot] = useState<Root | null>(null); // Manage the root instance

  useEffect(() => {
    if (buttonInserted) return; // Prevent multiple button injections

    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      const button = document.createElement('button');
      button.innerText = 'Open Modal';
      button.className = 'fixed bottom-10 right-10 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600'; // Tailwind classes for styling
      button.onclick = openModal;
      targetElement.parentNode?.insertBefore(button, targetElement.nextSibling);
      setButtonInserted(true);
    } else {
      console.error('Target element not found');
    }
  }, [targetSelector, buttonInserted]);

  const openModal = () => {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'myModalContainer';
    document.body.appendChild(modalContainer);

    const newRoot = createRoot(modalContainer);
    setRoot(newRoot); // Set the root instance
    newRoot.render(<Modal onClose={() => closeModal(modalContainer)} />);
  };

  const closeModal = (modalContainer: HTMLElement) => {
    if (root) {
      root.unmount();
      console.log('Modal closed', document.body.contains(modalContainer));
      if (document.body.contains(modalContainer)) {
        document.body.removeChild(modalContainer);
      }
    }
  };

  return null;
};

export default ButtonAndModal;
