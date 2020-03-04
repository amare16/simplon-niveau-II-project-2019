import React, { Component } from "react";

class ReceiveMessageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       id_message_sender: "",
       message: "" 
      
    };
  }

 
  getReceiveMessage()
  {

    let messageReceiveId = this.props.match.params.messageReceiveId;
    let token = localStorage.getItem('token')
    
  fetch(`http://localhost:8000/api/single-message-receive/` + messageReceiveId, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ` + token
      }
    })
    .then(res => res.json())
      .then(response => {
          console.log("response test: ", response)
        this.setState({
            id_message_sender: response.id_message_sender,
            message: response.message
        })
      })
    .catch(error => {
        console.error(error);
    });
  }
 

  render() {
      console.log("test : ", this.state.message)
    return (
      <div>
        {
            <p>{this.state.message}</p>
        }
      </div>
    );
  }
}
export { ReceiveMessageComponent };
