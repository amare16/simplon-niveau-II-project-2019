import React, { Component } from "react";
import { UserLogoutComponent } from "./UserLogoutComponent";

class ReceiveMessageComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <UserLogoutComponent />

        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div class="form-group">
              <h5><strong>Send your message to ...</strong></h5>
              <label for=" Email1msg">Your Message</label>
              <textarea class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-info">
              Send Your Message
            </button>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}
export { ReceiveMessageComponent };
