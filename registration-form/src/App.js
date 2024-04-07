import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Check if form data is captured correctly
    try {
      const response = await axios.post("/register", formData);
      if (response && response.data) {
        console.log(response.data); // Handle success response
        setSignupSuccess(true); // Set signup success state to true
      } else {
        console.error("Error: Response data is undefined");
        // Handle the case where response data is undefined
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle error response or network errors
      // Display appropriate error message to the user or take necessary actions
    }
  };

  return (
    <div className="App">
      <h1>Registration Form</h1>
      {/* {signupSuccess && <p>Signup successful! You can now login.</p>} */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>
      <dialog open={signupSuccess}>
        <p>Signup successful! You can now login.</p>
      </dialog>
    </div>
  );
};

export default RegisterForm;
