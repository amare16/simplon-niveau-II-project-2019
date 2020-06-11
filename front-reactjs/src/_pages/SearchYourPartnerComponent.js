import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import SearchResults from "react-filter-search";
import { UserLogoutComponent } from './UserLogoutComponent';
//import Pagination from 'react-bootstrap/Pagination';
class SearchYourPartnerComponent extends React.Component {
  constructor(props) {
    super(props);
    

    this.state = {
      data: [],
      value: ""
      // currentPageNumber: 1,
      // totalItems: 1,
      // itemsPerPage: 5
    };
    //console.log("this state userType value: ", typeof(this.state.filters.city));

    // this.handleCityChange = this.handleCityChange.bind(this);
    // this.filterUsersByCity = this.filterUsersByCity.bind(this);
  }

  // fetch the users and its corresponding fields
  componentDidMount() {
    return fetch("http://localhost:8000/api/users", {
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
        console.log("value of response : ", response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  // handleSelect(e) {
  //   console.log('handle select', e);
  //   this.setState({ currentPageNumber: e });
  // }

  render() {
    
    // console.log("current page no: ", this.state.currentPageNumber)
    // let totalPages = Math.ceil(this.state.totalItems / this.state.numItemsPerPage);
    // console.log("total pages: ", totalPages);
    let connectedUsername = localStorage.getItem("username");
    const { data, value } = this.state;
  
    return (
      
      <div className="container-fluid user-type-list table-responsive">
        <UserLogoutComponent />
       
        <div className="d-flex justify-content-center">
       
          <div className="searchbar">
            <input
              className="search_input"
              id="input-search-id"
              type="text"
              name=""
              placeholder="Search..."
              onFocus={(e) => e.target.placeholder = ''}
              onBlur={(e) => e.target.placeholder = 'Search...'}
              onChange={this.handleChange}
              value={value}
            />
            <a className="search_icon">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>

        <SearchResults
          value={value}
          data={data}
          renderResults={results => (
            <div className="table-responsive-lg">
              <table className="table table-striped table-hover mx-auto w-50">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">City</th>
                    <th scope="col">User Type</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(result => (
                    connectedUsername != result.username ? (
                      <tr key={result.id}>
                      <td>{result.firstName}</td>
                      <td>{result.lastName}</td>
                      <td>{result.city}</td>
                                            
                      {/* <td>{el.user_type[0].name}</td> */}
                      {result.user_type.map((res, i) => (
                        <td key={i}>{res.name}</td>
                      ))}
                      
                      <td>
                        <a href={"/single-user-profile/" + result.id}  className="btn btn-sm btn-info">
                          <i className="fa fa-eye" aria-hidden="true"></i> Profile
                        </a>
                      </td>
                    </tr>
                    ) : (
                      <tr key={result.id} style={{display: 'none'}}>
                      <td>{result.firstName}</td>
                      <td>{result.lastName}</td>
                      <td>{result.city}</td>
                      {result.user_type.map((res, i) => (
                        <td key={i}>{res.name}</td>
                      ))}
                                            
                      <td>
                        <a href={"/single-user-profile/" + result.id}  className="btn btn-sm btn-info">
                          <i className="fa fa-eye" aria-hidden="true"></i> Profile
                        </a>
                      </td>
                    </tr>
                    )
                    
                  ))}
                </tbody>
              </table>
            </div>
          )}
        />

        {/* <Pagination 
          items={10}
          activePage={this.state.currentPageNumber}
          onSelect={this.handleSelect.bind(this)}
        
        /> */}
         <a href="/dashboard" style={{marginLeft: "375px"}}>
          <i className="fa fa-arrow-circle-o-left fa-3x" aria-hidden="true" style={{color: "green"}}></i>
          </a>
      </div>
      
    );
  }
}

export { SearchYourPartnerComponent };
