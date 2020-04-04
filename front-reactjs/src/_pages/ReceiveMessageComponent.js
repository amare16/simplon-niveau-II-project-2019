import React, { Component } from "react";
import { UserLogoutComponent } from "./UserLogoutComponent";
import moment from "moment";

class ReceiveMessageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: "",
          id_message_sender: 
            {
              id: "",
              firstName: ""
            }
          ,
          id_message_receiver:
            {
              id: "",
              firstName: ""
            }
          ,
          message: ""
        }
      ]
    };
    

  }

  componentDidMount() {
    return fetch("http://localhost:8000/api/messages", {
      method: "GET",
      mode: "no-cors"
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("what is the value of : ", responseJson);
        this.setState({
          items: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
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
        console.log("json: ", dataJson);
        this.setState({ dataJson });
      });
  }
  render() {
   
    let messageId = this.props.match.params.messageId;
    console.log("id route: ", messageId)
    return (
      <div>
        <UserLogoutComponent />
        {/* <div>
          {this.state.items.map(item => {
            console.log("oslslsls: ", item)
          })}
        </div> */}
        

        <div className="row" style={{ marginBottom: "75px" }}>
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <h5>
                  <strong>...message to ...</strong>
                </h5>
                {/* <input
                  className="form-control"
                  type="date"
                  value={moment(this.state.send_at).format("YYYY-MM-DD HH:mm")}
                  onChange={this.handleSendAtChange.bind(this)}
                  id="example-date-input"
                /> */}
                <label htmlFor=" Email1msg">Your Message</label>
                <textarea
                  className="form-control"
                  value={this.state.message}
                  onChange={this.handleMessageChange.bind(this)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-info">
                Send Your Message
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-secondary receive-message-back"
                onClick={() => this.props.history.goBack()}
              >
                Back
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
