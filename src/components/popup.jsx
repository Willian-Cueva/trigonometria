'use client'
// Popup.js
import React from 'react';
import cx from 'clsx'

const Popup = ({ isOpen, onClose, children }) => {
  
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
    <>
    <div className={cx('fixed inset-0 bg-gray-500 opacity-75',{"hidden":!isOpen})} onClick={handleOverlayClick}/>
    <div className={cx('fixed inset-0 flex items-center justify-center',{"hidden":!isOpen})} onClick={handlePopupClick}>
        <div className=" bg-white p-8 rounded shadow-lg">
          {children}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;

