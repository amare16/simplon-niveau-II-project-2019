import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentWillMount() {
    if (localStorage.getItem("token")) {
      console.log("Call user feed");
    } else {
      this.setState({ redirect: true });
    }
  }

  logout() {
    localStorage.getItem("token", "");
    localStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    const style = {
      height: "200px"
    };
    const buttonStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "30px"
    };
    return (
      <div>
        <div style={buttonStyle}>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.logout.bind(this)}
          >
            Logout
          </button>
        </div>

        <div className="container">
          <div class="row">
            <div className="col-md-6">
              <div class="jumbotron jumbotron-fluid">
                <div class="container" style={style}>
                  <a href="http://localhost:3000/farmers-list">
                    <button className="btn btn-lg btn-block" style={style}>
                      <h2>Search your Partner</h2>
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="jumbotron jumbotron-fluid">
                <div class="container" style={style}>
                  <a href="http://localhost:3000/articles">
                    <button className="btn btn-lg btn-block" style={style}>
                      <h2>List of Articles</h2>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="col-md-6">
              <div class="jumbotron jumbotron-fluid">
                <div class="container" style={style}>
                  <a href="http://localhost:3000/experiences">
                    <button className="btn btn-lg btn-block" style={style}>
                      <h2>List of Experiences</h2>
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div class="jumbotron jumbotron-fluid">
                <div class="container" style={style}>
                  <a href="http://localhost:3000/materials-list">
                    <button className="btn btn-lg btn-block" style={style}>
                      <h2>List of Materials</h2>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { DashboardComponent };
