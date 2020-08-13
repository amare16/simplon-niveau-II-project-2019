import React from "react";
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
    };
  }

  componentDidMount() {
    this.getListOfMaterials();
  }

  getListOfMaterials() {
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
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
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
    const { data, value } = this.state;
    console.log("this data: ", this.state.data);

    let token = localStorage.getItem("token");
    let usernameStored = localStorage.getItem("username");
    let connectedUsername = token && usernameStored;
    console.log("connected : ", connectedUsername);
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
        <div className="back-to-dashboard" style={{ marginBottom: "10px" }}>
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
        <div>
          <h2 className="title" style={{color: "#3333ff", textAlign: "center"}}>List of Materials</h2>
        </div>
        <SearchResults
          value={value}
          data={data}
          renderResults={(results) => (
            <div className="table-responsive-lg">
              <table className="table table-striped table-hover mx-auto w-75">
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
              </table>
            </div>
          )}
        />
      </div>
    );
  }
}

export { ListOfMaterialsForGuestComponent };
