import React, { useState } from "react";

const BarberForm = ({ onSubmit }) => {
  const [barber, setBarber] = useState({ fullName: "", category: "", commission: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarber({ ...barber, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(barber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={barber.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={barber.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="commission"
        placeholder="Commission (%)"
        value={barber.commission}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Barber</button>
    </form>
  );
};

export default BarberForm;