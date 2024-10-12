import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-gradient-to-r from-purple-50 to-white p-6 rounded-lg shadow-2xl w-full max-w-3xl">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-purple-600 transition-colors"
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
