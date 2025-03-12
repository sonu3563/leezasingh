import React from "react";
import Cookies from "js-cookie";

const Header = () => {
  const token = Cookies.get("token");
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <a href="/" className="logo d-flex align-items-center me-auto">
          <img src={`${process.env.PUBLIC_URL}/publicfront/assets/img/logo.png`} alt="Logo" />
          <h1 className="sitename">FlexStart</h1>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="#about">Upcoming Events</a></li>
            <li><a href="#services">Opportunities</a></li>
            <li><a href="#portfolio">Join as Companies</a></li>
            <li><a href="#team">Join as Creator</a></li>

            {token && <li><a href="/my-account">My Account</a></li>}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {!token ? (
          <a className="btn-getstarted flex-md-shrink-0" href="/login">Sign in</a>
        ) : (
          <button 
            className="btn-getstarted flex-md-shrink-0 btn btn-danger"
            onClick={() => {
              Cookies.remove("token"); 
              window.location.reload();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
