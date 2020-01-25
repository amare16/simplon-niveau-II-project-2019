import React, { Component } from "react";
import SearchResults from 'react-filter-search';
//import Pagination from 'react-bootstrap/Pagination';
class FarmersListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: "",
      // currentPageNumber: 1,
      // totalItems: 1,
      // itemsPerPage: 5

      
    };
    //console.log("this state userType value: ", typeof(this.state.filters.city)); 

    // this.handleCityChange = this.handleCityChange.bind(this);
    // this.filterUsersByCity = this.filterUsersByCity.bind(this);
  }

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
          result: response
        });
        console.log("what is the value of : ", response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value })
  }

  // handleSelect(e) {
  //   console.log('handle select', e);
  //   this.setState({ currentPageNumber: e });
  // }
  

  render() {
    // console.log("current page no: ", this.state.currentPageNumber)
    // let totalPages = Math.ceil(this.state.totalItems / this.state.numItemsPerPage);
    // console.log("total pages: ", totalPages);
    const { data, value } = this.state;
    return (
      <div className="container-fluid user-type-list">

        <div className="d-flex justify-content-center">
          <div className="searchbar">
            <input className="search_input" type="text" name="" placeholder="Search..." onChange={this.handleChange}
              value={value}/>
              <a className="search_icon"><i className="fa fa-search"></i></a>
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
              {results.map(el => (
                <tr key={el.id}>
                <td>{el.firstName}</td>
                <td>{el.lastName}</td>
                <td>{el.city}</td>
                <td>{el.user_type[0].name}</td>
              </tr>
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
        

        
      </div>
    );
  }
}

export { FarmersListComponent };
