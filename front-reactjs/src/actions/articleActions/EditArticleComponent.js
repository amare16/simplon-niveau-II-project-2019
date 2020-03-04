import React, { Component } from "react";

class EditArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      content: "",
      published_at: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  getArticleDetails() {
    let articleId = this.props.match.params.articleId;
    fetch(`http://localhost:8000/api/single-article/` + articleId,{
      method: "GET",
      mode: "cors"
    })
    .then(res => res.json())
    .then(resJson => {
      console.log("resJson details", resJson)
      this.setState({
        id: resJson.id,
        title: resJson.title,
        content: resJson.content,
        published_at: resJson.published_at
      }, () => {
          console.log(this.state);
      });
    })
    .catch(error => console.log(error))
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  editArticle(newArticle) {
    let token = localStorage.getItem('token');
    console.log("inside token: ", token)
    fetch(`http://localhost:8000/api/edit-article/${this.props.match.params.articleId}`, {
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
      this.props.history.push('/articles');
    })
    .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("uuuuuuuuuu", this.props.match.params.articleId)
    let newArticle = {
      title: this.state.title,
      content: this.state.content,
      published_at: this.state.published_at
    };
    this.editArticle(newArticle);
  
  }

  render() {
    return (
      <div className="container edit-article-container">
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h1 className="edit-article-h1">Modify an Article</h1>

            <form
              name="article"
              className="form-horizontal"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <h3 className="edit-article-h3">Title</h3>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group">
                <h3 className="edit-article-h3">Content</h3>
                <textarea
                  rows="5"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>

              <div className="form-group">
                <h3 className="edit-article-h3">Published</h3>
                <input
                  type="date"
                  className="form-control"
                  name="published_at"
                  value={this.state.published_at}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group btn-toolbar">
                <button
                  type="submit"
                  className="btn btn-primary pull-left edit-article-create"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    );
  }
}

export { EditArticleComponent };
