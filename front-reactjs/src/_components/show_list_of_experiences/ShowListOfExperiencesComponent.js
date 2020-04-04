import React, { Component } from 'react';
import "./showListsOfExperiences.css";
import * as moment from "moment";
import { NavbarComponent } from "../NavbarComponent";
//import {LikeButtonExperiences} from "./../like_button_experiences/LikeButtonExperiences";

class ShowListOfExperiencesComponent extends React.Component
{

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    title: "",
                    content: "",
                    published_at: "",
                    user: {
                        firstName: ""
                    }
                }
            ]
        }
    }

    componentDidMount() {
        return fetch(`http://localhost:8000/api/experiences`, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log("response json: ", responseJson);
            this.setState({
                items: responseJson
            });
        })
        .catch(error => {
            console.error(error);
        });
        
    }

    render() {
        return(
            <div className="list-of-experiences">
        <NavbarComponent />
        <h1>Lists of Experiences</h1>
        {this.state.items.map(item => {
          //console.log("an item value: ", item)
          return (
            <div className="container mt-5 mb-5">
              <div className="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" style={{backgroundColor: "#ffe6e6"}}>
                  <ul class="timeline">
                    <li>
                      <a href={"/show-experience/" + item.id}>
                      <strong style={{color: "green"}}>{item.title}</strong>
                      </a>
                      
                      <p className="float-right" style={{fontStyle: "italic", color: "green"}}>{moment(item.published_at).format('LLL')}</p> 
                      <p className="experience-content">{item.content}</p>
                      <p className="float-right">
                        <strong style={{color: "green"}}>{item.user.firstName + " " + item.user.lastName}</strong>
                      </p>
                      
                      <span className="react-like"></span>
                      {/* <LikeButtonExperiences test={this.props.likes}/> */}
                      
                        
                     
                      
                    </li>
                  </ul>
                </div>
                <div class="col-md-2"></div>
              </div>
            </div>
          );
        })}
      </div>
        )
    }
}
export { ShowListOfExperiencesComponent };