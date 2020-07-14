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

      show: false,
      showReceiver: false,
    };

    console.log("type of sender: ", this.state.items);
  }

  componentDidMount() {
    this.getSingleUserProfile();
    this.getMessageHere();
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
    e.preventDefault();
    e.target.reset();
    //this.setState({ message: "" });

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
    
    let usernameSender = localStorage.getItem("username");
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

    let buttonMessages = (
      <div className="row">
        <div className="col-md-12">
          <h3>Messages</h3>
          <button
            type="button"
            class="btn btn-primary btn-send"
            style={{marginBottom: '10px', marginRight: '10px'}}
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

          <ModalSender show={this.state.show} handleClose={this.hideModal}>
            {console.log("user sender: ", this.state.user)}
            {/* {this.state.user.userMessageSender.map(msgSender => {
                console.log("msg sender: ", msgSender)
            })} */}
              
                <div class="container" id="messageSent">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th><strong>Sent Messages</strong></th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    {this.state.user.userMessageSender.map((msgSender) => {
                      return(
                        <tr>
                          {
                            <td><span style={{float: 'right'}}>{moment(msgSender.send_at).format('YYYY-MM-DD, hh:mm:ss')}</span><br />{msgSender.message}</td> ? <td><span style={{float: 'right'}}>{moment(msgSender.send_at).format('YYYY-MM-DD, hh:mm:ss')}</span><br />{msgSender.message}</td>: <td><span style={{float: 'right'}}>{moment(msgSender.send_at).format('YYYY-MM-DD, hh:mm:ss')}</span><br />{msgSender.message}</td>
                          }
                        
                      </tr>
                      )
                      
                     })}
                    </tbody>
                  </table>
                </div>
             
           
          </ModalSender>
          <ModalReceiver
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
                        <th><strong>Received Messages</strong></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.user.userMessageReceiver.map((msgReceiver) => {
                      return(
                        <tr>
                        <td><span style={{float: 'right'}}>{moment(msgReceiver.send_at).format('YYYY-MM-DD, hh:mm:ss')}</span><br />{msgReceiver.message}</td>
                      </tr>
                      )
                      
                     })}
                    </tbody>
                  </table>
                </div>
          </ModalReceiver>
        </div>
      </div>
    );

    return (
      <div className="container" style={{ marginBottom: "50px" }}>
        <UserLogoutComponent />
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
                            style={{marginTop: '30px'}}
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
              {usernameUser ? (
                <div className="row" style={{ display: "none" }}>
                  <div
                    className="col-md-12"
                    style={{
                      marginBottom: "45px",
                      background: "linear-gradient(to left, #43cea2, #185a9d)",
                    }}
                  >
                    
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="form-group">
                        <label
                          htmlFor=" Email1msg"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          From
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: "10px" }}
                          placeholder="Your username"
                          value={this.state.id_message_sender}
                          onChange={this.handleMessageSenderChange.bind(this)}
                        />
                        <label
                          htmlFor=" Email1msg"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          To
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: "10px" }}
                          placeholder="Receiver username"
                          value={this.state.id_message_receiver}
                          onChange={this.handleMessageReceiverChange.bind(this)}
                        />
                        {/* <select
                            className="form-control form-control-sm"
                            onChange={this.handleUsernameChange.bind(this)}
                            style={{ textTransform: "capitalize" }}
                          >
                            <option value={username}>{username}</option>
                          </select> */}
                        &nbsp;&nbsp;
                        <span
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Message
                        </span>
                        &nbsp;&nbsp;
                        {/* <select
                            className="form-control form-control-sm"
                            onChange={this.handleUsernameChange.bind(this)}
                            style={{ textTransform: "capitalize" }}
                          >
                            <option value={this.state.user.username}>
                              {this.state.user.username}
                            </option>
                          </select> */}
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
                          placeholder="Enter Your message"
                          onChange={this.handleMessageChange.bind(this)}
                        ></textarea>
                      </div>

                      {/* <button type="submit" className="btn btn-primary">
                          Send Message
                        </button> */}
                      <div className="single_c_text text-md-left text-xs-center">
                        {sender && receiver && !usernameUser
                          ? buttonActive
                          : buttonDisabled}
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="row insert-message-row">
                  <div
                    className="col-md-12"
                    style={{
                      marginBottom: "45px",
                      background: "linear-gradient(to left, #43cea2, #185a9d)",
                    }}
                  >
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="form-group">
                        
                      <p style={{textAlign: "center", color: 'white', fontSize: '30px'}}><strong>Send Message</strong></p>
                        <label
                          htmlFor=" Email1msg"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          From
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: "10px" }}
                          placeholder="Your username"
                          value={this.state.id_message_sender}
                          onChange={this.handleMessageSenderChange.bind(this)}
                        />
                        <label
                          htmlFor=" Email1msg"
                          style={{ color: "white", fontWeight: "bold" }}
                        >
                          To
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginBottom: "10px" }}
                          placeholder="Receiver username"
                          value={this.state.id_message_receiver}
                          onChange={this.handleMessageReceiverChange.bind(this)}
                        />
                        {/* <select
                            className="form-control form-control-sm"
                            onChange={this.handleUsernameChange.bind(this)}
                            style={{ textTransform: "capitalize" }}
                          >
                            <option value={username}>{username}</option>
                          </select> */}
                        &nbsp;&nbsp;
                        <span
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          Message
                        </span>
                        &nbsp;&nbsp;
                        {/* <select
                            className="form-control form-control-sm"
                            onChange={this.handleUsernameChange.bind(this)}
                            style={{ textTransform: "capitalize" }}
                          >
                            <option value={this.state.user.username}>
                              {this.state.user.username}
                            </option>
                          </select> */}
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
                          placeholder="Enter Your message"
                          onChange={this.handleMessageChange.bind(this)}
                        ></textarea>
                      </div>

                      {/* <button type="submit" className="btn btn-primary">
                          Send Message
                        </button> */}
                      <div className="single_c_text text-md-left text-xs-center">
                        {sender && receiver && !usernameUser
                          ? buttonActive
                          : buttonDisabled}
                      </div>
                    </form>
                  </div>
                </div>
              )}

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
                <div className="col-md-12"></div>
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

const ModalSender = ({ handleClose, show, children }) => {
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
              style={{float: 'right', marginBottom: '10px'}}
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

const ModalReceiver = ({ handleCloseReceiver, showReceiver, children }) => {
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
              style={{float: 'right', marginBottom: '10px'}}
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
