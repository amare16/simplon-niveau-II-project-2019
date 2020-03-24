import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserLogoutComponent } from "../../_pages/UserLogoutComponent";
import "./dashboard.css";

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentWillMount() {
    console.log("token value: ", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      console.log("Call user feed");
    } else {
      this.setState({ redirect: true });
    }
  }

  // logout() {
  //   // localStorage.getItem("token", "");
  //   // localStorage.clear();
  //   localStorage.removeItem("token")
  //   this.setState({ redirect: true });
  // }

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
    let usernameDisplay = localStorage.getItem("username");
    console.log("username display", usernameDisplay);
    return (
      <div>
        <div style={buttonStyle}>
          <p>
            Welcome <strong>{usernameDisplay.toUpperCase()}</strong>
          </p>
        </div>
        {/* <div style={buttonStyle}>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.logout.bind(this)}
          >
            Logout {this.props.us}
          </button>
        </div> */}
        <UserLogoutComponent />

        <div className="container container-dashboard">
          <div
            className="row"
            
          >
            <div className="col-md-2 col-sm-12"></div>
            <div className="col-md-3 col-sm-12">
              <a href="http://localhost:3000/search-partner">
                <i
                  class="fa fa-search fa-5x search-partner-icon icon-hover"
                  aria-hidden="true"
                  style={{ color: "#d55d5d"}}
                ></i><b><h2><strong>Partner</strong></h2></b>
              </a>
            </div>
            <div className="col-md-2 col-xs-12" style={{marginBottom: "108px"}}></div>
            <div className="col-md-3 col-xs-12">
              <a href="http://localhost:3000/articles">
                <i
                  class="fa fa-list-alt fa-5x list-article-icon icon-hover"
                  aria-hidden="true"
                  style={{ color: "#ff80ff"}}
                ></i><b><h2><strong>Articles</strong></h2></b>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-xs-12"></div>
          <div
            className="row"
            style={{
              height: "200px",
              marginTop: "40px"
            }}
          >
            <div className="col-md-2 col-xs-12"></div>
            <div className="col-md-3 col-xs-12">
              <a href="http://localhost:3000/experiences">
                <i
                  class="fa fa-history fa-5x list-experience-icon icon-hover"
                  aria-hidden="true"
                  style={{ color: "green"}}
                ></i><b><h2><strong>Experiences</strong></h2></b>
              </a>
            </div>
            <div className="col-md-2 col-xs-12"></div>
            <div className="col-md-3 col-xs-12">
              <a href="http://localhost:3000/materials-list">
                <img
                  class="irc_mi list-material-icon"
                  src="https://i.pinimg.com/originals/96/b1/1b/96b11b78f3879b9375e865e940c74dc8.jpg"
                  style={{width: "80px", height: "80px"}}
                /><b><h2><strong>Materials</strong></h2></b>
              </a>
            </div>
          </div>
          <div className="col-md-2 col-xs-12"></div>
        </div>
      </div>
    );
  }
}

export { DashboardComponent };
