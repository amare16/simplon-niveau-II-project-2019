import React from "react";
import AuthService from '../_services/AuthService.js';
import Router from "react-router-dom";
import { Redirect } from "react-router-dom";

import { NavbarComponent } from "../_components/NavbarComponent";

class UserLoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if(this.Auth.loggedIn())
      this.props.history.replace('/');
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(name, value);
  }

  handleFormSubmit(e){
    e.preventDefault();
  
    this.Auth.login(this.state.username,this.state.password)
        .then(res =>{
           this.props.history.replace('/');
        })
        .catch(err =>{
            alert(err);
        })
}
  

  render() {
    
    return (
      <div className="container login-container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                {/* <img
                  src="http://localhost:3000/logo.png"
                  class="brand_logo"
                  alt="Logo"
                ></img> */}
                <p>Connexion</p>
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={this.handleFormSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    className="form-control input_user"
                    onChange={this.handleChange}
                    placeholder="Username"
                  ></input>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control input_pass"
                    onChange={this.handleChange}
                    placeholder="Password"
                  ></input>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlInline"
                    ></input>
                    <label
                      className="custom-control-label"
                      htmlFor="customControlInline"
                    >
                      Rester connecté
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  {/* <button type="button" name="button" className="btn btn-success login_btn">
                    Login
                  </button> */}
                  <input className="form-submit" type="submit" value="Login"/>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
              Pas encore de compte ?{" "}
                <a href="/register" className="ml-2">
                S'inscrire!
                </a>
              </div>
              <div className="d-flex justify-content-center links">
                <a href="#">Mot de passe oublié?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { UserLoginComponent };
