import React, { useState } from 'react';

function ValidatedForm() {
  const [inputs, setInputs] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!inputs.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!inputs.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!/^\d{10}$/.test(inputs.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) newErrors.email = 'Invalid email';
    return newErrors;
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setInputs({ firstName: '', lastName: '', phone: '', email: '' });
    setErrors({});
    setSubmitted(false);
  };

  return submitted ? (
    <div>
      <h2>Submitted Data:</h2>
      <p>First Name: {inputs.firstName}</p>
      <p>Last Name: {inputs.lastName}</p>
      <p>Phone: {inputs.phone}</p>
      <p>Email: {inputs.email}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" value={inputs.firstName} onChange={handleChange} />
      {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}

      <input name="lastName" placeholder="Last Name" value={inputs.lastName} onChange={handleChange} />
      {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}

      <input name="phone" placeholder="Phone" value={inputs.phone} onChange={handleChange} />
      {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

      <input name="email" placeholder="Email" value={inputs.email} onChange={handleChange} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default ValidatedForm;
