import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-5 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
