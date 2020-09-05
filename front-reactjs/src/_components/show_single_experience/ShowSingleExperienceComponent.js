import React, { Component } from "react";
//import { EditCommentExperienceComponent } from "../../actions/commentExperienceActions/edit_comment_experience/EditCommentExperienceComponent";
import "./showSingleExperience.css";
import moment from "moment";
import ModalEditExperienceCommentComponent from "./editExperienceComment/ModalEditExperienceCommentComponent";

class ShowSingleExperienceComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      content: "",
      published_at: "",
      user: {
        firstName: "",
        lastName: "",
      },
      commentExperiences: [
        {
          id: "",
          commentContent: "",
          commentedAt: "",
          authorName: {
            id: "",
            firstName: "",
            lastName: "",
            username: "",
          },
        },
      ],
      commentExperience: {
        id: "",
        commentContent: "",
        experience: {
          id: "",
        },
        user: {
          firstName: "",
          lastName: "",
          username: "",
        },
      },
      requiredItem: 0
    };
    //console.log("test: ", this.state)
     this.replaceModalItem = this.replaceModalItem.bind(this);
    
  }

  componentWillMount() {
    this.getSingleExperience();
  }

  getSingleExperience() {
    let experienceId = this.props.match.params.experienceId;
    fetch(`http://localhost:8000/api/single-experience/` + experienceId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("res json: ", resJson);
        this.setState(
          {
            id: resJson.id,
            title: resJson.title,
            content: resJson.content,
            published_at: resJson.published_at,
            commentExperiences: resJson.commentExperiences,
            user: resJson.user,
          },
          () => {
            console.log(
              "get single experience: ",
              this.state.commentExperiences.map((comment) => comment.id)
            );
          }
        );
      });
  }

  handleCommentExperience(event) {
    this.setState({
      commentContent: event.target.value,
    });
  }

  submitComment(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ commentContent: "" });
    let body = {
      commentContent: this.state.commentContent,
      experience: {
        id: this.state.id,
      },
    };

    console.log("body: ", body);

    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:8000/api/add-comment-experience`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
        body: JSON.stringify(body),
      })
        .then((data) => {
          data.json().then((results) => {
            console.log("results: ", results);
          });
          setInterval(this.getSingleExperience(), 500);
        })
        .catch((error) => {
          console.error("error test: ", error);
        });
    } else {
      this.props.history.push("/login");
    }
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  
  showSingleExperienceAfterCommentDelete() {
    setTimeout(() => {
      let experienceId = this.props.match.params.experienceId;
      fetch(`http://localhost:8000/api/single-experience/` + experienceId, {
        method: "GET",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((resJson) => {
          console.log("res json: ", resJson);
          this.setState(
            {
              id: resJson.id,
              title: resJson.title,
              content: resJson.content,
              published_at: resJson.published_at,
              commentExperiences: resJson.commentExperiences,
              user: resJson.user,
            },
            () => {
              console.log(this.state);
            }
          );
        });
    }, 200);
  }

  deleteCommentExperience(e, id) {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      if (window.confirm("Are you sure to delete this comment experience?")) {
        console.log("id experience:", id);
        let token = localStorage.getItem("token");
        fetch(`http://localhost:8000/api/delete-comment-experience/` + id, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        })
          .then((res) => {
            console.log("result: ", res);
            this.setState({ res });
            this.showSingleExperienceAfterCommentDelete();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    console.log(
      "I do not know why: ",
      this.state.commentExperiences.map((commExps) => commExps.id)
    );
    let tokenRedirect = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    console.log("username username: ", username);
    
    /* EditModaExperienceComment variables */
    const requiredItem = this.state.requiredItem;
    console.log("this.state.requiredItem: ", requiredItem)
    let modalData = this.state.commentExperiences[requiredItem];
    console.log("modal data: ", modalData);


    return (
      <div className="container-fluid">
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-sm-12">
            <div className="text-center">
              {tokenRedirect ? (
                <a
                  href={"/experiences"}
                  style={{ borderRadius: "35px", fontSize: "25px" }}
                >
                  <p>
                    <i
                      class="fa fa-history"
                      aria-hidden="true"
                      style={{ color: "green" }}
                    ></i>
                    &nbsp;&nbsp;
                    <strong>Click here to see list of Expriences</strong>
                  </p>
                </a>
              ) : (
                <a
                  href={"/show-list-experiences"}
                  style={{ borderRadius: "35px", fontSize: "25px" }}
                >
                  <p>
                    <i
                      class="fa fa-history"
                      aria-hidden="true"
                      style={{ color: "green" }}
                    ></i>
                    &nbsp;&nbsp;
                    <strong>Click here to see list of Experiences</strong>
                  </p>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="well show-single-article">
          <div className="jumbotron">
            <a className="pull-left" href="#">
              <img
                className="media-object"
                src="https://previews.123rf.com/images/paylessimages/paylessimages1502/paylessimages150233243/40325604-potato-field.jpg"
                width="150"
                height="150"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
            </a>
            <div className="media-body">
              <h4 className="media-heading" style={{ color: "green" }}>
                {this.state.title}
              </h4>
              <p className="single-article-content">{this.state.content}</p>
              <p
                className="text-left"
                style={{ fontStyle: "italic", color: "green" }}
              >
                {moment(this.state.published_at).format("LLL")}
              </p>
              <p className="text-right">
                <strong style={{ color: "green" }}>
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </strong>
              </p>
            </div>
          </div>
        </div>
        <form
          name="commentExperience"
          className="form-horizontal form-horizontal-add-comment-experience"
          onSubmit={this.submitComment.bind(this)}
        >
          <div className="col-lg-6 add-comment-experience">
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Comment here"
                value={this.state.commentContent}
                onChange={this.handleCommentExperience.bind(this)}
                required
              ></textarea>
              <button className="btn btn-success" style={{ marginTop: "10px" }}>
                Comment
              </button>
            </div>
          </div>
        </form>

        {/* { this.state.editMode ? this.renderEditCommentExperience() : this.renderCommentExperienceRead() } */}
        <div className="comment-div-experience col-lg-6">
          {console.log("test if it is: ", this.state.commentExperiences)}
          {this.state.commentExperiences.map((comment, index) => {
            return (
              <div className="container-experience-comment">
                <div class="text">
                  <p>{comment.commentContent}</p>
                </div>
                <p class="attribution">

                  {comment.authorName.username ==
                  localStorage.getItem("username") && (
                    <div style={{float: "left"}}>
                      <i
                      title="Edit your comment"
                      className="fa fa-edit fa-lg"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      style={{color: "green" }}
                      aria-hidden="true"
                      onClick={() => this.replaceModalItem(index)}
                    ></i>&nbsp;&nbsp;&nbsp;
                     
                  <i
                      title="Delete your comment"
                      className="fa fa-trash-o fa-lg del-btn"
                      style={{color: "red" }}
                      aria-hidden="true"
                      onClick={(e) =>
                        this.deleteCommentExperience(e, comment.id)
                      }
                    ></i>
                    </div>
                    
                  ) }
                  by{" "}
                  {this.state.user.username != comment.authorName.username ? (
                    <a href="#">
                      {comment.authorName.firstName}{" "}
                      {comment.authorName.lastName}
                    </a>
                  ) : (
                    <strong style={{ color: "green" }}>
                      Author of this experience
                    </strong>
                  )}{" "}
                  {comment.commentedAt ? (
                    //     <span>at {moment(comment.commentedAt).format("LT")},{" "}
                    // {moment(comment.commentedAt).format("LL")}</span>
                    <span>
                      {moment(comment.commentedAt).startOf("minutes").fromNow()}
                    </span>
                  ) : null}
                </p>
              </div>
            );
          })}

        </div>
        <ModalEditExperienceCommentComponent
          id={modalData.id}
          commentContent={modalData.commentContent}
          experienceId = {this.props.match.params.experienceId}
        />
      </div>
    );
  }
}
export { ShowSingleExperienceComponent };
