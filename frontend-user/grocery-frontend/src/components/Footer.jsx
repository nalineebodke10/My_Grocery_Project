import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#303030] text-white mt-10 py-6">

      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* ABOUT */}
        <div>
          <h5 className="font-bold mb-2">Grocery App</h5>
          <p className="text-sm">
            Fresh groceries delivered to your doorstep with best offers.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h5 className="font-bold mb-2">Quick Links</h5>
          <ul className="text-sm space-y-1">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Shop</li>
            <li className="cursor-pointer">Categories</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h5 className="font-bold mb-2">Contact</h5>
          <p className="text-sm">Pune, India</p>
          <p className="text-sm">+91 91569 02510</p>
          <p className="text-sm">info@grocery.com</p>
        </div>

        {/* SOCIAL */}
        <div>
          <h5 className="font-bold mb-2">Follow Us</h5>
          <div className="flex gap-3 mt-2 text-lg">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-github"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>

      </div>

      <div className="text-center text-sm mt-4 border-t border-gray-600 pt-3">
        © 2025 Grocery App. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;