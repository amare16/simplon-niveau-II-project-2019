import React, { Component } from 'react';
import "./createExperience.css";
class CreateExperienceComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            published_at: ""
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handlePublishedAtChange = this.handlePublishedAtChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token')

        fetch(`http://localhost:8000/api/add-experience`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + token },
            body: JSON.stringify(this.state),       
        })
        .then(data => data.json())
        .then(dataJson => {
            this.setState({ dataJson })
            this.props.history.push("/experiences");
        })
        .catch(error => {
            console.error("error test: ",error);
          });
          console.log("body: ", this.state)
    }

    render() {
        console.log("published date: ",this.state.published_at)
        return (
          <div className="container create-experience-container">
            <div className="row">
              <div className="col-md-2"></div>
    
              <div className="col-md-8">
                <h1 className="create-experience-h1">Add an Experience</h1>
    
                <form name="experience" className="form-horizontal" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <h3 className="create-experience-h3">Title</h3>
                    <input type="text" 
                           className="form-control"
                           name="title"
                           value={this.state.title}
                           onChange={this.handleTitleChange}/>  
                  </div>
    
                  <div className="form-group">
            <h3 className="create-experience-h3">Content</h3>
                    <textarea
                      rows="5"
                      className="form-control"
                      name="content"
                      value={this.state.content}
                      onChange={this.handleContentChange}
                    ></textarea>
                  </div>
    
                  <div className="form-group">
                    <h3 className="create-experience-h3">Published</h3>
                    <input
                      type="date"
                      className="form-control"
                      name="published_at"
                      value={this.state.published_at}
                      onChange={this.handlePublishedAtChange}
                    />
                  </div>
    
                  <div className="form-group btn-toolbar">
                    <button type="submit" className="btn btn-primary pull-left create-experience-create">
                      Create
                    </button>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-secondary pull-left create-experience-back">Back</button>
                  </div>
                </form>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        );
      }
}
export { CreateExperienceComponent };