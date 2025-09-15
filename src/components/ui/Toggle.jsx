import React from 'react';
import { cn } from '../../lib/utils';

const Toggle = ({ 
  isOn, 
  onToggle, 
  label, 
  className,
  disabled = false,
  ...props 
}) => {
  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          isOn ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            isOn ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
};

export { Toggle };
