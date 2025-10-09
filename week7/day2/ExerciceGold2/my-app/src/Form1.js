import React, { useState } from 'react';

export default function Form1() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Form Example</h2>
      {submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
