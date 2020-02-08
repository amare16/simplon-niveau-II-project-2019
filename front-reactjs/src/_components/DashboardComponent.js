import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        redirect: false
    }
  }

  componentWillMount() {
      if(localStorage.getItem("token")) {
          console.log('Call user feed');         
      } else {
          this.setState({redirect: true});
      }
  }

  logout() {
    localStorage.getItem("token", '');
    localStorage.clear();
    this.setState({redirect: true});
  }

  render() {
      if(this.state.redirect) {
          return (<Redirect to="/login" />);
      }
    return (
      <div>
        <h1>This is Authenticated User Page.</h1>
        <button type="button" className="btn btn-warning" onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
}

export {DashboardComponent}
