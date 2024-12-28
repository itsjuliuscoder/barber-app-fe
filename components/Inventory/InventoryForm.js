import React, { useState } from "react";

const InventoryForm = ({ onSubmit }) => {
  const [item, setItem] = useState({ itemName: "", category: "", status: "", quantity: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={item.itemName}
        onChange={handleChange}
        required
      />
      <select name="category" value={item.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="For Sale">For Sale</option>
        <option value="For Use">For Use</option>
      </select>
      <select name="status" value={item.status} onChange={handleChange} required>
        <option value="">Select Status</option>
        <option value="Sold">Sold</option>
        <option value="Not Sold">Not Sold</option>
        <option value="In Use">In Use</option>
        <option value="Not Used">Not Used</option>
        <option value="Used">Used</option>
      </select>
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={item.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default InventoryForm;
