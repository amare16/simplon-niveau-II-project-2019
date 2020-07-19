import React, { Component } from 'react';
import "./editExperience.css";
import moment from "moment";

class EditExperienceComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            content: "",
            published_at: "" 
        }

        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handlePublishedAtChange = this.handlePublishedAtChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getExperienceDetails();
    }

    getExperienceDetails() {
        let experienceId = this.props.match.params.experienceId;
        fetch(`http://localhost:8000/api/single-experience/` + experienceId, {
            method: "GET",
            mode: "cors"
        })
        .then(res =>res.json())
        .then(resJson => {
            console.log("resJson details: ", resJson);
            this.setState({
                id: resJson.id,
                title: resJson.title,
                content: resJson.content,
                published_at: resJson.published_at
            }, () => {
                console.log(this.state);
            })
        })
        .catch(error => console.log(error))
    }

    handleTitleChange(data) {
      this.setState({
          title: data.target.value
      })
  }

  handleContentChange(even) {
    this.setState({
        content: even.target.value
    })
    console.log("test content: ", this.state.content)
  }

  handlePublishedAtChange(event) {
    console.log("event value publish: ", event.target.value)
    this.setState({
        published_at: event.target.value
    })
  }

    // handleInputChange(e) {
    //     const target = e.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     })
    // }

    editExperience(newExperience) {
        let token = localStorage.getItem('token');
        console.log("inside token: ", token)
        fetch(`http://localhost:8000/api/edit-experience/${this.props.match.params.experienceId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + token  
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            console.log("response from getDetails: ", response)
            this.props.history.push('/experiences');
        })
        .catch(err => console.error(err))
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("uuuuuuuuuu", this.props.match.params.experienceId)
        let newExperience = {
            titile: this.state.title,
            content: this.state.content,
            published_at: this.state.published_at
        };
        this.editExperience(newExperience);

    }

    render() {
        console.log("publish: ", moment(this.state.published_at).format("YYYY-MM-DD"))
        return(
            <div className="container edit-experience-container">
              <div className="row">
                <div className="col-md-12">
                <a
                  href={"/experiences"}
                  style={{
                    borderRadius: "35px",
                    fontSize: "25px",
                    textAlign: "center",
                    marginTop: "10px",
                    color: "green",
                  }}
                >
                  <p>
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <strong>Back to list of Experiences</strong>
                  </p>
                </a>
                </div>
              </div>
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h1 className="edit-experience-h1">Modify an Experience</h1>

            <form
              name="experience"
              className="form-horizontal"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <h3 className="edit-experience-h3">Title</h3>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </div>

              <div className="form-group">
                <h3 className="edit-experience-h3">Content</h3>
                <textarea
                  rows="5"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                ></textarea>
              </div>

              <div className="form-group">
                <h3 className="edit-experience-h3">Published</h3>
                <input
                  type="date"
                  className="form-control"
                  name="published_at"
                  value={this.state.published_at}
                  onChange={this.handlePublishedAtChange}
                />
              </div>

              <div className="form-group btn-toolbar">
                <button
                  type="submit"
                  className="btn btn-primary pull-left edit-experience-create"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
        )
    }
}

export { EditExperienceComponent };