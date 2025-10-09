import React from 'react';

const Contact = () => {
  return (
    <div className="container my-5">
      <h3>Contact Us</h3>
      <form>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Your Name" />
        </div>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Your Email" />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="Your Message"></textarea>
        </div>
        <button className="btn btn-primary btn-lg w-100">Send</button>
      </form>
    </div>
  );
};

export default Contact;
