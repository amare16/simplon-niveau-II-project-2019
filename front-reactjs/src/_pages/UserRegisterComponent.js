/*global google*/
import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";
import Geosuggest, { Suggest } from 'react-geosuggest';
import MapGl from "react-map-gl";
import { Redirect } from "react-router-dom";

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
      city: "",
      zip_code: "",
      userType: {
        name: ""
      },
      submitted: false,
      userTypeList: [],
      error: false,
      redirect: false
    };
    //console.log("this state gives: ", this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsertypeChange = this.handleUsertypeChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    // console.log("handle change method " + this.handleChange);
    // console.log("handle submit method " + this.handleSubmit);
  }

  componentDidMount() {
    // console.log("Hey, my component is mounted");
    // this is to test without filling the form
    // let user = {
    //   firstName: "Bajejjebi",
    //   lastName: "Edkekkeu",
    //   username: "kkeke",
    //   email: "kkkekkekedkd@ldlldld.com",
    //   password: "kekekek",
    //   telephone: "+375677790",
    //   city: "Versailles",
    //   zip_code: "78001",
    //   userType: {
    //     name: "borrower"
    //   }
    // }
    // console.log("user gives: ", user);

    fetch(`http://localhost:8000/api/usertype`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(data => {
        return data.json();
      })
      .then(response => {
        this.setState({ userTypeList: response });
        console.log("test response ", response);
        return response;
        
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });

    //this.setState({value: event.target.value});
  }

  handleUsertypeChange(event) {
    console.log(event.target.value);
    this.setState({
      userType: {
        name: event.target.value
      }
    });
  }

  handleAddressChange = city => {
    this.setState({ city });
    //console.log(city);
  };

  onSuggestSelect(place: Suggest) {
    console.log(place);
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
      city: this.state.city,
      zip_code: this.state.zip_code,
      userType: this.state.userType
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
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }).then(data => {
          data.json().then(results => {
            console.log("Successfully ", this.state.username, "registered: ", results);
            console.log("user value is: ", user)
          });
        }).then(() => this.setState({ redirect: true }))
        
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
    
    if (this.state.redirect == true) {
      return <Redirect to="/login"/>
    }

    return (
      <div className="container">
        
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
                  <i className="fa fa-lock"></i>
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
              /><br></br>
              <div id="errorPassword"></div>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
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
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-check-circle"></i>
                </span>
              </div>
              <select
                className="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                
                onChange={this.handleUsertypeChange}
              >
                <option value="select">Select who you are</option>
                {this.state.userTypeList.map(usertype => {
                  //console.log('try : ', this.state.userTypeList);
                  return (
                    <option key={usertype.name} value={usertype.name}>
                      {usertype.name}
                    </option>
                  );
                })}
                {/* <option value="farmer">Agriculture</option>
                <option value="gardener">Jardiere</option>
                <option value="lender">Prêteur</option>
                <option value="borrower">Emprenteur</option>
                <option value="donor">Donneur</option>
                <option value="receiver">Receveur</option> */}
              </select>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="far fa-car-building"></i>
                </span>
              </div>
              <Geosuggest
                value={this.state.city}
                onChange={this.handleAddressChange}
                
                placeholder="Start typing!"
                
                onSuggestSelect={this.onSuggestSelect}
                location={new google.maps.LatLng(53.558572, 9.9278215)}
                radius="20"
              />
                
              {/* <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
                required={true}
              /> */}
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-mail-bulk"></i>
                </span>
              </div>
              <input
                type="text"
                name="zip_code"
                className="form-control"
                placeholder="Code Postal"
                value={this.state.zip_code}
                onChange={this.handleChange}
                submitted={this.state.submitted ? 1 : 0}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-secondary btn-block">
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
