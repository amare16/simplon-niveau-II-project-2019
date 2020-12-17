import React, { Component } from "react";
import moment from "moment";

class EditArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      content: "",
      imageFile: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  getArticleDetails() {
    let articleId = this.props.match.params.articleId;
    fetch(`http://localhost:8000/api/single-article/` + articleId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("resJson details", resJson);
        this.setState(
          {
            id: resJson.id,
            title: resJson.title,
            content: resJson.content,
            imageFile: resJson.imageFile,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  handleTitleChange(data) {
    this.setState({
      title: data.target.value,
    });
  }

  handleContentChange(even) {
    this.setState({
      content: even.target.value,
    });
    console.log("test content: ", this.state.content);
  }

  handleImageFileArticleOnChange(imageArticleEvent) {
    let imageFile = imageArticleEvent.target.files[0];
    this.setState({ imageFile: imageFile });
  }


  cancelEditArticle = () => {
    window.history.back();
  };

  // handleInputChange(e) {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  editArticle(newArticle) {
    let token = localStorage.getItem("token");
    console.log("inside token: ", token);

    let title = this.state.title;
    let content = this.state.content;
    let imageFile = this.state.imageFile;
    let formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageFile", imageFile);

    console.log("form data: ", formData);

    fetch(
      `http://localhost:8000/api/edit-article/${this.props.match.params.articleId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ` + token,
        },
        body: formData,
      }
    )
      .then((response) => {
        console.log("response from getDetails: ", response);
        this.props.history.push("/articles");
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("uuuuuuuuuu", this.props.match.params.articleId);
    let newArticle = {
      title: this.state.title,
      content: this.state.content,
      imageFile: this.state.imageFile
    };
    this.editArticle(newArticle);
  }

  render() {
    return (
      <div className="container edit-article-container">
        <div className="row">
          <div className="col-md-12">
            <a
              href={"/articles"}
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
                <strong>Back to list of Articles</strong>
              </p>
            </a>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "50px" }}>
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

              <div class="form-group">
                    <label for="imageFile"><h3>Update Your Picture</h3></label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileArticleOnChange.bind(this)}
                    />
                  </div>

              <div className="form-group btn-toolbar">
                <button
                  type="submit"
                  className="btn btn-primary pull-left edit-article-create"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={this.cancelEditArticle.bind(this)}
                >
                  Cancel
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
