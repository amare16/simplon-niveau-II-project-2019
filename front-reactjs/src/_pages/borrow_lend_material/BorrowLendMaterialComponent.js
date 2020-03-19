import React, { Component } from "react";
import "./borrowLendMaterial.css";

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
        console.log("response result: ", response[0].id_borrower.firstName);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { data, value } = this.state;
    console.log("this state: ", this.state);
    return (
      <div className="container">
        <div className="searchbar">
          <input
            className="search_input"
            id="input-search-id"
            type="text"
            name=""
            placeholder="Search..."
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Search...")}
            onChange={this.handleChange}
            value={value}
          />
          <a className="search_icon">
            <i className="fa fa-search"></i>
          </a>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="table-responsive">
              <table className="table table-bordered table-hover"></table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { BorrowLendMaterialComponent };
