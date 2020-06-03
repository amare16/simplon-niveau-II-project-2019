import React from "react";
import "./modalSingleUserProfile.css";
import PropTypes from "prop-types";

class ModalSingleUserProfile extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
        return null;
      }
    return (
      <div className="modal" id="modal">
        <h2>Modal Window</h2>
        <div class="content">{this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            close
          </button>
        </div>
      </div>
    );
  }
}

export { ModalSingleUserProfile };

ModalSingleUserProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
