import React, { useState } from "react";

const AddContacts = ({ addContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const { name, phone } = formData;

  const handleChange = (inputType, e) => {
    setFormData({
      ...formData,
      [inputType]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "") {
      // Add your form validation logic here
      alert("Please fill in all fields");
      return;
    }

    addContact(name, phone);

    setFormData({
      name: "",
      phone: "",
    });
  };

  return (
    <div id="add-contacts-container">
      <h1>Add Contact</h1>
      <form>
        <input
          placeholder="Enter Name"
          value={name}
          required
          type="text"
          onChange={(e) => handleChange("name", e)}
        />
        <input
          placeholder="Enter Phone"
          value={phone}
          type="tel"
          required
          onChange={(e) => handleChange("phone", e)}
        />
        <br />
        <button onClick={handleSubmit}>Add Contact</button>
      </form>
    </div>
  );
};

export default AddContacts;
