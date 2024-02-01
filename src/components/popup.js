'use client'
// Popup.js
import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  const overlayClasses = isOpen ? 'fixed inset-0 bg-gray-500 opacity-75' : 'hidden';
  const popupClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

  const handleOverlayClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handlePopupClick = (e) => {
    // Evita que el clic en el popup se propague al contenedor de la superposición
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={overlayClasses} onClick={handleOverlayClick}>
      <div className={popupClasses} onClick={handlePopupClick}>
        <div className="bg-white p-8 rounded shadow-lg z-10">
          {children}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

