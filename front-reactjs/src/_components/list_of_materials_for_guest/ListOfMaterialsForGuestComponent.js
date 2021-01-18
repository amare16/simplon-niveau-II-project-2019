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
import "./listOfMaterialsForGuest.css";
import * as moment from "moment";
import { NavbarComponent } from "../NavbarComponent";
import SearchResults from "react-filter-search";

class ListOfMaterialsForGuestComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: "",
      currentPage: 1,
      itemsPerPage: 4,
    };
  }

  componentDidMount() {
    this.getListOfMaterials();
  }

  getListOfMaterials() {
    axios
      .get("http://localhost:8000/api/materials")
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

  showMaterialAfterDelete() {
    setTimeout(() => {
      fetch("http://localhost:8000/api/materials", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          data: response,
        });
        console.log("response result: ", response);
      })
      .catch((error) => {
        console.error(error);
      });
    }, 200);
  }

  deleteMaterial(e, id) {

    console.log("id: ", id);
    
    if (window.confirm("Are you sure to delete this material?")) {
      let token = localStorage.getItem("token");
      console.log("token", token);
      fetch(`http://localhost:8000/api/delete-material/` + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token
        }
      })
        .then(res => {
          this.setState({ message: "This article is successfully Inserted ", res});
          this.showMaterialAfterDelete();
            //this.props.history.push("/articles");
            //return (<Redirect to={'/articles'} />)
        })
        .catch(err => err);
    }
  }

  render() {
    const { data, value, currentPage, itemsPerPage } = this.state;
    console.log("this data: ", this.state.data);

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
      <div className="container-fluid borrow-materials-list">
          <NavbarComponent />
        
        <div className="d-flex justify-content-center">
          <div className="searchbar-borrow-lend">
            <input
              className="search-input-borrow-lend"
              id="input-search-borrow-lend"
              type="text"
              name=""
              placeholder="Search..."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Search...")}
              onChange={this.handleChange}
              value={value}
            />
            <a className="search-icon-borrow-lend">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <Card
          className={"border border-white bg-white text-white container"}
          style={{ marginBottom: "100px", backgroundColor: "#153c9e" }}
        >
          <Card.Header style={{ backgroundColor: "orange" }}>
          
        <h2
              className="title"
              style={{ textAlign: "center" }}
            >
              List of Materials
            </h2>
            <div className="back-to-dashboard" style={{ marginBottom: "10px", margin: "0 auto" }}>
        <a href={"/add-material"}>
            <input
              type="button"
              className="btn btn-primary"
              style={{ marginTop: "30px" }}
              value="Add Material"
            />
          </a>&nbsp;&nbsp;
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
                style={{ backgroundColor: "#e83e8c52", color: "black" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">City</th>
                      <th scope="col">Material Name</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Borrowed Date</th>
                      <th scope="col">Return Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {results.map(
                    (result, index) => (
                      console.log("test conn: ", result),
                      connectedUsername !== result.user.username ? (
                        <tr key={index.id}>
                          <td>
                            {result.user.firstName}&nbsp;
                            {result.user.lastName}
                          </td>
                          <td>{result.user.city}</td>
                          <td>{result.name}</td>
                          <td>
                            {result.availability ? (
                              <p style={{ color: "green", fontWeight: "bold" }}>
                                Available
                              </p>
                            ) : (
                              <p style={{ color: "red", fontWeight: 'bold'}}>Not Available</p>
                            )}
                          </td>
                          <td>{moment(result.borrowed_date).format("L")}</td>
                          <td>{moment(result.return_date).format("L")}</td>
                          {console.log(
                            "user profile: ",
                            result.user.userProfile.id
                          )}
                          <td>
                            <a
                              href={"/single-material/" + result.id}
                              className="btn btn-sm btn-info"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              Material Details
                            </a>
                          </td>
                          
                          {
                          result.availability ? (<td>
                            <a
                              href={
                                "/message-material/" +
                                result.user.userProfile.id
                              }
                              className="btn btn-sm btn-success"
                            >
                              <i
                                className="fa fa-comments"
                                aria-hidden="true"
                              ></i>{" "}
                              Contact Me
                            </a>
                          </td>) : (<td>
                            <a
                              href={
                                "/message-material/" +
                                result.user.userProfile.id
                              }
                              className="btn btn-sm btn-success"
                              style={{pointerEvents: "none", cursor: "default", backgroundColor: "red"}}
                            >
                              <i
                                className="fa fa-comments"
                                aria-hidden="true"
                              ></i>{" "}
                              Contact Me
                            </a>
                          </td>)
                          }
                          
                        </tr>
                      ) : (
                        <tr key={result.id} style={{ display: "none" }}>
                          <td>
                            {result.user.firstName}&nbsp;
                            {result.user.lastName}
                          </td>
                          <td>{result.user.city}</td>
                          <td>{result.name}</td>
                          {result.availability ? (<td style={{ color: "green" }}>Available</td>): (<td style={{ color: "red" }}>Not Available</td>)}
                          {/* <td>
                            {result.availability ? (
                              <p style={{ color: "green" }}>Available</p>
                            ) : (
                              <p style={{ color: "red" }}>Not Available</p>
                            )}
                          </td> */}
                          <td>{moment(result.borrowed_date).format("L")}</td>
                          <td>{moment(result.return_date).format("L")}</td>
                          <td>
                            <a
                              href={"/single-material/" + result.id}
                              className="btn btn-sm btn-info"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                              Material Details
                            </a>
                          </td>

                          <td>
                            <a
                              href={
                                "/message-material/" +
                                result.user.userProfile.id
                              }
                              className="btn btn-sm btn-success"
                            >
                              <i
                                className="fa fa-comments"
                                aria-hidden="true"
                              ></i>{" "}
                              Contact Me
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
            <div style={{ float: "right" }}>
              Showing Page {currentPage} of {totalPages}
            </div>
            <div style={{ float: "left" }}>
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

export { ListOfMaterialsForGuestComponent };
