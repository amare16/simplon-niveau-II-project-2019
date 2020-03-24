import React, { Component } from "react";
import * as moment from "moment";
import { NavbarComponent } from "../NavbarComponent";
import {LikeButtonArticles} from "./../like_button_articles/LikeButtonArticles";
import "./showListOfArticles.css";

class ShowListOfArticlesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          title: "",
          content: "",
          publishedAt: "",
          user: {
            firstName: ""
          }
        }
      ]
    };
  }

  componentDidMount() {
    return fetch("http://localhost:8000/api/articles", {
      method: "GET",
      mode: "cors"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("what is the value of : ", responseJson);
        this.setState({
          items: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const thStyle = {
      textAlign: "center"
    };
    console.log("test this state items: ", this.state.items);

    return (
      <div className="list-of-articles">
        <NavbarComponent />
        <h1>Lists of Articles</h1>
        {this.state.items.map(item => {
          //console.log("an item value: ", item)
          return (
            <div className="container mt-5 mb-5">
              <div className="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" style={{backgroundColor: "#ffe6e6"}}>
                  <ul class="timeline">
                    <li>
                      <a href={"/show-article/" + item.id}>
                      <strong style={{color: "green"}}>{item.title}</strong>
                      </a>
                      
                      <p className="float-right" style={{fontStyle: "italic", color: "green"}}>{moment(item.published_at).format('LLL')}</p> 
                      <p className="article-content">{item.content}</p>
                      <p className="float-right">
                        <strong style={{color: "green"}}>{item.user.firstName + " " + item.user.lastName}</strong>
                      </p>
                      
                      <span className="react-like"></span>
                      <LikeButtonArticles test={this.props.likes}/>
                      
                        
                     
                      
                    </li>
                  </ul>
                </div>
                <div class="col-md-2"></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export { ShowListOfArticlesComponent };
