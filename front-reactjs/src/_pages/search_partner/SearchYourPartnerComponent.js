import React, { Component } from "react";
import { Card, Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import SearchResults from "react-filter-search";
import { UserLogoutComponent } from "../UserLogoutComponent";
import "./searchPartner.css";
import { data } from "jquery";
class SearchYourPartnerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  }

  // fetch the users and its corresponding fields
  componentDidMount() {
    this.getAllUsersToContact();
  }

  getAllUsersToContact() {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => response.data)
      .then((data) => {
        console.log("data data: ", data);
        this.setState({ data: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

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
      Math.ceil(this.state.data.length / this.state.itemsPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.data.length / this.state.itemsPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.data.length / this.state.itemsPerPage)
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  render() {
    const { data, value, currentPage, itemsPerPage } = this.state;
    console.log("current page no: ", this.state.pageNumber);
    // let totalPages = Math.ceil(this.state.totalItems / this.state.numItemsPerPage);
    // console.log("total pages: ", totalPages);
    let token = localStorage.getItem("token");
    let usernameStored = localStorage.getItem("username");
    let connectedUsername = token && usernameStored;
    console.log("connected : ", connectedUsername);

    // Get current items
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = data.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A2B8",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };

    return (
      <div className="container-fluid user-type-list table-responsive">
        {connectedUsername ? <UserLogoutComponent /> : null}

        <div className="d-flex justify-content-center">
          <div className="searchbar">
            <input
              className="search_input"
              id="input-search-id"
              type="text"
              name=""
              placeholder="Search..."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Search...")}
              onChange={this.handleChange}
              value={value}
            />
            <a className="search_icon">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>

        <Card
          className={"border border-dark bg-info text-white container"}
          style={{ marginBottom: "100px", backgroundColor: "#153c9e" }}
        >
          <Card.Header style={{ backgroundColor: "rgb(47, 46, 14, .79)" }}>
            <h2 className="title" style={{ textAlign: "center" }}>
              Search Your Partner
            </h2>
            <div
              className="back-to-dashboard-search-partner"
              style={{ margin: "0 auto" }}
            >
              <a href={"/dashboard"}>
                <input
                  type="button"
                  className="btn btn-success"
                  style={{ marginTop: "30px" }}
                  value="Back to Dashboard"
                />
              </a>
            </div>
          </Card.Header>
          <Card.Body style={{ backgroundColor: "blanchedalmond" }}>
            <SearchResults
              value={value}
              data={currentItems}
              renderResults={(results) => (
                <Table
                  responsive
                  bordered
                  hover
                  striped
                  variant="dark"
                  style={{ backgroundColor: "rgb(137 68 140)" }}
                >
                  <thead style={{ backgroundColor: "blueviolet"}}>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">City</th>
                      <th scope="col">User Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(
                      (result, index) => (
                        console.log("test: ", connectedUsername),
                        connectedUsername !== result.username ? (
                          <tr key={index.id}>
                            <td>{result.firstName}</td>
                            <td>{result.lastName}</td>
                            <td>{result.city}</td>

                            {/* <td>{el.user_type[0].name}</td> */}
                            {result.user_type.map((res, i) => (
                              <td key={i}>{res.name}</td>
                            ))}
                            <td>
                              <a
                                href={
                                  "/single-user-profile/" +
                                  result.userProfile.id
                                }
                                className="btn btn-sm btn-info"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                                Profile
                              </a>
                            </td>
                          </tr>
                        ) : (
                          <tr key={result.id} style={{ display: "none" }}>
                            <td>{result.firstName}</td>
                            <td>{result.lastName}</td>
                            <td>{result.city}</td>
                            {result.user_type.map((res, i) => (
                              <td key={i}>{res.name}</td>
                            ))}

                            <td>
                              <a
                                href={
                                  "/single-user-profile/" +
                                  result.userProfile.id
                                }
                                className="btn btn-sm btn-info"
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                                Profile
                              </a>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </Table>
              )}
            />
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

export { SearchYourPartnerComponent };
