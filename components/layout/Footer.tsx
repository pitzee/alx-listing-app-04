import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 px-4 text-center mt-8">
      <div className="mb-2">
        <span className="font-semibold text-blue-600">ALXStay</span> &copy;{" "}
        {new Date().getFullYear()} All rights reserved.
      </div>
      <div className="space-x-4 text-sm text-gray-600">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
