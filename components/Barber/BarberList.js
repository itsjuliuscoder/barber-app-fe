import React from "react";

const BarberList = ({ barbers }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Category</th>
          <th>Commission</th>
        </tr>
      </thead>
      <tbody>
        {barbers.map((barber) => (
          <tr key={barber.id}>
            <td>{barber.fullName}</td>
            <td>{barber.category}</td>
            <td>{barber.commission}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BarberList;
