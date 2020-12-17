import React, { Component } from "react";

class CreateArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        content: "",
        imageFile: null
    }
  

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
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

  handleImageFileArticleOnChange(imageFileCreateEvent) {
    let imageFile = imageFileCreateEvent.target.files[0];
    this.setState({ imageFile: imageFile });
  }

  handleSubmit(e) {
      e.preventDefault();
      e.target.reset();
      let token = localStorage.getItem('token');

    let formData = new FormData();
    
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    formData.append('imageFile', this.state.imageFile);

      fetch(`http://localhost:8000/api/add-article`, {
            method: "POST",
            headers: {
            "Authorization": `Bearer ` + token },
            body: formData,  
          
        }).then(data => data.json())
        .then(dataJson => {
            //console.log("This article is successfully Inserted ", dataJson);
            this.setState({ dataJson })
            this.props.history.push("/articles");
        })
        .catch(error => {
          console.error("error test: ",error);
        });
        console.log("body: ", this.state)
        
  }

  

  render() {
    console.log("published date: ",this.state.published_at)
    return (
      <div className="container create-article-container">
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
                       onChange={this.handleTitleChange}
                       required
                />  
                       
              </div>

              <div className="form-group">
        <h3 className="create-article-h3">Content</h3>
                <textarea
                  rows="5"
                  className="form-control"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleContentChange}
                  required
                ></textarea>
              </div>

              <div class="form-group">
                    <label for="imageFile"><h3>Upload Your Picture</h3></label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileArticleOnChange.bind(this)}
                    />
                  </div>

              <div className="form-group btn-toolbar">
                <button type="submit" className="btn btn-primary pull-left create-article-create">
                  Create
                </button>&nbsp;&nbsp;&nbsp;
                
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
