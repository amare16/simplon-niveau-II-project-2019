/*global google*/
import React from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

//import { NavbarComponent } from "../_components/NavbarComponent";

class UserRegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
      telephone: "",   
      zip_code: "",
      city: "",
      userType: {
        name: "",
      },
      submitted: false,
      userTypeList: [],
      error: false,
      redirect: false,
    };

    //console.log("this state gives: ", this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsertypeChange = this.handleUsertypeChange.bind(this);
    
  }

  componentDidMount() {
    const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
    const format = "&format=json";
    let zipCode = $("#zipcode");
    let city = $("#city_name");
    let errorMessage = $("#error-message");

    $(zipCode).on("blur", function () {
      let code = $(this).val();
      //console.log(code);
      let url = apiUrl + code + format;
      // console.log("url: ", url);

      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((results) => {
          //console.log("results value: ", results);
         //$(city).find('option').remove();
          if (results.length) {
            $(errorMessage).text('').hide();
            $.each(results, function (key, value) {
              console.log("value nom: ", value.nom);
              $(city).append('<option value="'+value.nom+'">'+value.nom+'</option>');
            });
          } else {
            if ($(zipCode).val()) {
              console.log("Erreur de code postal.");
              $(errorMessage)
                .text("Aucune commune avec ce code postal.")
                .show();
            } else {
              $(errorMessage).text('').hide();
            }
          }
        })
        .catch((err) => {
          console.log(err);
         //$(city).find('option').remove();
        });
    });

    this.getUserType();
    
  }

  getUserType() {
    fetch(`http://localhost:8000/api/usertype`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        this.setState({ userTypeList: response });
        console.log("test response ", response);
        return response;
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log("event value: ", event.target.value);
    this.setState({
      [name]: value,
    });

    //this.setState({value: event.target.value});
  }

  handleTelephoneChange(telephone) {
    this.setState({ telephone })
  }

  handleUsertypeChange(event) {
    console.log(event.target.value);
    this.setState({
      userType: {
        name: event.target.value,
      },
    });
  }


  handleSubmit(event) {
    event.preventDefault();

    console.log(event);
    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      repeatedPassword: this.state.repeatedPassword,
      telephone: this.state.telephone,
      zip_code: this.state.zip_code,
      city: this.state.city,
      userType: this.state.userType,
    };

    console.log("user submitted :", user);

    // console.log("Submitted:", this.state.submitted);

    let password1 = document.getElementById("password");
    let password2 = document.getElementById("repeatedPassword");
    let successColor = "#66cc66";
    let dangerColor = "#ff6666";
    let message = document.getElementById("errorPassword");

    if (
      this.state.password.length > 5 &&
      this.state.repeatedPassword.length > 5
    ) {
      password1.style.backgroundColor = successColor;
      message.style.color = successColor;
      message.innerHTML = "Character length is Ok!";

      if (this.state.password == this.state.repeatedPassword) {
        password2.style.backgroundColor = successColor;
        message.style.color = successColor;
        message.innerHTML = "Matched!";

        fetch(`http://localhost:8000/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((data) => {
            data.json().then((results) => {
              console.log(
                "Successfully ",
                this.state.username,
                "registered: ",
                results
              );
              console.log("user value is: ", user);
            });
          })
          .then(() => this.setState({ redirect: true }));
      } else {
        password2.style.backgroundColor = dangerColor;
        message.style.color = dangerColor;
        message.innerHTML = "The Password is not matched!";
      }
    } else {
      password1.style.backgroundColor = dangerColor;
      message.style.color = dangerColor;
      message.innerHTML = "You have to enter at least 6 characters!";
    }
  }

  render() {
    console.log("city from state: ", this.state);
    if (this.state.redirect == true) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container register-form">
        <div className="note">
          <h1 id="header1">Inscription</h1>
        </div>
        <div className="form-content">
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
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
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    submitted={this.state.submitted ? 1 : 0}
                  />
                  <br></br>
                  <div id="errorPassword"></div>
                </div>
                <div className="form-group input-group">
                  <PhoneInput
                    name="telephone"
                    country={"fr"}
                    value={this.state.telephone}
                    onChange={this.handleTelephoneChange.bind(this)}
                    submitted={this.state.submitted ? 1 : 0}
                  />
                  {/* <input
                    type="text"
                    name="telephone"
                    className="form-control"
                    placeholder="Phone Number"
                    value={this.state.telephone}
                    onChange={this.handleChange}
                    submitted={this.state.submitted ? 1 : 0}
                  /> */}
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-thumb-tack"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="zip_code"
                    className="form-control"
                    id="zipcode"
                    placeholder="Code Postal"
                    value={this.state.zip_code}
                    onChange={this.handleChange}
                    submitted={this.state.submitted ? 1 : 0}
                  />
                  <div
                    style={{ display: "none", color: "#f55" }}
                    id="error-message"
                  ></div>
                </div>
              </div>
              <div className="col-md-6">
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
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-check-circle"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="repeatedPassword"
                    className="form-control"
                    id="repeatedPassword"
                    placeholder="Repeated password"
                    value={this.state.repeatedPassword}
                    onChange={this.handleChange}
                    submitted={this.state.submitted ? 1 : 0}
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-filter"></i>
                    </span>
                  </div>
                  <select
                    className="custom-select my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    onChange={this.handleUsertypeChange}
                  >
                    <option value="select">Select who you are</option>
                    {this.state.userTypeList.map((usertype) => {
                      //console.log('try : ', this.state.userTypeList);
                      return (
                        <option key={usertype.name} value={usertype.name}>
                          {usertype.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-building"></i>
                    </span>
                  </div>
                  <select
                    className="form-control"
                    name="city"
                    id="city_name"
                    onChange={this.handleChange}
                    submitted={this.state.submitted ? 1 : 0}
                  >
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block"
                    style={{ backgroundColor: "#008755" }}
                  >
                    <h4>Register</h4>
                  </button>
                </div>
                <div className="float-right login-link">
                  <span>Vous avez déjà un compte</span>&nbsp;&nbsp;
                  <a
                    href="/login"
                    className="float-right"
                    style={{ fontWeight: "bold" }}
                  >
                    Log In
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { UserRegisterComponent };
