import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {App} from "../App";
import { LogoComponent } from "../_components/LogoComponent";
import { HomeComponent } from "../_components/HomeComponent";
import { ContactUsComponent } from "../_pages/ContactUsComponent";
import { FooterComponent } from "../_components/FooterComponent";

import { FarmersListComponent } from "../_pages/FarmersListComponent";
import { ArticlesComponent } from "../_pages/ArticlesComponent";
import { ExperiencesComponent } from "../_pages/ExperiencesComponent";
import { EventsComponent } from "../_pages/EventsComponent";
import { UserLoginComponent } from "../_pages/UserLoginComponent";
import { UserRegisterComponent } from "../_pages/UserRegisterComponent";


import { CreateArticleComponent } from "../actions/articleActions/CreateArticleComponent";
import { EditArticleComponent } from "../actions/articleActions/EditArticleComponent";


import "../App/App.css";
import '../styles/style.css';

const Router = () => {
  return (
    <div>
      <LogoComponent />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} exact/>
          <Route path="/home" component={HomeComponent} />
          <Route path="/articles" component={ArticlesComponent}></Route>
          <Route path="/contact" component={ContactUsComponent}></Route>
          <Route path="/experiences" component={ExperiencesComponent}></Route>
          <Route path="/events" component={EventsComponent}></Route>
          <Route path="/register" component={UserRegisterComponent} />
          <Route path="/login" component={UserLoginComponent}></Route>
          <Route path="/farmers-list" component={FarmersListComponent}></Route>
          <Route path="/add-article" component={CreateArticleComponent}></Route>
          <Route
            path="/edit-article/:articleId"
            component={EditArticleComponent}
          ></Route>
          
        </Switch>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
};

export default Router;
