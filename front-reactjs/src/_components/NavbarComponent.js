import React, { Component } from "react";

class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let token = localStorage.getItem("token");
    let button;
    let buttonDashboard;

    if (token) {
      buttonDashboard = <li className="nav-item">
         <a className="nav-link" href="/dashboard" style={{ fontWeight: 'bold', color: "#ff8080"}}>
        Dashboard
      </a>
      
     
    </li>;
      button = <li className="nav-item">
      <a className="nav-link" href="logout" style={{ fontWeight: 'bold', color: "#ff8080"}}>
        Logout
      </a>
     
    </li>;
    } else {
      button = [
        <li className="nav-item">
                <a className="nav-link" href="login" style={{ fontWeight: 'bold', color: "violet"}}>
                  Login
                </a>
              </li>, 
              <li className="nav-item">
                <a className="nav-link" href="register" style={{ fontWeight: 'bold', color: "white"}}>
                  Register
                </a>
              </li>
      ];
    }
    return (
      <div className="container">
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top"
          style={{ backgroundColor: "#008755" }}
        >
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
                <a className="nav-link" href="/show-list-experiences">
                  Experiences
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              { buttonDashboard }
              { button }
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
