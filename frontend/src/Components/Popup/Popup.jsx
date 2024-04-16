import React from 'react';
import './Popup.css'; // You'll need to create this CSS file

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
