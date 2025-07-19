import React from 'react'
import { useNavigate } from 'react-router-dom'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

const Header = () => {
  const navigate = useNavigate()

  return (

    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-xl font-bold">Motivation Timer</div>
          <div className="d-flex gap-2">
            <button 
              onClick={() => navigate('/mypage')} 
              className="btn btn-outline-light"
            >
              My Page
            </button>
            <LoginButton />
            <RegisterButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header