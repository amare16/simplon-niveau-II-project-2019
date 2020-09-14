import React, { Component } from "react";
import "./createUserProfile.css";

class CreateUserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.state = {
      content_about: "",
      content_aspiration: "",
      hobby: "",
      imageFile: null
    };
    console.log("state: ", this.state);
    this.handleContentAboutChange = this.handleContentAboutChange.bind(this);
  }

  handleContentAboutChange(contentAboutEvent) {
    this.setState({
      content_about: contentAboutEvent.target.value,
    });
  }

  handleContentAspirationChange(contentAspirationEvent) {
    this.setState({
      content_aspiration: contentAspirationEvent.target.value,
    });
  }
  handleHobbyChange(hobbyEvent) {
    this.setState({
      hobby: hobbyEvent.target.value,
    });
  }

  handleImageFileOnChange(imageFileEvent) {
    let imageFile = imageFileEvent.target.files[0];
    this.setState({ imageFile: imageFile });
  }

  handleSubmitUserProfile(event) {
    //console.log("file name: ", this.state.filename)
    event.preventDefault();
    let token = localStorage.getItem("token");
    
    let imageFile = this.state.imageFile;

    let formData = new FormData();
    
    formData.append('content_about', this.state.content_about);
    formData.append('content_aspiration', this.state.content_aspiration);
    formData.append('hobby', this.state.hobby);
    formData.append('imageFile', imageFile);
    
    
    fetch(`http://localhost:8000/api/add-user-profile`, {
      method: "post",
      headers: {
        "Authorization": `Bearer ` + token,},
      body: formData,
    })
      .then((data) => data.json())
      .then((dataJson) => {
        console.log("data json: ", dataJson);
        //this.props.history.push("/search-partner");
      });
  }

  render() {
    console.log("content about value: ", this.state.content_about)
    return (
      <section id="user-profile">
        <div class="section-content">
          <h1 class="section-header">
            <span
              class="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              Add Your Profile
            </span>
          </h1>
        </div>
        <div class="material-section">
          <div class="container">
            <form onSubmit={this.handleSubmitUserProfile.bind(this)}>
              <div className="row">
                <div class="col-md-4 form-line">
                  <div class="form-group">
                    <label for="content_about"> About me</label>
                    <textarea
                      name="content_about"
                      class="form-control"
                      id="content_about"
                      value={this.state.content_about}
                      placeholder="Enter About yourself"
                      onChange={this.handleContentAboutChange}
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-4 form-line">
                  <div class="form-group">
                    <label for="content_aspiration">Aspiration</label>
                    <textarea
                      name="content_aspiration"
                      class="form-control"
                      id="content_aspiration"
                      value={this.state.content_aspiration}
                      placeholder="Enter Your Aspiration"
                      onChange={this.handleContentAspirationChange.bind(this)}
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="hobby">Hobby</label>
                    <textarea
                      name="hobby"
                      class="form-control"
                      id="hobby"
                      value={this.state.hobby}
                      placeholder="Enter Your hobby"
                      onChange={this.handleHobbyChange.bind(this)}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="imageFile">Upload Your Picture</label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileOnChange.bind(this)}
                    />
                  </div>
                  <div className="create-button">
                    <button type="submit" className="btn btn-primary">
                      Create your profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
export { CreateUserProfileComponent };
