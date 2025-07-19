import React, { useRef, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/UserContext';
import BaseModal from './BaseModal';

const LoginModal = ({ onLogin }) => {
  const EmailRef = useRef(null);
  const passwordRef = useRef(null);

  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null); // エラー表示用にuseStateを併用

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // refから現在の入力値を取得
      const email = EmailRef.current.value;
      const password = passwordRef.current.value;

      const response = await fetch('https://motivationtimer-x-oshi.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
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

        onLogin({
          email: EmailRef.current.value,
          password: passwordRef.current.value,
        });
        
        // ページをリロードしてログイン状態を反映
        window.location.reload();
      } else {
        console.error('Login failed:', data);
        setError(data.message || 'メールアドレスまたはパスワードが正しくありません。');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('エラーが発生しました。時間をおいて再度お試しください。');
    }
  };

  return (
    <BaseModal modalId="loginModal" title="Sign In" onSubmit={handleLogin} submitLabel="ログイン">
      <div className="mb-3">
        <label className="form-label">メールアドレス</label>
        {/* inputにはrefを接続 */}
        <input type="email" className="form-control" ref={EmailRef} required />
      </div>
      <div className="mb-3">
        <label className="form-label">パスワード</label>
        <input type="password" className="form-control" ref={passwordRef} required />
      </div>

      {/* エラーメッセージの表示 */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <p className="text-center mt-3">
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