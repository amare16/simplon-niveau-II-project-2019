import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {App} from "../App";
import { LogoComponent } from "../_components/LogoComponent";
import { HomeComponent } from "../_components/HomeComponent";
import { ContactUsComponent } from "../_pages/ContactUsComponent";
import { FooterComponent } from "../_components/FooterComponent";
import { ShowListOfArticlesComponent } from "./ShowListOfArticlesComponent";
import { ShowSingleArticleComponent } from "./ShowSingleArticleComponent";

import { SearchYourPartnerComponent } from "../_pages/SearchYourPartnerComponent";
import { ArticlesComponent } from "../_pages/ArticlesComponent";
import { ExperiencesComponent } from "../_pages/ExperiencesComponent";
import { EventsComponent } from "../_pages/EventsComponent";
import { UserLoginComponent } from "../_pages/UserLoginComponent";
import { UserRegisterComponent } from "../_pages/UserRegisterComponent";
import { UserLogoutComponent } from "../_pages/UserLogoutComponent";
import { DashboardComponent } from "../_components/DashboardComponent";
import { ReceiveMessageComponent } from "../_pages/ReceiveMessageComponent";
import { SingleUserProfileComponent } from "../_pages/SingleUserProfileComponent";


import { CreateArticleComponent } from "../actions/articleActions/CreateArticleComponent";
import { EditArticleComponent } from "../actions/articleActions/EditArticleComponent";


import "../App/App.css";
import '../styles/style.css';


const ProtectedRoute = ({component:Component, ...rest}) => {
  return <Route {...rest} render={(props)=> {
    return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />
  }} />
}

const Router = () => {
  return (
    <div>
      <LogoComponent />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} exact/>
          <Route path="/home" component={HomeComponent} />
  
          <Route path="/contact" component={ContactUsComponent}></Route>
          <Route path="/show-list-articles" component={ShowListOfArticlesComponent}></Route>
          <Route path="/experiences" component={ExperiencesComponent}></Route>
          <Route path="/events" component={EventsComponent}></Route>
          <Route path="/register" component={UserRegisterComponent} />
          <Route path="/login" component={UserLoginComponent}></Route>
          <Route path="/logout" component={UserLogoutComponent}></Route>
          <Route path="/show-article/:articleId" component={ShowSingleArticleComponent}></Route>
          <ProtectedRoute path="/dashboard" component={DashboardComponent} />
          <ProtectedRoute path="/articles" component={ArticlesComponent} />
          <ProtectedRoute path="/add-article" component={CreateArticleComponent} />
          <ProtectedRoute path="/edit-article/:articleId" component={EditArticleComponent} />
          <ProtectedRoute path="/search-partner" component={SearchYourPartnerComponent} />
          <ProtectedRoute path="/single-message-receive/:messageReceiveId" component={ReceiveMessageComponent} />
          <ProtectedRoute path="/single-user-profile/:userProfileId" component={SingleUserProfileComponent} />      
          
        </Switch>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
};

export default Router;
