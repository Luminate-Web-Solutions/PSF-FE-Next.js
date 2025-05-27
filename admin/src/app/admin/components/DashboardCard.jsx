// components/dashboard-card.jsx
import React from "react";

export const DashboardCard = ({
  title,
  count,
  bgColor = "#0d2137",
  textColor = "white",
}) => {
  return (
    <div
      className="p-4 rounded-lg text-center shadow-md"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-3xl font-extrabold mt-2">{count}</p>
    </div>
  );
};
