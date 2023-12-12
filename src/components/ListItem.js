import React, { useState } from "react";

const ListItem = ({ name, contact, handleUpdate, handleDelete, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setEditedPhone(e.target.value);
  };

  const handleUpdateContact = async () => {
    if (editedName && editedPhone) {
      await handleUpdate(editedName, editedPhone, id);
      setEditMode(false);
    }
  };

  return (
    <li>
      <p className="name-container">
        {editMode ? (
          <input placeholder="Name..." onChange={handleNameChange} required />
        ) : (
          name
        )}
      </p>
      <p className="phone-container">
        {editMode ? (
          <input placeholder="Phone..." onChange={handlePhoneChange} required />
        ) : (
          contact
        )}
      </p>
      <p className="btns-container">
        {editMode ? (
          <img
            className="list-btn"
            onClick={handleUpdateContact}
            src="https://cdn-icons-png.flaticon.com/512/1688/1688988.png"
            alt="submit-edit"
          />
        ) : (
          <img
            className="list-btn"
            onClick={handleEdit}
            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            alt="edit-btn"
          />
        )}
        <img
          className="list-btn"
          onClick={() => handleDelete(id)}
          src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
          alt="delete-btn"
        />
      </p>
    </li>
  );
};

export default ListItem;
