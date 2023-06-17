import React from "react";

const data = [
  { text: "CREATED", color: "#2F58CD" },
  { text: "UPDATED", color: "#4CA4CA" },
  { text: "DELIVERING", color: "#FFB100" },
  { text: "RECEIVED", color: "#FF0000" },
  { text: "DEACTIVE", color: "#FF0000" },
  { text: "SOLD", color: "#43AC31" },
  { text: "ACTIVE", color: "#43AC31" },
  { text: "ORDERED", color: "#DB00FF" },
  { text: "ORDER", color: "#DB00FF" },
];

const TextColorChanger = ({ text }) => {
  const color = data.find((item) => item.text === text)?.color;
  return (
    <div className="mx-auto" style={{ border: `1px solid ${color ? color : "black"}`, borderRadius:"30px", padding:"5px 10px", width:"fit-content" }}>
      <p style={{ color: color ? color : "black" }}>{text}</p>
    </div>
  );
};

export default TextColorChanger;
