// src/components/LoginButton.jsx
import React from "react";

const LoginButton = () => {
  return (
    <button
      className="btn btn-dark text-white"
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
    >
      Sign in
    </button>
  );
};

export default LoginButton;
