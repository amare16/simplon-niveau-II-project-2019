import React, { Component } from "react";

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: "#008755"}}>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/home">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/show-list-articles">
                  Articles
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="experiences">
                  Experiences
                </a>
              </li>
              
            </ul>
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <a className="nav-link" href="login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="register">
                  Register
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export { NavbarComponent };
