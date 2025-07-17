import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Home</h1>
      <Link to="/register">Go to Register Page</Link>
    </div>
  );
}

export default Home