// src/components/Modal.js
import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  render() {
    const { onClose, message } = this.props;

    return (
      <div className="modal-background">
        <div className="modal-body">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default Modal;
