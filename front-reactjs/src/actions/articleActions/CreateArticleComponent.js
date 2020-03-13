import React, { Component } from "react";

class CreateArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        content: "",
        published_at: ""

        
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
      e.target.reset();
      let token = localStorage.getItem('token')

      console.log('state submit :', this.state);


      fetch(`http://localhost:8000/api/add-article`, {method: "POST",headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ` + token },body: JSON.stringify(this.state),  
        }).then(data => data.json())
        .then(dataJson => {
            //console.log("This article is successfully Inserted ", dataJson);
            this.setState({ dataJson })
            this.props.history.push("/articles");
        })
        .catch(error => {
          console.error("error test: ",error);
        });
        
  }

  

  render() {
    console.log("published date: ",this.state.published_at)
    return (
      <div className="container create-article-container">
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h1 className="create-article-h1">Add an Article</h1>

            <form name="article" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3 className="create-article-h3">Title</h3>
                <input type="text" 
                       className="form-control"
                       name="title"
                       value={this.state.title}
                       onChange={this.handleTitleChange}/>  
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
                <h3 className="create-article-h3">Published</h3>
                <input
                  type="date"
                  className="form-control"
                  name="published_at"
                  value={this.state.published_at}
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
