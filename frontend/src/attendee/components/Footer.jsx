import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white p-6 relative">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Logo & Social Links */}
        <div>
          <h2 className="text-lg font-semibold">Eventify</h2>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="#" className="text-xl hover:text-gray-400">🔗</a>
            <a href="#" className="text-xl hover:text-gray-400">🔗</a>
            <a href="#" className="text-xl hover:text-gray-400">🔗</a>
          </div>
        </div>

        {/* Our Company */}
        <div>
          <h3 className="font-semibold">Our Company</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Profile */}
        <div>
          <h3 className="font-semibold">Profile</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li><a href="#" className="hover:underline">Login</a></li>
            <li><a href="#" className="hover:underline">Signup</a></li>
            <li><a href="#" className="hover:underline">Events</a></li>
            <li><a href="#" className="hover:underline">Organizer</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold">Legal</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Copyrights</a></li>
            <li><a href="#" className="hover:underline">Publishing</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-6 border-t border-gray-600 pt-4">
        © 2025 Eventify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
