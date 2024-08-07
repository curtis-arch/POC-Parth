import React, { useEffect } from 'react';

const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const modalStyle = `
    #modal {
      @apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white shadow-lg z-50;
    }
    #overlay {
      @apply fixed top-0 left-0 w-full h-full bg-black/50 z-40;
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
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Modal Title</h2>
        <p class="mb-4">This is a modal content.</p>
        <button class="btn btn-primary" id="closeButton">Close</button>
      </div>
    `;
    shadowRoot.appendChild(modal);

    const closeButton = modal.querySelector('#closeButton');
    closeButton?.addEventListener('click', onClose);

    document.body.appendChild(shadowHost);

    return () => {
      shadowHost.remove();
    };
  }, [onClose]);

  return null;
};

export default Modal;
