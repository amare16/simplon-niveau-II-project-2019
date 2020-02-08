import React from "react";
import { NavbarComponent } from "../_components/NavbarComponent";

class ArticlesComponent extends React.Component {
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
        this.setState({
          data: responseJson
        });
        console.log("what is the value of : ", responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const thStyle = {
      textAlign: 'center'
    }
    
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
                  <th scope="col">First Name</th>
                  <th scope="col" style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => {
                  console.log("an item value: ", item.user)
                  return (
                    <tr>
                      <td>{item.title}</td>
                      <td>{item.publishedAt}</td>
                      <td>{item.user.firstName}</td>

                      <td>
                        <div className="item-actions">
                          <a
                            href="/show-article"
                            className="btn btn-sm btn-info"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                            Show
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="/edit-article/{id}"
                            className="btn btn-sm btn-warning"
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>{" "}
                            Edit
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="/delete-article"
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fa fa-delete" aria-hidden="true"></i>{" "}
                            Delete
                          </a>
                          &nbsp;&nbsp;
                          <a
                            href="/add-article"
                            className="btn btn-sm btn-success"
                          >
                            <i className="fa fa-add" aria-hidden="true"></i> Add
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      
    );
  }

  deleteHandler(i, e) {
    e.preventDefault();
    this.onDelete();
  }
}

export { ArticlesComponent };
