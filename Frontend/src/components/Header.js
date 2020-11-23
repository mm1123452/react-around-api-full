import React from 'react';
import { useLocation,Link } from 'react-router-dom'

function Header({email,onLogout}) {
  const url = useLocation().pathname
  let option; 
  let link;

  if (url === "/signin") {
    option = "Sign up";
    link = "/signup"
  } else if (url === "/signup") {
    option = "Log in";
    link = "/signin"
  } else if (url === "/")  {
    option = 'Log out'
    link = "/signin"
  }

  return (
    <header className="header">
      <div className="logo"></div>
      <div className="header__option-container">
        <p className="header__email">{email}</p>
        <p className="header__option"> 
        <Link to={link} className="login__link" onClick={onLogout} > {option}</Link>
         </p>
      </div>  
    </header>
  )
}

export default Header;