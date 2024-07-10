import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-bold">Saurav Kumar Mishra</p>
          <p className="text-sm">Help: +1-123-456-7890</p>
          <p className="text-sm">Email: SauravKumarmishra600@gmail.com</p>
          <p className="text-sm">LinkedIn: SauravKrMishra</p>
        </div>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Saurav Kumar Mishra. All rights reserved.</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
