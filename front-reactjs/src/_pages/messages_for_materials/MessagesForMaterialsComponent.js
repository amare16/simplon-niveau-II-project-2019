import React from "react";
import "./messagesForMaterials.css";
import * as moment from "moment";

class MessagesForMaterialsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        borrowMaterials: [
          {
            id: "",
            start_date: "",
            end_date: "",
            material: {
              id: "",
              name: "",
              availability: Boolean(),
            },
          },
        ],
        lendMaterials: [
          {
            id: "",
            start_date: "",
            end_date: "",
            material: {
              id: "",
              name: "",
              availability: Boolean(),
            },
          },
        ],
      },
      items: [
        {
          senderMessageId: {
            username: "",
          },
          receiverMessageId: {
            username: "",
          },
          message: "",
        },
      ],
      listBorrowerMessages: [
        {
          id: "",
          message: "",
          send_at: "",
          senderMessageId: {
              id: "",
              firstName: "",
              lastName: "",
              username: "",
              email: ""
          },
          receiverMessageId: {
              id: "",
              firstName: "",
              lastName: "",
              username: "",
              email: ""
          },
          user: {
            id: "",
            firstName: "",
            lastName: "",
            username: "",
            email: ""
          }
      }
      ],
      dataJson: {}
    };
    
    this.token = localStorage.getItem("token");
    
    this.usernameStored = localStorage.getItem("username");
    this.connectedUser = this.token && this.usernameStored;
    this.pathname = window.location.pathname;
    this.urlId = this.pathname.split("/")[2];

    console.log("this.url Id value: ", this.urlId);
    //console.log("this.connected user: ", this.connectedUser);
    console.log("page owner username", this.state.user.username);
    console.log(
      "borrower message",
      this.state.items.map((it) => it.senderMessageId.username)
    );
  }

  componentDidMount() {
    this.getAllUsers();
    this.getSingleUserProfile();
    this.getMessageHere();
    
  }
  
 getAllUsers() {
  fetch(`http://localhost:8000/api/user-profile`, {
    method: "GET",
    mode: "cors",
  })
    .then((data) => data.json())
    .then((dataResponse) => {
      console.log("data response result: ", dataResponse);
      this.setState({ dataJson: dataResponse})
      
    })
    .catch(error => {
      console.error("Display the: ", error);
    });
}

  getMessageHere() {
    fetch(`http://localhost:8000/api/material-borrower-messages`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response result: ", response);
        this.setState({
          listBorrowerMessages: response,
        });
      })
      .catch(error => {
        console.error("Not fetched well! ", error);
      });
  }

  getSingleUserProfile() {
    let userProfileId = this.props.match.params.userProfileId;
    //console.log("userProfileId value: ", userProfileId);
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
            user: resJson.user,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  handleSenderMessageChange(senderMsg) {
    this.setState({
      senderMessageId: senderMsg.target.value,
    });
  }

  handleReceiverMessageChange(receiverMsg) {
    this.setState({
      receiverMessageId: receiverMsg.target.value,
    });
  }

  handleMessageChange(msg) {
    this.setState({
      message: msg.target.value,
    });
    console.log("message test: ", msg.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });
    let body = {
      senderMessageId: {
        username: this.state.senderMessageId,
      },
      receiverMessageId: {
        username: this.state.receiverMessageId,
      },
      message: this.state.message,
    };
    console.log("handle submit body: ", body);

    let token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/add-material-borrower-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((dataJson) => {
        console.log("json: ", dataJson);
        this.setState({ dataJson });
        setInterval(this.getMessageHere(), 100);
      })
      .catch((error) => {
        console.error("The data is not inserted: ", error);
      });
  }

  render() {
    console.log("value of sender username: ", this.state.senderMessageId);
    console.log("value of receiver username: ", this.state.receiverMessageId);
    console.log("this.connected user: ", this.connectedUser);
    const testSenderUsername = this.state.senderMessageId === this.connectedUser;
    console.log("test sender username: ", testSenderUsername);

    this.state.senderMessageId = this.connectedUser;
    this.state.receiverMessageId = this.state.user.username;

    let buttonActive = (
      <button type="submit" className="btn btn-primary">
        Send Message
      </button>
    );
    let buttonDisabled = (
      <button type="submit" className="btn btn-primary" disabled={true}>
        Send Message
      </button>
    );

    return (
      <div class="container">
        <div class="row title">
          <div className="col-md-12 title-col">
            
            <a
                  href={"/borrow-lend-materials"}
                  style={{ borderRadius: "35px", fontSize: "25px", color: "green", textAlign: "center"}}
                >
                  <p>
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <strong>Click here to see list of Materials</strong>
                  </p>
                </a>
          </div>
        </div>
        <div class="row title">
          <div className="col-md-12 title-col">
            <h2>Messaging</h2>
          </div>
        </div>
        <div class="row chat-board">
          <div className="col-md-2 user-list">
            <p className="user-profile-username">{this.state.user.username}</p>
          </div>
          <div className="col-md-10 message">
            {
              this.connectedUser && this.state.user.username ?
              this.state.listBorrowerMessages.map(listMsg => {
                if((listMsg.senderMessageId['username'] == this.connectedUser) && (listMsg.receiverMessageId["username"] == this.state.user.username)) {
                  return <div>
                      <p className="send-message">{listMsg.message}<br /><span style={{float: 'right'}}>{moment(listMsg.send_at).format("YYYY-MM-DD, HH:mm:ss")}</span></p>
                      <br /><br />
                    </div>
                }

                if((listMsg.senderMessageId["username"] == this.state.user.username) && (listMsg.receiverMessageId['username'] == this.connectedUser) ) {
                  return <div>
                      <p className="receive-message">{listMsg.message}<br /><span style={{float: 'right'}}>{moment(listMsg.send_at).format("YYYY-MM-DD, HH:mm:ss")}</span></p><br />
                    </div>
                } else {
                  return <p style={{display: 'none'}}>{listMsg.message}</p>
                }
                }): null
              
            }
            
            
              {
                this.state.receiverMessageId != this.connectedUser ? (
                  <form id="chat-room-form" onSubmit={this.handleSubmit.bind(this)}>
                  <div class="form-group">
                <textarea
                  class="form-control"
                  name="msg"
                  id="msg"
                  placeholder="Enter Message"
                  value={this.state.message}
                  onChange={this.handleMessageChange.bind(this)}
                ></textarea>
              </div>
              <div class="form-group" style={{display: "none" }}>
                <input
                  type="text"
                  value={this.state.senderMessageId}
                  placeholder="Sender Username"
                  className="form-control"
                  id="senderUsername"
                  name="senderUsername"
                  onChange={this.handleSenderMessageChange.bind(this)}
                  required
                />
                <input
                  type="text"
                  value={this.state.receiverMessageId}
                  placeholder="Receiver Username"
                  className="form-control"
                  id="receiverUsername"
                  name="receiverUsername"
                  onChange={this.handleReceiverMessageChange.bind(this)}
                  required
                />
              </div>
             
              <div className="form-group">
                {buttonActive}
              </div>
              </form>
                ) : (
                  <form id="chat-room-form" onSubmit={this.handleSubmit.bind(this)}>
                  <div class="form-group">
                <textarea
                  class="form-control"
                  name="msg"
                  id="msg"
                  placeholder="Enter Message"
                  value={this.state.message}
                  onChange={this.handleMessageChange.bind(this)}
                  disabled={true}
                ></textarea>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  value={this.state.senderMessageId}
                  placeholder="Sender Username"
                  className="form-control"
                  id="senderUsername"
                  name="senderUsername"
                  onChange={this.handleSenderMessageChange.bind(this)}
                  required
                  disabled={true}
                />
                <input
                  type="text"
                  value={this.state.receiverMessageId}
                  placeholder="Receiver Username"
                  className="form-control"
                  id="receiverUsername"
                  name="receiverUsername"
                  onChange={this.handleReceiverMessageChange.bind(this)}
                  required
                  disabled={true}
                  
                />
              </div>
             
              <div className="form-group">
                {buttonDisabled}
              </div>
              </form>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}
export { MessagesForMaterialsComponent };
