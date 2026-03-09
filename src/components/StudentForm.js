import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  const validate = () => {

    let temp = {};
    const emailPattern = /\S+@\S+\.\S+/;

    if (!formData.name) temp.name = "Name is required";

    if (!formData.email) {
      temp.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      temp.email = "Invalid Email";
    }

    if (!formData.age) temp.age = "Age is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }

    setFormData({ name: "", email: "", age: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <p>{errors.name}</p>

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <p>{errors.email}</p>

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <p>{errors.age}</p>

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;