import React, { useState } from 'react';

export default function Form2() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
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
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    });
    setSubmitted(false);
  };

  return (
    <div>
      <h2>User Form</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          /><br />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          /><br />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          /><br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Submitted Data:</h3>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}