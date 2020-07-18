import React from "react";
import { UserLogoutComponent } from "../UserLogoutComponent";
import "./singleUserProfile.css";
import * as moment from "moment";

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
        lastName: "",
        username: "",
        userMessageSender: [
          {
            id: "",
            message: "",
            send_at: "",
          },
        ],
        userMessageReceiver: [
          {
            id: "",
            message: "",
            send_at: "",
          },
        ],
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
          id_message_sender: {
            username: "",
          },
          id_message_receiver: {
            username: "",
          },
          message: "",
        },
      ],
      userData: [
        {
          id: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          userProfile: {
            id: "",
          },
        },
      ],

      show: false,
      showReceiver: false,
      showSendAndReceive: false,
    };

    console.log("type of sender: ", this.state.items);
  }

  componentDidMount() {
    this.getUsers();
    this.getSingleUserProfile();
    this.getMessageHere();
  }

  getUsers() {
    fetch("http://localhost:8000/api/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          userData: response,
        });
        console.log("user results : ", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getMessageHere() {
    fetch(`http://localhost:8000/api/messages`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response result: ", response);
        this.setState({
          items: response,
        });
      });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  showModalReceiver = () => {
    this.setState({ showReceiver: true });
  };

  hideModalReceiver = () => {
    this.setState({ showReceiver: false });
  };

  showModalSendAndReceiveMessage = () => {
    this.setState({ showSendAndReceive: true });
  };

  hideModalSendAndReceiveMessage = () => {
    this.setState({ showSendAndReceive: false });
  };

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
            user: resJson.user,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  handleMessageSenderChange(sender_username) {
    this.setState({
      id_message_sender: sender_username.target.value,
    });
    console.log("sender test", sender_username.target.value);
  }

  handleMessageReceiverChange(receiver_username) {
    this.setState({
      id_message_receiver: receiver_username.target.value,
    });
    console.log("receive test", receiver_username.target.value);
  }

  handleMessageChange(msg) {
    this.setState({
      message: msg.target.value,
    });
    console.log("message test: ", msg.target.value);
  }

  handleUsernameChange(event) {
    console.log("event username: ", event.target.value);
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(e) {
    //e.preventDefault();
    e.target.reset();
    this.setState({ message: "" });

    let body = {
      id_message_sender: {
        username: this.state.id_message_sender,
      },
      id_message_receiver: {
        username: this.state.id_message_receiver,
      },
      message: this.state.message,
    };

    let token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/send-message`, {
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
      })
      .catch((error) => {
        console.error("The data is not inserted: ", error);
      });
    console.log("body: ", body);
  }

  render() {
    console.log("items value: ", this.state.items)
    let usernameSender = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    const connectedUser = token && usernameSender;

    const sender = this.state.id_message_sender === usernameSender;
    console.log("sender variable: ", sender);
    const receiver =
      this.state.id_message_receiver === this.state.user.username;

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
    const usernameUser = usernameSender === this.state.user.username;
    console.log("usernameUser: ", usernameUser);

    this.state.id_message_sender = connectedUser;
    this.state.id_message_receiver = this.state.user.username;

    let buttonMessages = (
      <div className="row">
        <div className="col-md-12">
          <h3>Messages</h3>
          <button
            type="button"
            class="btn btn-primary btn-send"
            style={{ marginBottom: "10px", marginRight: "10px" }}
            onClick={this.showModal}
          >
            Send Messages
          </button>
          <button
            type="button"
            class="btn btn-success btn-receive"
            onClick={this.showModalReceiver}
          >
            Inbox
          </button>

          <ModalMessagesSentByConnectedUser show={this.state.show} handleClose={this.hideModal}>
            {console.log("user sender: ", this.state.user)}
            {/* {this.state.user.userMessageSender.map(msgSender => {
                console.log("msg sender: ", msgSender)
            })} */}

            <div class="container" id="messageSent">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      <strong>Sent Messages</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.userMessageSender.map((msgSender) => {
                    console.log("msg sender: ", msgSender);
                    return (
                      <tr>
                        {<td>
                          <span style={{ float: "right" }}>
                            {moment(msgSender.send_at).format(
                              "YYYY-MM-DD, hh:mm:ss"
                            )}
                          </span>
                          <br />
                          {console.log("user name that: ", connectedUser)}
                          {msgSender.message}
                        </td> ? (
                          <td>
                            <span style={{ float: "right" }}>
                              {moment(msgSender.send_at).format(
                                "YYYY-MM-DD, hh:mm:ss"
                              )}
                            </span>
                            <br />
                            {msgSender.message}
                          </td>
                        ) : (
                          <td>
                            <span style={{ float: "right" }}>
                              {moment(msgSender.send_at).format(
                                "YYYY-MM-DD, hh:mm:ss"
                              )}
                            </span>
                            <br />
                            {msgSender.message}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ModalMessagesSentByConnectedUser>
          <ModalMessagesReceivedByConnectedUser
            showReceiver={this.state.showReceiver}
            handleCloseReceiver={this.hideModalReceiver}
          >
            {/* {this.state.user.userMessageReceiver.map(msgReceiver => {
                console.log("msg receiver: ", msgReceiver.message)
            })} */}
            <div class="container" id="messageReceived">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>
                      <strong>Received Messages</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.user.userMessageReceiver.map((msgReceiver) => {
                    return (
                      <tr>
                        <td>
                          <span style={{ float: "right" }}>
                            {moment(msgReceiver.send_at).format(
                              "YYYY-MM-DD, hh:mm:ss"
                            )}
                          </span>
                          <br />
                          {/* {
                            this.state.items.map(it => {
                              // if (it.id_message_sender["username"] == it.user.username) {
                              //   console.log("value of username test: ", it.message)
                              // }
                              //console.log("value of username test: ", it.user['username'])
                              if (it.id == 4) {
                              return (<p>{it.id_message_sender["username"]}</p>)
                              }
                               
                            })
                          } */}
                          From <span style={{color: "red", fontWeight: 'bold'}}>Username</span>
                          {" " }{msgReceiver.message}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </ModalMessagesReceivedByConnectedUser>
        </div>
      </div>
    );

    let buttonModalSendAndReceiveMessage = (
      <div>
       
        {
          connectedUser == this.state.user.username ? (
            <button
          type="button"
          class="btn btn-warning btn-pulsate"
          style={{ marginBottom: "10px", marginRight: "10px", display: "none"}}
          onClick={this.showModalSendAndReceiveMessage}
        >
          <span style={{fontSize: "16px", fontWeight: 'bold'}}>Send Message</span> <br /> to <br /> <span style={{fontWeight: 'bold', fontSize: "16px", color: 'black'}}>{this.state.user.username.charAt(0).toUpperCase() + this.state.user.username.slice(1)}</span>
        </button>
          ) : (
            <button
          type="button"
          class="btn btn-warning btn-pulsate"
          style={{ marginBottom: "10px", marginRight: "10px" }}
          onClick={this.showModalSendAndReceiveMessage}
        >
          <span style={{fontSize: "16px", fontWeight: 'bold'}}>Send Message</span> <br /> to <br /> <span style={{fontWeight: 'bold', fontSize: "16px", color: 'white'}}>{this.state.user.username.charAt(0).toUpperCase() + this.state.user.username.slice(1)}</span>
        </button>
          )
        }
        

        <ModalSendAndReceiveMessagesChatBoard
          showSendAndReceive={this.state.showSendAndReceive}
          handleCloseModalSendAndReceiveMessage={this.hideModalSendAndReceiveMessage}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a
                  href={"/search-partner"}
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
                    <strong>Click here to see list of Partner</strong>
                  </p>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h2>Messaging</h2>
              </div>
            </div>
            <div className="row chat-board-search-partner">
              <div className="col-md-2 userprofile-username">
                <p className="user-profile-username">
                  {this.state.user.username}
                </p>
              </div>
              <div className="col-md-10 message-list">
                {connectedUser && this.state.user.username
                  ? this.state.items.map((item) => {
                      if (
                        item.id_message_sender["username"] == connectedUser &&
                        item.id_message_receiver["username"] ==
                          this.state.user.username
                      ) {
                        return (
                          <div>
                            <p className="send-message">
                              {item.message}
                              <br />
                              <span style={{ float: "right" }}>
                                {moment(item.send_at).format(
                                  "YYYY-MM-DD, HH:mm:ss"
                                )}
                              </span>
                            </p>
                            <br />
                          </div>
                        );
                      }

                      if (
                        item.id_message_sender["username"] ==
                          this.state.user.username &&
                        item.id_message_receiver["username"] == connectedUser
                      ) {
                        return (
                          <div>
                            <p className="receive-message">
                              {item.message}
                              <br />
                              <span style={{ float: "right" }}>
                                {moment(item.send_at).format(
                                  "YYYY-MM-DD, HH:mm:ss"
                                )}
                              </span>
                            </p>
                            <br />
                          </div>
                        );
                      } else {
                        return (
                          <p style={{ display: "none" }}>{item.message}</p>
                        );
                      }
                    })
                  : null}

                {connectedUser && this.state.user.username ? (
                  <form
                    id="chat-room-form"
                    onSubmit={this.handleSubmit.bind(this)}
                  >
                    <div class="form-group align-bottom">
                      <textarea
                        class="form-control"
                        name="msg"
                        id="msg"
                        placeholder="Enter Message"
                        value={this.state.message}
                        onChange={this.handleMessageChange.bind(this)}
                        required
                      ></textarea>
                    </div>
                    <div class="form-group"  style={{display: "none" }}>
                      <input
                        type="text"
                        value={this.state.id_message_sender}
                        placeholder="Sender Username"
                        className="form-control"
                        id="senderUsername"
                        name="senderUsername"
                        onChange={this.handleMessageSenderChange.bind(this)}
                        required
                      />
                      <input
                        type="text"
                        value={this.state.id_message_receiver}
                        placeholder="Receiver Username"
                        className="form-control"
                        id="receiverUsername"
                        name="receiverUsername"
                        onChange={this.handleMessageReceiverChange.bind(this)}
                        required
                      />
                    </div>

                    <div className="form-group">{buttonActive}</div>
                  </form>
                ) : (
                  <form
                    id="chat-room-form"
                    onSubmit={this.handleSubmit.bind(this)}
                  >
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
                        value={this.state.id_message_sender}
                        placeholder="Sender Username"
                        className="form-control"
                        id="senderUsername"
                        name="senderUsername"
                        onChange={this.handleMessageSenderChange.bind(this)}
                        required
                        disabled={true}
                      />
                      <input
                        type="text"
                        value={this.state.id_message_receiver}
                        placeholder="Receiver Username"
                        className="form-control"
                        id="receiverUsername"
                        name="receiverUsername"
                        onChange={this.handleMessageReceiverChange.bind(this)}
                        required
                        disabled={true}
                      />
                    </div>

                    <div className="form-group">{buttonDisabled}</div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </ModalSendAndReceiveMessagesChatBoard>
      </div>
    );

    return (
      <div className="container" style={{ marginBottom: "50px" }}>
        <UserLogoutComponent />
        {this.state.userData.map((ud) => {
          //ud.username == localStorage.getItem("username") ? (<p>{ud.username}</p>) : console.log("not me")
          if (ud.username == localStorage.getItem("username")) {
            return (
              <a
                href={"/single-user-profile/" + ud.userProfile.id}
                style={{
                  borderRadius: "35px",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                <p>
                  <i class="fa fa-user" aria-hidden="true"></i>
                  &nbsp;&nbsp;
                  <strong>My Profile</strong>
                </p>
              </a>
            );
          }
        })}
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
                <span>
                  My username:{" "}
                  <strong id="pulsate-username">
                    {this.state.user.username}
                  </strong>
                </span>
                <a href={"/search-partner"}>
                  <input
                    type="button"
                    className="btn btn-warning"
                    style={{ marginTop: "30px" }}
                    value="Back to Search Partner"
                  />
                </a>
              </div>
              {/* <div className="row">
                <div className="col-md-12" style={{ marginBottom: "45px"}}>
                <a href={"/single-message-send/" + this.state.user.id}  className="btn btn-sm btn-primary">
                          <i className="fa fa-paper-plane" aria-hidden="true"></i><strong>&nbsp;&nbsp;Send Message</strong>
                        </a>
                </div>
              </div> */}
             

              {/* <div className="single_c_text text-md-left text-xs-center">
                <a href={"/search-partner"}>
                  <button className="btn btn-info">Back</button>
                </a>
              </div> */}
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
              <div className="row row-empty">
                <div className="col-md-12"></div>
              </div>
              <div className="row row-empty">
                <div className="col-md-12">{buttonModalSendAndReceiveMessage}</div>
              </div>
              {usernameUser ? (
                buttonMessages
              ) : (
                <div className="row" style={{ display: "none" }}>
                  <div className="col-md-12">
                    <h3>Messages</h3>
                    <button type="button" class="btn btn-primary btn-send">
                      Send Messages
                    </button>
                    <button type="button" class="btn btn-success btn-receive">
                      Inbox
                    </button>
                  </div>
                </div>
              )}
              {/* <div className="row">
                <div className="col-md-12">
                  <h3>Messages</h3>
                  <button type="button" class="btn btn-primary btn-sent">Sent Messages</button>
                  <button type="button" class="btn btn-success btn-receive">Inbox</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { SingleUserProfileComponent };

const ModalMessagesSentByConnectedUser = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-main container" style={{ borderRadius: "5px" }}>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {children}
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

const ModalMessagesReceivedByConnectedUser = ({ handleCloseReceiver, showReceiver, children }) => {
  const showHideClassNameReceiver = showReceiver
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassNameReceiver}>
      <div className="modal-main container" style={{ borderRadius: "5px" }}>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            {children}
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={handleCloseReceiver}
            >
              Close
            </button>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

const ModalSendAndReceiveMessagesChatBoard = ({
  handleCloseModalSendAndReceiveMessage,
  showSendAndReceive,
  children,
}) => {
  const showHideClassNameModalSendAndReceiveMessage = showSendAndReceive
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassNameModalSendAndReceiveMessage}>
      <div
        className="modal-main container"
        id="modal-main"
        style={{ borderRadius: "5px" }}
      >
        <div className="row">
          <div className="col-md-12">
            {children}
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: "right", marginBottom: "10px" }}
              onClick={handleCloseModalSendAndReceiveMessage}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
