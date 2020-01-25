import React, { Component } from 'react';

class EditArticleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            "title": "",
            "content": "",
            "publishedAt": Date,
            
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
  }

  handleSubmit(e, articleId) {
      e.preventDefault();
      let createData = {
          title: this.state.title,
          content: this.state.content,
          publishedAt: this.state.publishedAt
      }
      
      fetch('http://localhost:8000/api/edit-article/' + articleId, {
          method: 'PUT',
          mode: 'cors',
          
      }).then(res => res.json())
      .catch(err => err);
  }

    render() {
        return (
            <div className="container edit-article-container">
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h1 className="edit-article-h1">Modify an Article</h1>

            <form name="article" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3 className="edit-article-h3">Title</h3>
                <input type="text" 
                       className="form-control"
                       name="title"
                       value={this.state.title}
                       onChange={this.handleTitleChange}
                       />  
              </div>

              <div className="form-group">
                <h3 className="edit-article-h3">Content</h3>
                <textarea
                  rows="5"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                ></textarea>
              </div>

              <div className="form-group">
                <h3 className="edit-article-h3">Published on</h3>
                <input
                  type="date"
                  className="form-control"
                  name="publishedAt"
                  value={this.state.value}
                  onChange={this.handlePublishedAtChange}
                />
              </div>

              <div className="form-group btn-toolbar">
                <button type="submit" className="btn btn-primary pull-left edit-article-create">
                  Edit
                </button>
                <button className="btn btn-danger pull-left edit-article-cancel">Cancel</button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
          ); 
    }
}

export { EditArticleComponent }