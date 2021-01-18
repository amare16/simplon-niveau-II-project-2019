import React, { Component } from "react";
import { NavbarComponent } from "../_components/NavbarComponent";

class ContactUsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };
  }

  onFirstNameChange(event) {
    this.setState({
      firstName: event.target.value
    });
  }

  onLastNameChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onSubjectChange(event) {
    this.setState({
      subject: event.target.value
    });
  }

  onMessageChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("reset: ", e.target.value)
    
    //console.log("handle submit value: ",this.state)
    fetch("http://localhost:8000/api/send-email", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson
        });
        console.log("what is the value of : ", responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

//   resetForm(){
    
//     this.setState({firstName: '', lastName:'', email: '', subject: '', message: ''})
//     console.log("reset")
//  }

  render() {
    return (
      <div>
        <NavbarComponent />

        <div className="container contact-container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-xs-12">
              <form
                id="contact-form"
                onSubmit={this.handleSubmit.bind(this)}
                method="POST"
              >
                <div className="card round-0='true'">
                  <div className="card-header p-0">
                    <div className="text-white text-center py-y" style={{height: "55px", backgroundColor: "rgb(80 83 100)"}}>
                      <h3 style={{margin: "0", transform: "translateY(20%)"}}>
                        <i className="fa fa-envelope"></i> Contact
                      </h3>
                    </div>
                  </div>
                  <div className="card-body p-3" style={{backgroundColor: "#57235c"}}>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user text-info"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="firstName"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-user text-info"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="FirstName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-envelope text-info"></i>
                        </div>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="fa fa-comments-o"></i>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={this.state.subject}
                        onChange={this.onSubjectChange.bind(this)}
                        required
                      />
                    </div>
                    <div className="input-group mb-2">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <i className="fa fa-comment text-info"></i>
                          </div>
                        </div>
                        <textarea
                          className="form-control"
                          placeholder="Write your message here!"
                          value={this.state.message}
                          onChange={this.onMessageChange.bind(this)}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-center">
                      <input
                        type="submit"
                        className="btn btn-info"
                        btn-block="true"
                        round-0="true"
                        py-2="true"
                        value="Submit"
                      />
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { ContactUsComponent };
