import { Link } from "react-router-dom";

function Header(props){
    return(
     <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation light w-nav">
        <div className="navbar-container">
          <a href="#" className="brand w-nav-brand">
          <img src="images/cointego-logo.png" loading="lazy" srcSet="images/cointego-logo-p-500.png 500w, images/cointego-logo-p-800.png 800w, images/cointego-logo-p-1080.png 1080w, images/cointego-logo-p-1600.png 1600w, images/cointego-logo.png 1645w" width="822.5" sizes="(max-width: 479px) 140px, (max-width: 767px) 170px, 190px" alt="" className="logo-icon" />
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <Link to="/login" className="head-nav-button-inverted w-button">Log In</Link>
            <a href="#signup" className="head-nav-button w-button">Sign Up</a>
          </nav>
          <div className="menu-button w-nav-button">
            <div className="burger-icon">
              <div className="top-burger-line"></div>
              <div className="middle-burger-line"></div>
              <div className="bottom-burger-line"></div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header;