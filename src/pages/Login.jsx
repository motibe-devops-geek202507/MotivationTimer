import React from 'react'

const Login = () => {
  return (
    <div>
      <form action="submit" className="container flex">
        <input type="text" />
        <input type="password" />
        <button>ログイン</button>
      </form>
    </div>
  );
}

export default Login