import React from "react";
import axios from "axios";

import { NavbarComponent } from "../_components/NavbarComponent";

class UserRegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
      telephone: "",
      city: "",
      zip_code: "",
      submitted: false
    };
    //console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("handle change method " + this.handleChange);
    console.log("handle submit method " + this.handleSubmit);
  }

  componentDidMount() {
    //console.log("Hey, my component is mounted");
    let user = {
      firstName: "Tola",
      lastName: "Bedhane",
      username: "tolisha",
      email: "tola@tola.tola",
      password: "123",
      telephone: "+33789595959",
      city: "Paris",
      zipCode: "75001"
    };
    // console.log(user);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    };

    fetch(`http://localhost:8000/api/register`, requestOptions).then(
      response => {
        response.text().then(data => {
          console.log(JSON.parse(data));
        });
      }
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      telephone,
      city,
      zipCode
    } = this.state;
    console.log(this.state);
    console.log("first name : ", firstName);
    console.log("last name : ", lastName);
    console.log("username : ", username);
    console.log("email : ", email);
    console.log("password : ", password);
    console.log("telephone : ", telephone);
    console.log("city : ", city);
    console.log("zip code : ", zipCode);

    this.setState({ submitted: true });
    console.log("Submitted:", this.state.submitted);
  }
  render() {
    return (
      <div className="container">
        <NavbarComponent />
        <div>
          <h1>Inscription</h1>
        </div>
        <div className="card card-register bg-light w-50">
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First name"
                value={this.state.firstName}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last name"
                value={this.state.lastName}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                name="repeatedPassword"
                className="form-control"
                placeholder="Repeated password"
                value={this.state.repeatedPassword}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-phone"></i>
                </span>
              </div>
              <input
                type="text"
                name="telephone"
                className="form-control"
                placeholder="Phone Number"
                value={this.state.telephone}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div class="form-group col-md-4">
              <select
                className="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
              >
                <option selected>Select...</option>
                <option>Agriculture</option>
                <option>Jardiere</option>
                <option>Prêteur</option>
                <option>Emprenteur</option>
                <option>Donneur</option>
                <option>Receveur</option>
              </select>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="far fa-car-building"></i>
                </span>
              </div>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-mail-bulk"></i>
                </span>
              </div>
              <input
                type="text"
                name="zipCode"
                className="form-control"
                placeholder="Code Postal"
                value={this.state.zipCode}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-secondary btn-block">
                Register
              </button>
            </div>
            <div>
              <p>
                <b>Vous avez déjà un compte? </b>
              </p>
              <a href="/login">Se Connecter</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { UserRegisterComponent };
