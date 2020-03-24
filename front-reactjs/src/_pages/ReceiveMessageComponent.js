import React, { Component } from "react";
import { UserLogoutComponent } from "./UserLogoutComponent";
import moment from "moment";

class ReceiveMessageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_message_sender: {
        id: ""
      },
      id_message_receiver: {
        id: ""
      },
      message: "",
      send_at: ""
    };
  }

  handleMessageChange(msg) {
    this.setState({
      message: msg.target.value
    });
    console.log(msg.target.value);
  }
  handleSendAtChange(event) {
    this.setState({
      send_at: event.target.value
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
      console.log("json: ", dataJson)
      this.setState({ dataJson })
    })
  }
  render() {
    console.log(moment(this.state.send_at).format('YYYY-MM-DD HH:mm'))
    return (
      <div>
        <UserLogoutComponent />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div class="form-group">
                <h5>
    <strong>...message to ...</strong>
                </h5>
                <input
                  class="form-control"
                  type="date"
                  value={moment(this.state.send_at).format("YYYY-MM-DD HH:mm")}
                  onChange={this.handleSendAtChange.bind(this)}
                  id="example-date-input"
                />
                <label for=" Email1msg">Your Message</label>
                <textarea
                  class="form-control"
                  value={this.state.message}
                  onChange={this.handleMessageChange.bind(this)}
                ></textarea>
              </div>
              <button type="submit" class="btn btn-info">
                Send Your Message
              </button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}
export { ReceiveMessageComponent };
