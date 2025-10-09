import React, { useState } from "react";
import FormComponent from "./FormComponent";

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    destination: "",
    lactoseFree: false,
  });

  // Handle changes on inputs and checkboxes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit: encode form data into URL query params
  const handleSubmit = (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams();

    for (const key in formData) {
      // If checkbox, only add if true (or you can add 'on')
      if (typeof formData[key] === "boolean") {
        if (formData[key]) {
          queryParams.append(key, "on");
        }
      } else {
        queryParams.append(key, formData[key]);
      }
    }

    // Change URL without reload (you can also do window.location.href)
    const newUrl = `${window.location.origin}/?${queryParams.toString()}`;
    window.history.pushState(null, "", newUrl);

    alert("Form submitted! Check URL query parameters.");
  };

  return (
    <div>
      <h1>React Form Container</h1>
      <FormComponent
        data={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;

