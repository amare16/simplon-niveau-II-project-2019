import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


import { LogoComponent } from "../_components/LogoComponent";
import { ArticlesComponent } from "../_pages/ArticlesComponent";
import { ExperiencesComponent } from "../_pages/ExperiencesComponent";
import { EventsComponent } from "../_pages/EventsComponent";
import { ContactUsComponent } from "../_pages/ContactUsComponent";
import { FooterComponent } from "../_components/FooterComponent";

import { UserLoginComponent } from "../_pages/UserLoginComponent";
import { UserRegisterComponent } from "../_pages/UserRegisterComponent";

import "./App.css";
import "../less/style.less";
import '../styles/style.css';


import { HomeComponent } from "../_components/HomeComponent";
import AuthService from '../_services/AuthService'
import withAuth from '../_services/withAuth';
import { WelcomePageComponent } from "../_components/WelcomePageComponent";


const Auth = new AuthService();

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <LogoComponent />
        <div className="App-header">
              
              <h2>Welcome {this.props.user.username}</h2>
            </div>
            <p className="App-intro">
                <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
            </p>
        <Router>
          <div className="app">
            <Route path="/welcome" component={WelcomePageComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/articles" component={ArticlesComponent}></Route>
            <Route path="/contact" component={ContactUsComponent}></Route>
            <Route path="/experiences" component={ExperiencesComponent}></Route>
            <Route path="/events" component={ EventsComponent }></Route>
            <Route path="/register" component={UserRegisterComponent} />
            <Route path="/login" component={UserLoginComponent}></Route>
          </div>
        </Router>
        <FooterComponent />
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace('/login');
  }
}

export default withAuth(App);
