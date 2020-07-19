import React, { Component } from 'react';
import { UserLogoutComponent } from "../UserLogoutComponent";
import { NavbarComponent } from '../../_components/NavbarComponent';
import moment from 'moment';

class ExperiencesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    title: "",
                    content: "",
                    published_at: "",
                    user: {
                        firstName: ""
                    }
                }
            ]
        }
        console.log(this.state)
    }

    componentDidMount() {
        return fetch(`http://localhost:8000/api/experiences`, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(resJson => {
            console.log("res json: ", resJson)
            this.setState({
                items: resJson
            });
        })
        .catch(error => {
            console.error(error);
        })
    }

    showExperiencesAfterDelete() {
      setTimeout(() => {
        fetch(`http://localhost:8000/api/experiences`, {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(resJson => {
            console.log("res json: ", resJson)
            this.setState({
                items: resJson
            });
        })
        .catch(error => {
            console.error(error);
        })
      }, 500)
    }

    deleteExperience(e, id) {
      if(window.confirm("Are you sure to delete this experience?")) {
        console.log("id experience:", id);
        let token = localStorage.getItem("token");
        fetch(`http://localhost:8000/api/delete-experience/` + id, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ` + token
          }
        })
        .then(res => {
          console.log("result: ", res)
          this.setState({res})
          this.showExperiencesAfterDelete();
        })
        .catch(err => {
          console.error(err);
        })
      }
    }
    

    render() {
        const thStyle = {
            textAlign: "center"
          };

        return(
            <div>
                <UserLogoutComponent />
                <NavbarComponent />
                
                <div className="container table-responsive" style={{ marginBottom: "60px"}}>
          <h1>List of Experiences</h1>
          
          <a href="/add-experience">
            <i
              className="add-experience-icon fa fa-plus-circle fa-3x"
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
                <th scope="col">Published</th>
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
                        <a href={"/show-experience/" + item.id}  className="btn btn-sm btn-info">
                          <i className="fa fa-eye" aria-hidden="true"></i> Show
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href={"/edit-experience/" + item.id}
                          className="btn btn-sm btn-warning"
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i> Edit
                        </a>
                        &nbsp;&nbsp;
                        <a
                          className="btn btn-sm btn-danger"
                          style={{cursor: "pointer"}}
                          onClick={(e) => this.deleteExperience(e, item.id)}
                        >
                          <i className="fa fa-delete" aria-hidden="true"></i>{" "}
                          Delete
                        </a>
                                                
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

export { ExperiencesComponent };