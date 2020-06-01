import React from "react";
import { NavbarComponent } from "./NavbarComponent";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   isLoggedIn: false,
    // };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    let token = localStorage.getItem("token");
    // const isLoggedIn = this.state.isLoggedIn;
    // console.log("is logged in: ", isLoggedIn);
    let button;
    if (token) {
      button = <a href="/logout">
      <button className="btn btn-danger" id="logout" onClick={this.handleLogoutClick.bind(this)}>
        Logout
      </button> 
    </a>;
    console.log("button after log in: ", button)
    } else {
      button = [
        <a href="/login">
      <button id="login" className="btn btn-primary" onClick={this.handleLoginClick.bind(this)}>
        Login
      </button>
    </a>, <a href="/register">
            <button id="register" className="btn btn-secondary">
              Register Here
            </button>
          </a>
      ];
    }
    return (
      <div>
        <NavbarComponent />
        <br />
        <br />
        <div class="jumbotron">
          <p class="lead">
            <strong style={{color: 'blue', fontWeight: 'bold'}}>Agro Interest</strong> is a site to meet a farmer or who has a hobby to
            cultivate (gardener) and also to meet a lender or donor of
            agricultural equipment.
          </p>
          <hr class="my-4"></hr>
          <p className="lead">
            <strong style={{fontWeight: 'bold'}}>Are you a farmer?</strong>
            <br></br> Do you want to meet and share your experiences for anyone
            who wants to cultivate on your farm? <br></br>or <br></br>
            <strong style={{fontWeight: 'bold'}}>Do you have a hobby to cultivate?</strong>
            <br></br>
            If so, would you like to meet a farmer to get a good experience?{" "}
            <br></br>or <br></br>
            <strong style={{fontWeight: 'bold'}}>Do you have farm equipment?</strong>
            <br></br>
            If so, do you want to <strong style={{color: "violet", fontWeight: 'bold'}}>give</strong> or <strong style={{fontWeight: 'bold', color: "orange"}}>lend</strong> it to others?<br></br><br></br>If you are
            one of them, please register and access our website.
          </p>
          
          
          <p className="lead">
            <strong style={{fontStyle: 'italic', color: '#6666ff'}}>Otherwise, you can access articles and experiences of others as a guest.</strong>
          </p>
        </div>
      </div>
    );
  }
}

export { HomeComponent };
