import React, { useRef, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/UserContext';
import BaseModal from './BaseModal';

const RegisterModal = ({ onRegister }) => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // エラーをリセット

    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = passwordConfirmRef.current.value;

    // パスワードの一致を確認
    if (password !== password_confirmation) {
      alert("パスワードと確認用パスワードが一致しません。");
      return;
    }

    try {
      const response = await fetch('https://motivationtimer-x-oshi.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Cookieにアクセストークンを保存
        Cookies.set('access_token', data.access_token, {
          expires: 7,
          secure: true,
          sameSite: 'strict',
        });
        // localStorageにユーザー情報を保存
        localStorage.setItem('user', JSON.stringify(data.user));
        // Contextのユーザー情報を更新
        setUser(data.user);

        onRegister({
          name: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmRef.current.value,
        });
        
        // ページをリロードしてログイン状態を反映
        window.location.reload();
      } else {
        console.error('Registration failed:', data);
        // バックエンドからのエラーメッセージを整形して表示
        let errorMessage = '登録に失敗しました。入力内容を確認してください。';
        if (data && data.errors) {
            errorMessage = Object.values(data.errors).flat().join(' ');
        } else if (data && data.message) {
            errorMessage = data.message;
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('エラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <BaseModal modalId="registerModal" title="Sign Up" onSubmit={handleRegister} submitLabel="登録">
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
        <input
          type="password"
          className="form-control"
          ref={passwordRef}
          required
          autoComplete="new-password"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">パスワード（確認用）</label>
        <input
          type="password"
          className="form-control"
          ref={passwordConfirmRef}
          required
          autoComplete="new-password"
        />
      </div>

      {/* エラーメッセージの表示 */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

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
