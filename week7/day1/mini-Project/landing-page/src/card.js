import React from 'react';

const Card = ({ icon, title, text }) => {
  return (
    <div className="card text-center m-3 p-3 shadow-sm">
      <i className={`fas fa-${icon} fa-3x mb-3`}></i>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};

export default Card;
