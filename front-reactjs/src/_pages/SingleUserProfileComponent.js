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
      }
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
        console.log("res json:", resJson.user.id);
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

  render() {
    console.log("user.id: ", this.state.user.id)
    return (
      <div className="container" style={{marginBottom: "50px"}}>
        <div
          className="head_title center m-y-3 wow fadeInUp"
          style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
          <h1 style={{textAlign: "center"}}>Profile</h1>
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
              <div className="single_c_text text-md-left text-xs-center" style={{ marginBottom: "30px"}}>
                <h3>
                  {this.state.user.firstName}{" "}
                  {this.state.user.lastName.toUpperCase()}
                  
                </h3>
              </div>
              <div className="row">
                <div className="col-md-12" style={{ marginBottom: "45px"}}>
                <a href={"/single-message-receive/" + this.state.user.id}  className="btn btn-sm btn-primary">
                          <i className="fa fa-paper-plane" aria-hidden="true"></i><strong>&nbsp;&nbsp;Send Message</strong>
                        </a>
                </div>
              </div>
              <div className="single_c_text text-md-left text-xs-center">
                <a href={"/search-partner"}><button className="btn btn-info">Back</button></a>
              </div>
            </div>
            <div className="col-md-6">
              
              <div className="row">
                <div className="col-md-12">
                    <h3>About Me</h3>
                    <p style={{textAlign: "justify"}}>
                      {this.state.content_about}
                    </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                    <h3>Aspirations</h3>
                    <p style={{textAlign: "justify"}}>
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
