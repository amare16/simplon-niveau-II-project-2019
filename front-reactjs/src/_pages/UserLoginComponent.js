import React from "react";
import Router from "react-router-dom";

import { NavbarComponent } from "../_components/NavbarComponent";

class UserLoginComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container login-container h-100">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                {/* <img
                  src="http://localhost:3000/logo.png"
                  class="brand_logo"
                  alt="Logo"
                ></img> */}
                <p>Connexion</p>
              </div>
            </div>
            <div class="d-flex justify-content-center form_container">
              <form>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name=""
                    class="form-control input_user"
                    value=""
                    placeholder="username"
                  ></input>
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name=""
                    class="form-control input_pass"
                    value=""
                    placeholder="password"
                  ></input>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customControlInline"
                    ></input>
                    <label
                      class="custom-control-label"
                      for="customControlInline"
                    >
                      Rester connecté
                    </label>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button type="button" name="button" class="btn btn-success login_btn">
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div class="mt-4">
              <div class="d-flex justify-content-center links">
              Pas encore de compte ?{" "}
                <a href="/register" class="ml-2">
                S'inscrire!
                </a>
              </div>
              <div class="d-flex justify-content-center links">
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
