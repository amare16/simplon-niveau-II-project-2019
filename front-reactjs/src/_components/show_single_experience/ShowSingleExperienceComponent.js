import React, { Component } from 'react';
import "./showSingleExperience.css";
import moment from "moment";

class ShowSingleExperienceComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            content: "",
            published_at: "",
            user: {
                firstName: "",
                lastName: ""
            }
        }
        //console.log("test: ", this.state)
    }

    componentWillMount() {
        this.getSingleExperience();
    }

    getSingleExperience() {
        let experienceId = this.props.match.params.experienceId;
        fetch(`http://localhost:8000/api/single-experience/` + experienceId, {
            method: "GET",
            mode: "cors"
        })
        .then(res => res.json())
        .then(resJson => {
            console.log("res json: ", resJson)
            this.setState(
                {
                  id: resJson.id,
                  title: resJson.title,
                  content: resJson.content,
                  published_at: resJson.published_at,
                  user: resJson.user
                },
                () => {
                  console.log(this.state);
                }
              );
        })
    }

    render() {
        let tokenRedirect = localStorage.getItem("token");
        return(
            <div className="container-fluid">
                <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-sm-12">
            <div className="text-center">
              {
                tokenRedirect ? <a
                href={"/experiences"}
                
                style={{ borderRadius: "35px", fontSize: "25px" }}
              >
                
                <p><i class="fa fa-history" aria-hidden="true" style={{ color: "green"}}></i>&nbsp;&nbsp;<strong>Click here to see list of Expriences</strong></p>
              </a> : 
              <a
              href={"/show-list-experiences"}
              
              style={{ borderRadius: "35px", fontSize: "25px" }}
            >
              
              <p><i class="fa fa-history" aria-hidden="true" style={{ color: "green"}}></i>&nbsp;&nbsp;<strong>Click here to see list of Experiences</strong></p>
            </a>
              }
              
            </div>
            
          </div>
        </div>
        <div className="well show-single-article">
          <div className="jumbotron">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="https://previews.123rf.com/images/paylessimages/paylessimages1502/paylessimages150233243/40325604-potato-field.jpg"
                width="150"
                height="150"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </a>
            <div className="media-body">
              <h4 className="media-heading" style={{ color: "green" }}>
                {this.state.title}
              </h4>
              <p className="single-article-content">{this.state.content}</p>
              <p
                className="text-left"
                style={{ fontStyle: "italic", color: "green" }}
              >
                {moment(this.state.published_at).format("LLL")}
              </p>
              <p className="text-right">
                <strong style={{ color: "green" }}>
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </strong>
              </p>
            </div>
          </div>
        </div>
    
        
      </div>
            
        );
    }

}
export { ShowSingleExperienceComponent };