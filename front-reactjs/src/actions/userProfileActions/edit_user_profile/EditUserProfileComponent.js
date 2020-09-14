import React, { Component } from "react";

class EditUserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.state = {
      id: "",
      content_about: "",
      content_aspiration: "",
      hobby: "",
      imageFile: null,
    };
    console.log("state: ", this.state);
  }

  componentWillMount() {
    this.getSingleUserProfile();
  }

  getSingleUserProfile() {
    let userProfileId = this.props.match.params.userProfileId;
    console.log("userProfileId: ", userProfileId);
    fetch(`http://localhost:8000/api/single-user-profile/` + userProfileId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("res json:", resJson);
        this.setState(
          {
            id: resJson.id,
            content_about: resJson.content_about,
            content_aspiration: resJson.content_aspiration,
            hobby: resJson.hobby,
            created_on: resJson.created_on,
            user: resJson.user,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
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

  cancelEditUserProfile = () => {
    window.history.back();
  };

  editUserProfile(newUserProfile) {
    let token = localStorage.getItem("token");
    console.log("inside token: ", token);

    let content_about = this.state.content_about;
    let content_aspiration = this.state.content_aspiration;
    let hobby = this.state.hobby;
    let imageFile = this.state.imageFile;
    let formData = new FormData();

    formData.append("content_about", content_about);
    formData.append("content_aspiration", content_aspiration);
    formData.append("hobby", hobby);
    formData.append("imageFile", imageFile);

    console.log("form data: ", formData);
    fetch(
      `http://localhost:8000/api/edit-user-profile/${this.props.match.params.userProfileId}`,
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
        this.props.history.push("/single-user-profile/" + this.state.id);
      })
      .catch((err) => console.log(err));
  }

  handleSubmitAfterEditUserProfile(e) {
    e.preventDefault();

    //console.log("uuuuuuuuuu", this.props.match.params.userProfileId)

    let newUserProfile = {
      content_about: this.state.content_about,
      content_aspiration: this.state.content_aspiration,
      hobby: this.state.hobby,
      created_on: this.state.created_on,
    };
    this.editUserProfile(newUserProfile);
  }

  render() {
    console.log("push id: ", this.state.id);
    return (
      <section id="material">
        <div class="section-content">
          <h1 class="section-header">
            <span
              class="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              Edit Your Profile
            </span>
          </h1>
        </div>
        <div class="material-section">
          <div class="container">
            <form onSubmit={this.handleSubmitAfterEditUserProfile.bind(this)}>
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
                      onChange={this.handleContentAboutChange.bind(this)}
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
                    <label for="imageFile">Update Your Picture</label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileOnChange.bind(this)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={this.cancelEditUserProfile.bind(this)}
                    >
                      Cancel
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
export { EditUserProfileComponent };
