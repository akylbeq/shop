import React, { ReactNode, useEffect } from 'react';
import { XIcon } from 'lucide-react';

interface Props {
  title: string;
  className?: string;
  children: ReactNode;
  closeModal: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  className = '',
  closeModal,
  children,
}) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <>
      <div
        className="fixed left-0 top-0 right-0 bg-black/50 min-h-screen overflow-hidden z-40"
        onClick={closeModal}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg z-50 ${className}`}
      >
        <button className="absolute right-1 top-1">
          <XIcon size={20} onClick={closeModal} />
        </button>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {children}
      </div>
    </>
  );
};

export default Modal;
