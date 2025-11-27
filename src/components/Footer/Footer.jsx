import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const textColor =
    "text-white hover:text-gray-300 transition-colors duration-200";
  const iconColor =
    "fill-white hover:fill-gray-400 transition-colors duration-200 ";

  return (
    <footer className="w-full bg-emerald-900 py-8 px-4 flex flex-col items-center">
      {/* 2. Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
        <a href="#" className={`text-lg font-medium ${textColor}`}>
          About us
        </a>
        <a href="#" className={`text-lg font-medium ${textColor}`}>
          Contact
        </a>
        <a href="#" className={`text-lg font-medium ${textColor}`}>
          Jobs
        </a>
        <a href="#" className={`text-lg font-medium ${textColor}`}>
          Press kit
        </a>
      </nav>

      {/* 3. Social Media Icons */}
      <nav className="flex justify-center gap-6 mb-6">
        {/* Twitter / X Icon */}
        <a href="https://x.com/" className="p-1 rounded-full">
          
            <FaXTwitter className={iconColor} size={24} />
        
        </a>
        <a href="https://www.youtube.com/" className="p-1 rounded-full">
          {/* YouTube Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={iconColor}
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a href="https://www.facebook.com/" className="p-1 rounded-full">
          {/* Facebook Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={iconColor}
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </nav>

      {/* 4. Copyright Info */}
      <aside>
        <p className="text-lg text-white">
          Copyright © {new Date().getFullYear()} - All rights reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
