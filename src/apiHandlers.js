import * as bootstrap from "bootstrap";
import Cookies from "js-cookie";

const API_BASE = "https://motivationtimer-x-oshi.onrender.com/api";
// const API_BASE = "http://localhost:8000/api";

export const fetchCurrentUser = async (setUser, setErrorMsg) => {
  const token = Cookies.get("access_token");
  if (!token) {
    setUser(null);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("ユーザー情報の取得に失敗しました");
    }

    const data = await res.json();
    setUser(data);
    console.log(data)
  } catch (err) {
    setErrorMsg(err.message);
    setUser(null);
  }
};


const closeModal = (id) => {
  const modalEl = document.getElementById(id);
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
};

export const handleLogin = async (credentials, setErrorMsg, setUser) => {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "ログインに失敗しました");
    }

    const data = await res.json();

    // Cookieにaccess_tokenを保存
    Cookies.set("access_token", data.access_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    // ユーザー情報を状態にセット（あれば）
    if (setUser) {
      setUser(data.user);
    }

    closeModal("loginModal");
    alert("ログイン成功");

    return data;
  } catch (err) {
    setErrorMsg(err.message);
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
    throw err;
  }
};

export const handleRegister  = async (credentials, setErrorMsg, setUser) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "登録に失敗しました");
    }

    const data = await res.json();

    // トークンをCookieに保存
    Cookies.set("access_token", data.access_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });

    // ユーザー情報をセット
    if (setUser) {
      setUser(data.user);
    }

    closeModal("registerModal");
    alert("登録成功しました。ログイン状態になりました。");

    return data;
  } catch (err) {
    setErrorMsg(err.message);
    const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
    errorModal.show();
    throw err;
  }
};