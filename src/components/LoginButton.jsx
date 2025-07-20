import React from "react";
import "./LoginButton.css"; // CSSの場所に応じて変更

const LoginButton = () => {
  return (
    <button
      className="btn btn-fill-white"
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
    >
      Sign in
    </button>
  );
};

export default LoginButton;
