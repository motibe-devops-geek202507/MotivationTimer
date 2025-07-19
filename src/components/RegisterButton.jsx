// src/components/RegisterButton.jsx
import React from "react";

const RegisterButton = () => {
  return (
    <button
      className="btn btn-outline-dark"
      data-bs-toggle="modal"
      data-bs-target="#registerModal"
    >
      Register
    </button>
  );
};

export default RegisterButton;
