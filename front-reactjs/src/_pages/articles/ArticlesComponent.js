import React from "react";
import { Card, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import * as moment from "moment";
import { NavbarComponent } from "../../_components/NavbarComponent";
import { UserLogoutComponent } from "../UserLogoutComponent";
import "./articles.css";
import { Redirect } from "react-router-dom";

class ArticlesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currentPage: 1,
      articlesPerPage: 4,
    };
  }
  componentDidMount() {
    this.getAllArticles();
  }

  getAllArticles() {
    axios
      .get("http://localhost:8000/api/articles")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ items: data });
      });
  }

  changePage = (event) => {
    console.log("change event");
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  firstPage = () => {
    console.log("firstPage");
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: 1 });
    }
  };

  prevPage = () => {
    console.log("prevPage");
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  lastPage = () => {
    console.log("lastPage");
    if (
      this.state.currentPage <
      Math.ceil(this.state.items.length / this.state.articlesPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.items.length / this.state.articlesPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.items.length / this.state.articlesPerPage)
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  
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

    console.log("id: ", id);
    
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

    const { items, currentPage, articlesPerPage } = this.state;

    const lastIndex = currentPage * articlesPerPage;
    const firstIndex = lastIndex - articlesPerPage;
    const currentArticles = items.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(items.length / articlesPerPage);

    let username = localStorage.getItem("username");
    console.log("username in the LS", username)
    const thStyle = {
      textAlign: "center"
    };

    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };

    return (
      <div>
        <UserLogoutComponent />
        <NavbarComponent />

        <Card
          className={"border border-dark bg-dark text-white container"}
          style={{ marginBottom: "100px", backgroundColor: "#153c9e" }}
        >
          <Card.Header style={{ backgroundColor: "rgb(21, 60, 158, .54)" }}>
            <h1>List of Articles</h1>
            <a href="/add-article">
              <i
                className="add-article-icon fa fa-plus-circle fa-3x"
                aria-hidden="false"
              ></i>
            </a>
            &nbsp;&nbsp;
            <a href="/dashboard">
              <i
                class="fa fa-arrow-circle-o-left fa-3x"
                aria-hidden="true"
                style={{ color: "green" }}
              ></i>
            </a>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "blanchedalmond" }}>
            <Table
              responsive
              bordered
              hover
              striped
              variant="dark"
              style={{ backgroundColor: "#6c757d" }}
            >
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Published</th>
                  <th scope="col" style={thStyle}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6" style={{color: "red", fontWeight: "bold" }}>No Articles Available</td>
                  </tr>
                ) : (
                  currentArticles.map((item, index) => (
                    <tr key={index}>
                      {item.title.substring(0, 20) ? (<p>{item.title.substring(0, 20)}...</p>) : (<p style={{display: 'none'}}>{item.title}</p>)}
                      <td>{moment(item.published_at).format("LLL")}</td>
                      <td>
                        <div className="item-actions">
                          <a
                            href={"/show-experience/" + item.id}
                            className="btn btn-sm btn-info"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                            Show
                          </a>
                          &nbsp;&nbsp;
                          {username === item.user.username ? (
                            <span>
                              <a
                                href={"/edit-article/" + item.id}
                                className="btn btn-sm btn-warning"
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>{" "}
                                Edit
                              </a>
                              &nbsp;&nbsp;
                              <a
                                className="btn btn-sm btn-danger"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  this.deleteArticle(e, item.id)
                                }
                              >
                                <i
                                  className="fa fa-delete"
                                  aria-hidden="true"
                                ></i>{" "}
                                Delete
                              </a>
                            </span>
                          ) : (
                            <span>
                              <a
                                href={"/edit-article/" + item.id}
                                className="btn btn-sm btn-secondary disabled"
                                style={{ pointerEvents: "none", color: "#ccc" }}
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>{" "}
                                Edit
                              </a>
                              &nbsp;&nbsp;
                              <a
                                title="You can't delete me!"
                                className="btn btn-sm btn-secondary disabled"
                                style={{ pointerEvents: "none", color: "#ccc" }}
                                onClick={(e) =>
                                  this.deleteArticle(e, item.id)
                                }
                              >
                                <i
                                  className="fa fa-delete"
                                  aria-hidden="true"
                                ></i>{" "}
                                Delete
                              </a>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: "rgb(21, 60, 158, .54" }}>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <Button
                    type="button"
                    variant="danger"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                  </Button>
                  <Button
                    type="button"
                    variant="warning"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}
                  >
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  style={pageNumCss}
                  className={"page-num bg-dark"}
                  name="currentPage"
                  value={currentPage}
                  onChange={this.changePage}
                />
                <InputGroup.Append>
                  <Button
                    type="button"
                    variant="warning"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.nextPage}
                  >
                    <FontAwesomeIcon icon={faStepForward} /> Next
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.lastPage}
                  >
                    <FontAwesomeIcon icon={faFastForward} /> Last
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
        {/* <div className="container table-responsive" style={{ marginBottom: "60px"}}>
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
          <table className="table table-striped table-hover table-responsive">
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
              {currentArticles.map(item => {
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
                        
                        {
                          username === item.user.username ? (
                            <span>
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
                            </span>
                            
                          ) : (
                            <span>
                            <a
                          href={"/edit-article/" + item.id}
                          className="btn btn-sm btn-secondary disabled"
                          style={{pointerEvents: "none", color: "#ccc"}}
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i> Edit
                        </a>
                        &nbsp;&nbsp;
                            <a
                          onClick={(e) => this.deleteArticle(e, item.id)}
                          className="btn btn-sm btn-secondary disabled"
                          style={{pointerEvents: "none", color: "#ccc"}}
                          disabled={true}
                        >
                          <i className="fa fa-delete" aria-hidden="true"></i>{" "}
                          Delete
                        </a>
                        </span>
                          )
                        }
                        
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    );
  }

}
export { ArticlesComponent };
