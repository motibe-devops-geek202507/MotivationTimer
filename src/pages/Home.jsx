import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container py-4 px-3 mx-auto">
      <h1 className="text-primary">Home</h1>
      <button className="btn btn-primary" onClick={() => navigate('/Login')}>
        Sign in
      </button>

      <Link to="/register">Go to Register Page</Link>
    </div>
  );
};

export default Home;
