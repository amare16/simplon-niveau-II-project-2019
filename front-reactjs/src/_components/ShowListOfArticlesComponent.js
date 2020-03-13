import React, { Component } from "react";
import * as moment from "moment";
import { NavbarComponent } from "./NavbarComponent";

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
      <div>
        <NavbarComponent />
        <div className="container table-responsive">
          <h1>List of Articles</h1>

          {this.state.items.map(item => {
            //console.log("an item value: ", typeof(item.user))
            return (
              <div className="container-fluid">
                <div className="well">
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
                      <h4 className="media-heading">{item.title}</h4>
                      <p>{item.content}</p>
                      <p className="text-left">{moment(item.published_at).format('LLL')}</p>
                      <p className="text-right">
                        {item.user.firstName + " " + item.user.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { ShowListOfArticlesComponent };
