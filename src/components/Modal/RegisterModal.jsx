import React, { useRef } from "react";
import BaseModal from "./BaseModal";

const RegisterModal = ({ onRegister }) => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("パスワードと確認用パスワードが一致しません。");
      return;
    }
    onRegister({
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    });
  };

  return (
    <BaseModal modalId="registerModal" title="Sing Up" onSubmit={handleRegister} submitLabel="登録">
      <div className="mb-3">
        <label className="form-label">ユーザー名</label>
        <input type="text" className="form-control" ref={usernameRef} required />
      </div>
      <div className="mb-3">
        <label className="form-label">メールアドレス</label>
        <input type="email" className="form-control" ref={emailRef} required />
      </div>
      <div className="mb-3">
        <label className="form-label">パスワード</label>
        <input type="password" className="form-control" ref={passwordRef} required />
      </div>
      <div className="mb-3">
        <label className="form-label">パスワード（確認用）</label>
        <input type="password" className="form-control" ref={passwordConfirmRef} required />
      </div>
      <p className="text-center mt-2">
        すでにアカウントをお持ちの方は{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          data-bs-dismiss="modal"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Sign In
        </button>
      </p>
    </BaseModal>
  );
};

export default RegisterModal;
