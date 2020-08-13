import React, { Component } from "react";

class CreateUserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.state = {
      content_about: "",
      content_aspiration: "",
      hobby: "",
      created_on: "",
    };
    console.log("state: ", this.state);
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
  handleCreatedOnChange(createdOnEvent) {
    this.setState({
      created_on: createdOnEvent.target.value,
    })
  }

  handleSubmitUserProfile(event) {
    event.preventDefault();
    let token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/add-user-profile`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ` + token },
            body: JSON.stringify(this.state)
    })
    .then(data => data.json())
    .then(dataJson => {
        console.log("data json: ", dataJson);
        this.props.history.push("/e");
    })
  }

  render() {
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
                    <label for="content_about"> About</label>
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
                <div class="col-md-2">
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
                </div>
                <div class="col-md-2">
                        <div class="form-group">
                          <label for="createdOn">Created On</label>
                          <input
                            type="date"
                            name="created_on"
                            class="form-control"
                            id="created_on"
                            value={this.state.created_on}
                            onChange={this.handleCreatedOnChange.bind(this)}
                          />
                        </div>
                        <div>
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
