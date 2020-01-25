import React, { Component } from "react";

class CreateArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        content: "",
        published_at: Date,
        
        
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePublishedAtChange = this.handlePublishedAtChange.bind(this);
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
  }

  handlePublishedAtChange(event) {
    this.setState({
        publishedAt: event.target.value
    })
    console.log("test date: ", this.state.publishedAt);
    
  }

  handleSubmit(e) {
      e.preventDefault();
      let createData = {
          title: this.state.title,
          content: this.state.content,
          published_at: this.state.published_at
      }
      
      fetch(`http://localhost:8000/api/add-article`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(createData)
        }).then(data => {
          data.json().then(results => {
            console.log("This article is successfully Inserted ", results);
          });
        });
  }

  render() {
    return (
      <div className="container create-article-container">
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h1 className="create-article-h1">Add an</h1>

            <form name="article" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3 className="create-article-h3">Title</h3>
                <input type="text" 
                       className="form-control"
                       name="title"
                       value={this.state.title}
                       onChange={this.handleTitleChange} />  
              </div>

              <div className="form-group">
                <h3 className="create-article-h3">Content</h3>
                <textarea
                  rows="5"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                ></textarea>
              </div>

              <div className="form-group">
                <h3 className="create-article-h3">Published on</h3>
                <input
                  type="date"
                  className="form-control"
                  name="publishedAt"
                  value={this.state.value}
                  onChange={this.handlePublishedAtChange}
                />
              </div>

              <div className="form-group btn-toolbar">
                <button type="submit" className="btn btn-primary pull-left create-article-create">
                  Create
                </button>&nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger pull-left create-article-cancel">Cancel</button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}

export { CreateArticleComponent };
