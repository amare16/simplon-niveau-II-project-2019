import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {App} from "../App";
import { LogoComponent } from "../_components/LogoComponent";
import { HomeComponent } from "../_components/HomeComponent";
import { ContactUsComponent } from "../_pages/ContactUsComponent";
import { FooterComponent } from "../_components/FooterComponent";
import { ShowListOfArticlesComponent } from "./show_list_of_articles/ShowListOfArticlesComponent";
import { ShowSingleArticleComponent } from "./show_single_article/ShowSingleArticleComponent";
import { ShowListOfExperiencesComponent } from "./show_list_of_experiences/ShowListOfExperiencesComponent";
import { ShowSingleExperienceComponent } from "./show_single_experience/ShowSingleExperienceComponent";

import { SearchYourPartnerComponent } from "../_pages/SearchYourPartnerComponent";
import { ArticlesComponent } from "../_pages/ArticlesComponent";
import { ExperiencesComponent } from "../_pages/experiences/ExperiencesComponent";
import { EventsComponent } from "../_pages/EventsComponent";
import { UserLoginComponent } from "../_pages/UserLoginComponent";
import { UserRegisterComponent } from "../_pages/UserRegisterComponent";
import { UserLogoutComponent } from "../_pages/UserLogoutComponent";
import { DashboardComponent } from "./dashboard/DashboardComponent";
import { ReceiveMessageComponent } from "../_pages/ReceiveMessageComponent";
import { SingleUserProfileComponent } from "../_pages/single_user_profile/SingleUserProfileComponent";
import { BorrowLendMaterialComponent } from "../_pages/borrow_lend_material/BorrowLendMaterialComponent";
import { SingleMaterialComponent } from "../_pages/single_material/SingleMaterialComponent";

import { CreateArticleComponent } from "../actions/articleActions/CreateArticleComponent";
import { EditArticleComponent } from "../actions/articleActions/EditArticleComponent";
import { CreateMaterialComponent } from "../actions/materialActions/create_material/CreateMaterialComponent";
import { CreateBorrowMaterialComponent } from "../actions/borrowMaterialActions/create_borrow_material/CreateBorrowMaterialComponent";
import { EditMaterialComponent } from "../actions/materialActions/edit_material/EditMaterialComponent";
import { EditBorrowMaterialComponent } from "../actions/borrowMaterialActions/edit_borrow_material/EditBorrowMaterialComponent";
import { EditExperienceComponent } from "../actions/experienceActions/edit_experience/EditExperienceComponent";
import { CreateExperienceComponent } from "../actions/experienceActions/create_experience/CreateExperienceComponent";

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
          <Route path="/show-list-experiences" component={ShowListOfExperiencesComponent}></Route>
          <Route path="/events" component={EventsComponent}></Route>
          <Route path="/register" component={UserRegisterComponent} />
          <Route path="/login" component={UserLoginComponent}></Route>
          <Route path="/logout" component={UserLogoutComponent}></Route>
          <Route path="/show-article/:articleId" component={ShowSingleArticleComponent}></Route>
          <Route path="/show-experience/:experienceId" component={ShowSingleExperienceComponent}></Route>
          <ProtectedRoute path="/dashboard" component={DashboardComponent} />
          <ProtectedRoute path="/articles" component={ArticlesComponent} />
          <ProtectedRoute path="/add-article" component={CreateArticleComponent} />
          <ProtectedRoute path="/edit-article/:articleId" component={EditArticleComponent} />
          <ProtectedRoute path="/search-partner" component={SearchYourPartnerComponent} />
          <ProtectedRoute path="/single-message-send" component={ReceiveMessageComponent} />
          <ProtectedRoute path="/single-user-profile/:userProfileId" component={SingleUserProfileComponent} />   
          <ProtectedRoute path="/borrow-lend-materials" component={BorrowLendMaterialComponent} /> 
          <ProtectedRoute path="/single-material/:materialId" component={SingleMaterialComponent} />
          <ProtectedRoute path="/add-material" component={CreateMaterialComponent} />
          <ProtectedRoute path="/add-borrow-material" component={CreateBorrowMaterialComponent} />
          <ProtectedRoute path="/edit-material" component={EditMaterialComponent} />
          <ProtectedRoute path="/edit-borrow-material" component={EditBorrowMaterialComponent} />
          <ProtectedRoute path="/experiences" component={ExperiencesComponent} />
          <ProtectedRoute path="/edit-experience/:experienceId" component={EditExperienceComponent} />
          <ProtectedRoute path="/add-experience" component={CreateExperienceComponent} />
          
        </Switch>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
};

export default Router;
