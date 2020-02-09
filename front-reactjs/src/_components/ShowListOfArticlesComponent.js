import React, { Component } from "react";
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

    return (
      <div>
        <NavbarComponent />
        <div className="container table-responsive">
          <h1>Lists of Articles</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Publish Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => {
                //console.log("an item value: ", typeof(item.user))
                return (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.published_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { ShowListOfArticlesComponent };
