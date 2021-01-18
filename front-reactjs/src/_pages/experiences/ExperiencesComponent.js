import React, { Component } from "react";
import { Card, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { UserLogoutComponent } from "../UserLogoutComponent";
import { NavbarComponent } from "../../_components/NavbarComponent";
import moment from "moment";
import axios from "axios";
import $ from "jquery";

class ExperiencesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // items: [
      //   {
      //     title: "",
      //     content: "",
      //     published_at: "",
      //     user: {
      //       firstName: "",
      //     },
      //   },
      // ],
      items: [],
      currentPage: 1,
      experiencesPerPage: 4,
    };
    console.log(this.state);
  }

  
  componentDidMount() {
    this.getAllExperiences();
  }

  getAllExperiences() {
    axios
      .get("http://localhost:8000/api/experiences")
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
      Math.ceil(this.state.items.length / this.state.experiencesPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.items.length / this.state.experiencesPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.items.length / this.state.experiencesPerPage)
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  showExperiencesAfterDelete() {
    setTimeout(() => {
      fetch(`http://localhost:8000/api/experiences`, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((resJson) => {
          console.log("res json: ", resJson);
          this.setState({
            items: resJson,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }, 500);
  }

  deleteExperience(e, id) {
    if (window.confirm("Are you sure to delete this experience?")) {
      console.log("id experience:", id);
      let token = localStorage.getItem("token");
      fetch(`http://localhost:8000/api/delete-experience/` + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
        .then((res) => {
          console.log("result: ", res);
          this.setState({ res });
          this.showExperiencesAfterDelete();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    const { items, currentPage, experiencesPerPage } = this.state;

    const lastIndex = currentPage * experiencesPerPage;
    const firstIndex = lastIndex - experiencesPerPage;
    const currentExperiences = items.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(items.length / experiencesPerPage);

    console.log("url path: ", this.match);
    let username = localStorage.getItem("username");
    console.log("username in the LS", username);

    const thStyle = {
      textAlign: "center",
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
          className={"border border-dark bg-success text-white container"}
          style={{ marginBottom: "100px", backgroundColor: "#153c9e" }}
        >
          <Card.Header style={{ backgroundColor: "#ffc107" }}>
            <h1>List of Experiences</h1>
            <a href="/add-experience">
              <i
                className="add-experience-icon fa fa-plus-circle fa-3x"
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
                {currentExperiences.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6" style={{color: "red", fontWeight: "bold" }}>No Experience Available</td>
                  </tr>
                ) : (
                  currentExperiences.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.title.substring(0, 20) ? (<p>{item.title.substring(0, 20)}...</p>) : (<p style={{display: 'none'}}>{item.title}</p>)}
                      </td>
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
                                href={"/edit-experience/" + item.id}
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
                                  this.deleteExperience(e, item.id)
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
                                href={"/edit-experience/" + item.id}
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
                                  this.deleteExperience(e, item.id)
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
      </div>
    );
  }
}

export { ExperiencesComponent };
