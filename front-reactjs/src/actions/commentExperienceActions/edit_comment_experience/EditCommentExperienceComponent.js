import React, { Component } from "react";

class EditCommentExperienceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      commentContent: "",
    };

    this.handleCommentContentChange = this.handleCommentContentChange.bind(this);
    this.handleSubmitAfterEditCommentExperience = this.handleSubmitAfterEditCommentExperience.bind(this);
  }


  componentWillMount() {
    this.getSingleCommentExperience();
  }

  getSingleCommentExperience() {
    let commentExperienceId = this.props.match.params.commentExperienceId;
    console.log("commentExperienceId: ", commentExperienceId);
    fetch(
      `http://localhost:8000/api/single-comment-experience/${this.props.match.params.commentExperienceId}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log("res json single comment: ", resJson);
        this.setState(
          {
            id: resJson.id,
            commentContent: resJson.commentContent,
          },
          () => {
            console.log("get single comment experience: ", this.state);
          }
        );
       
      });
  }

  handleCommentContentChange(event) {
    console.log("ppppppppppp", event.target.value)
    this.setState({
      commentContent: event.target.value,
    });
    console.log("test content: ", this.state.commentContent);
  }

  editCommentExperience(newCommentExperience) {
    console.log("blallalalll")
    let token = localStorage.getItem("token");
    console.log("inside token: ", this.props.match.params.commentExperienceId);
    fetch(
      `http://localhost:8000/api/edit-comment-experience/${this.props.match.params.commentExperienceId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify(this.state),
      }
    )
      .then((response) => {
        console.log("response from getDetails: ", response);
        //this.props.history.push('/experiences');
      })
      .catch((err) => console.error(err));
  }

  handleSubmitAfterEditCommentExperience(e) {
    console.log("ddddddddddddddddddddddddddddddddd")
    e.preventDefault();
    console.log("uuuuuuuuuu", this.props.match.params.commentExperienceId);
    let newCommentExperience = {
      commentContent: this.state.commentContent,
    };
    this.editCommentExperience(newCommentExperience);
  }

  render() {
    
    return (
      <form
        className="form-horizontal form-horizontal-edit-comment-experience"
        onSubmit={this.handleSubmitAfterEditCommentExperience}
      >
        <textarea
          onChange={this.handleCommentContentChange}
          value={this.state.commentContent}
          required
        ></textarea>
        <button
          id="submit"
          type="submit"
          className="button button-outline comment-button action-button expand-right"
        >
          Done
        </button>
      </form>
    );
  }
}

export { EditCommentExperienceComponent };
