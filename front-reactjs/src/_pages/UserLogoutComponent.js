import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";

class UserLogoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        redirect: false
      };
  }

  logout() {
    localStorage.getItem("token", "");
    // localStorage.clear();
    console.log("log out check: ", localStorage.removeItem("token"));
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
        return <Redirect to="/login" />;
      }
    const buttonStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "30px"
      };
    return (
      // <div>
      //     <h1>You have been logged out!!!</h1>
      //     <Link to="/login">Login again</Link>
      // </div>
      <div style={buttonStyle}>
        <button
          type="button"
          className="btn btn-warning"
          onClick={this.logout.bind(this)}
        >
          Logout {this.props.us}
        </button>
      </div>
    );
  }
}

export { UserLogoutComponent };
