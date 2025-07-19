import React from 'react'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

const Header = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-xl font-bold">Motivation Timer</div>
          <div className="d-flex gap-2">
            <LoginButton />
            <RegisterButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header