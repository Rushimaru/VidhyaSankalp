import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="d-footer">
      <div className="">
        <p className="mb-0 text-center">
          &copy; <span className="current-year">{currentYear}</span> Made With ❤️ by Wowtheme7.
        </p>
      </div>
    </footer>
  );
};

export default Footer;