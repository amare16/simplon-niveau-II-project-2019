import React from "react";
import * as moment from "moment";
import { NavbarComponent } from "../_components/NavbarComponent";
import { UserLogoutComponent } from "./UserLogoutComponent";
import { Redirect } from "react-router-dom";

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
          },
          message: null
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

  showArticlesAfterDelete() {
    setTimeout(() => {
      fetch("http://localhost:8000/api/articles", {
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
    }, 200);
    
  }

  deleteArticle(e, id) {

    console.log("id article:", id);

    if (window.confirm("Are you sure to delete this article?")) {
      let token = localStorage.getItem("token");
      console.log("token", token);
      fetch(`http://localhost:8000/api/delete-article/` + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token
        }
      })
        .then(res => {
          this.setState({ message: "This article is successfully Inserted ", res});
          this.showArticlesAfterDelete();
            //this.props.history.push("/articles");
            //return (<Redirect to={'/articles'} />)
        })
        .catch(err => err);
    }
  }

  render() {
    const thStyle = {
      textAlign: "center"
    };

    return (
      <div>
        <UserLogoutComponent />
        <NavbarComponent />
        <div className="container table-responsive" style={{ marginBottom: "60px"}}>
          <h1>List of Articles</h1>
          
          <a href="/add-article">
            <i
              className="add-article-icon fa fa-plus-circle fa-3x"
              aria-hidden="false"
            ></i>
          </a>&nbsp;&nbsp;
          <a href="/dashboard">
          <i class="fa fa-arrow-circle-o-left fa-3x" aria-hidden="true" style={{color: "green"}}></i>
          </a>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Publish Date</th>
                <th scope="col" style={thStyle}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => {
                //console.log("an item value: ", typeof(item.user))
                return (
                  <tr>
                    <td>{item.title}</td>
                    <td>{moment(item.published_at).format('LLL')}</td>
                    <td>
                      <div className="item-actions">
                        <a href={"/show-article/" + item.id}  className="btn btn-sm btn-info">
                          <i className="fa fa-eye" aria-hidden="true"></i> Show
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href={"/edit-article/" + item.id}
                          className="btn btn-sm btn-warning"
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i> Edit
                        </a>
                        &nbsp;&nbsp;
                        <a
                          
                          onClick={(e) => this.deleteArticle(e, item.id)}
                          className="btn btn-sm btn-danger"
                          style={{cursor: "pointer"}}
                        >
                          <i className="fa fa-delete" aria-hidden="true"></i>{" "}
                          Delete
                        </a>
                        {/* <button
                          type="button"
                          onClick={e => this.deleteArticle(e, item.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button> */}
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

}
export { ArticlesComponent };
