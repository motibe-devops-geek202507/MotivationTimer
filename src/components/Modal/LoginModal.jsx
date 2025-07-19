import React, { useRef } from "react";
import BaseModal from "./BaseModal";

const LoginModal = ({ onLogin }) => {
  const EmailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({
      email: EmailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <BaseModal modalId="loginModal" title="Sign In" onSubmit={handleLogin} submitLabel="ログイン">
      <div className="mb-3">
        <label className="form-label">メールアドレス</label>
        <input type="text" className="form-control" ref={EmailRef} required />
      </div>
      <div className="mb-3">
        <label className="form-label">パスワード</label>
        <input type="password" className="form-control" ref={passwordRef} required />
      </div>
      <p className="text-center mt-10">
        アカウントがない方は{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
        >
          Sign Up
        </button>
      </p>
    </BaseModal>
  );
};

export default LoginModal;
