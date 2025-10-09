import React, { useState } from 'react';

const Forms = () => {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    textarea: 'Write something...',
    selectedCar: 'Volvo',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      if (value !== '' && isNaN(value)) {
        setErrorMessage('Age must be a number');
      } else {
        setErrorMessage('');
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const mySubmitHandler = (e) => {
    e.preventDefault();
    if (isNaN(formData.age)) {
      alert("Age must be a number!");
      return;
    }
    setSubmitted(true);
    alert(`Username: ${formData.username}, Age: ${formData.age}`);
  };

  let header;
  if (formData.username) {
    header = (
      <h2>
        Hello {formData.username}, you are {formData.age} years old.
      </h2>
    );
  }

  return (
    <div>
      {header}
      <form onSubmit={mySubmitHandler}>
        <p>Enter your name:</p>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <p>Enter your age:</p>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <p style={{ color: 'red' }}>{errorMessage}</p>

        <p>Write something:</p>
        <textarea
          name="textarea"
          value={formData.textarea}
          onChange={handleChange}
        />

        <p>Select a car brand:</p>
        <select
          name="selectedCar"
          value={formData.selectedCar}
          onChange={handleChange}
        >
          <option value="Volvo">Volvo</option>
          <option value="BMW">BMW</option>
          <option value="Toyota">Toyota</option>
        </select>

        <br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Forms;
