import React, { Component } from "react";
import "./borrowLendMaterial.css";
import * as moment from "moment";
import SearchResults from "react-filter-search";

class BorrowLendMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: ""
    };
  }

  componentDidMount() {
    return fetch("http://localhost:8000/api/borrow-materials", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          data: response
        });
        console.log("response result: ", response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };
  render() {
    const { data, value } = this.state;
    console.log("this data: ", this.state.data);
    return (
      <div className="container-fluid borrow-materials-list">
        <div className="d-flex justify-content-center">
          <div className="searchbar-borrow-lend">
            <input
              className="search-input-borrow-lend"
              id="input-search-borrow-lend"
              type="text"
              name=""
              placeholder="Search..."
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Search...")}
              onChange={this.handleChange}
              value={value}
            />
            <a className="search-icon-borrow-lend">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>
        <div className="back-to-dashboard" style={{marginBottom: '10px'}}>
          <a href={"/dashboard"}>
                          <input
                            type="button"
                            className="btn btn-success"
                            style={{marginTop: '30px'}}
                            value="Back to Dashboard"
                          />
                        </a>
          </div>
        <SearchResults
          value={value}
          data={data}
          renderResults={results => (
            <div className="table-responsive-lg">
              <table className="table table-striped table-hover mx-auto w-50">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Material</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(result => (
                    <tr>
                      <td>
                        {result.id_borrower.firstName}&nbsp;
                        {result.id_borrower.lastName}
                      </td>
                      <td>{result.id_borrower.city}</td>
                      <td>{result.material.name}</td>
                      <td>{moment(result.start_date).format("L")}</td>
                      <td>{moment(result.end_date).format("L")}</td>
                      <td>
                        <a
                          href={"/single-material/" + result.material.id}
                          className="btn btn-sm btn-info"
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i> Material
                        </a>
                      </td>
                      {console.log("material id: ", result.material.id)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        />
      </div>
    );
  }
}

export { BorrowLendMaterialComponent };
