import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={data.firstName}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={data.lastName}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={data.age}
        onChange={handleChange}
        required
      />
      <br />

      {/* Gender radio buttons */}
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={data.gender === "male"}
          onChange={handleChange}
          required
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={data.gender === "female"}
          onChange={handleChange}
          required
        />
        Female
      </label>
      <br />

      {/* Destination select */}
      <select
        name="destination"
        value={data.destination}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Destination --</option>
        <option value="Japan">Japan</option>
        <option value="Brazil">Brazil</option>
        <option value="France">France</option>
      </select>
      <br />

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          name="lactoseFree"
          checked={data.lactoseFree}
          onChange={handleChange}
        />
        Lactose Free
      </label>
      <br />

      <button type="submit">Submit</button>

      {/* Display form data dynamically */}
      <h3>Entered Data:</h3>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
      <p>Destination: {data.destination}</p>
      <p>Lactose Free: {data.lactoseFree ? "Yes" : "No"}</p>
    </form>
  );
}

export default FormComponent;
