import React, { Component } from "react";

class SingleUserProfileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      content_about: "",
      content_aspiration: "",
      hobby: "",
      user: {
        id: "",
        firstName: "",
        lastName: ""
      },
      id_message_sender: {
        id: "",
        username: ""
      },
      id_message_receiver: {
        id: "",
        username: ""
      },
      message: "",
      value: ""
    };
  }

  componentWillMount() {
    this.getSingleUserProfile();
  }
  getSingleUserProfile() {
    let userProfileId = this.props.match.params.userProfileId;
    fetch(`http://localhost:8000/api/single-user-profile/` + userProfileId, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(resJson => {
        console.log("res json:", resJson);
        this.setState(
          {
            id: resJson.id,
            content_about: resJson.content_about,
            content_aspiration: resJson.content_aspiration,
            hobby: resJson.hobby,
            user: resJson.user
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(error => console.log(error));
  }

  handleMessageChange(msg) {
    this.setState({
      message: msg.target.value
    });
    console.log(msg.target.value);
  }

  handleUsernameChange(event) {
    console.log("event username: ", event.target.value);
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token
      },
      body: JSON.stringify(this.state)
    })
      .then(data => data.json())
      .then(dataJson => {
        console.log("json: ", dataJson);
        this.setState({ dataJson });
      });
  }

  render() {
    let username = localStorage.getItem("username");
    console.log("username test: ", username);

    return (
      <div className="container" style={{ marginBottom: "50px" }}>
        <div
          className="head_title center m-y-3 wow fadeInUp"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          <h1 style={{ textAlign: "center" }}>Profile</h1>
        </div>

        <div className="single_profile">
          <div className="row">
            <div className="col-md-3">
              <div className="single_center_img">
                <img
                  className="img_circle"
                  src="https://previews.123rf.com/images/bsd555/bsd5551808/bsd555180801568/106558427-user-account-circle-glyph-color-icon-user-profile-picture-userpic-silhouette-symbol-on-white-backgro.jpg"
                  width="103"
                  height="103"
                />
              </div>
              <div
                className="single_c_text text-md-left text-xs-center"
                style={{ marginBottom: "30px" }}
              >
                <h3>
                  {this.state.user.firstName}{" "}
                  {this.state.user.lastName.toUpperCase()}
                </h3>
              </div>
              {/* <div className="row">
                <div className="col-md-12" style={{ marginBottom: "45px"}}>
                <a href={"/single-message-send/" + this.state.user.id}  className="btn btn-sm btn-primary">
                          <i className="fa fa-paper-plane" aria-hidden="true"></i><strong>&nbsp;&nbsp;Send Message</strong>
                        </a>
                </div>
              </div> */}
              <div className="row">
                <div
                  className="col-md-12"
                  style={{
                    marginBottom: "45px",
                    background: "linear-gradient(to left, #43cea2, #185a9d)"
                  }}
                >
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                      <select
                        className="form-control form-control-sm"
                        onChange={this.handleUsernameChange.bind(this)}
                        style={{ textTransform: "capitalize" }}
                      >
                        <option value={username}>{username}</option>
                      </select>
                      &nbsp;&nbsp;
                      <span>message to</span>&nbsp;&nbsp;
                      <select
                        className="form-control form-control-sm"
                        onChange={this.handleUsernameChange.bind(this)}
                        style={{ textTransform: "capitalize" }}
                      >
                        <option value={this.state.user.username}>
                          {this.state.user.username}
                        </option>
                      </select>
                      {/* <input
                  className="form-control"
                  type="date"
                  value={moment(this.state.send_at).format("YYYY-MM-DD HH:mm")}
                  onChange={this.handleSendAtChange.bind(this)}
                  id="example-date-input"
                /> */}
                      {/* <label htmlFor=" Email1msg">Your Message</label> */}
                      <textarea
                        className="form-control"
                        value={this.state.message}
                        onChange={this.handleMessageChange.bind(this)}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <div className="single_c_text text-md-left text-xs-center">
                <a href={"/search-partner"}>
                  <button className="btn btn-info">Back</button>
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12">
                  <h3>About Me</h3>
                  <p style={{ textAlign: "justify" }}>
                    {this.state.content_about}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h3>Aspirations</h3>
                  <p style={{ textAlign: "justify" }}>
                    {this.state.content_aspiration}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2 offset-md-1">
              <div className="row">
                <div className="col-md-12">
                  <h3>Hobby</h3>
                  <p>
                    <strong>{this.state.hobby}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { SingleUserProfileComponent };
