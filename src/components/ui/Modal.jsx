import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Modal = ({ isOpen, onClose, children, className, ...props }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ className, children, ...props }) => (
  <div
    className={cn("p-6 pb-4 border-b border-gray-200 dark:border-gray-700", className)}
    {...props}
  >
    {children}
  </div>
);

const ModalTitle = ({ className, children, ...props }) => (
  <h2
    className={cn("text-2xl font-bold text-gray-900 dark:text-gray-100", className)}
    {...props}
  >
    {children}
  </h2>
);

const ModalContent = ({ className, children, ...props }) => (
  <div
    className={cn("p-6 overflow-y-auto max-h-[calc(90vh-120px)]", className)}
    {...props}
  >
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div
    className={cn("p-6 pt-4 border-t border-gray-200 dark:border-gray-700", className)}
    {...props}
  >
    {children}
  </div>
);

export { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter };
