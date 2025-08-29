import React from "react";

interface PillProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({ label, selected = false, onClick }) => {
  return (
    <button
      className={`px-4 py-1 rounded-full border text-sm font-medium mr-2 mb-2 transition-colors focus:outline-none ${
        selected
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

export default Pill;
