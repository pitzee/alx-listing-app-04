import React from "react";

const accommodationTypes = [
  "Rooms",
  "Mansion",
  "Countryside",
  "Beachfront",
  "Cabin",
  "Penthouse",
  "Chalet",
  "Villa",
  "Loft",
  "Cottage",
];

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex items-center mb-2 md:mb-0">
        <span className="text-2xl font-bold text-blue-600 mr-2">ALXStay</span>
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Search destinations, properties..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {/* Auth Buttons */}
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign In
        </button>
        <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
          Sign Up
        </button>
      </div>
      {/* Accommodation Types */}
      <nav className="w-full mt-4 md:mt-0 md:w-auto flex flex-wrap justify-center md:justify-end gap-2">
        {accommodationTypes.map((type) => (
          <span
            key={type}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 cursor-pointer hover:bg-blue-100"
          >
            {type}
          </span>
        ))}
      </nav>
    </header>
  );
};

export default Header;
