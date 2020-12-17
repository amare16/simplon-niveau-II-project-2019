import React, { Component } from "react";
import * as moment from "moment";
import {LikeButtonArticles} from "./../like_button_articles/LikeButtonArticles";
import "./showSingleArticle.css";
import ModalEditArticleCommentComponent from "./editArticleComment/ModalEditArticleCommentComponent.js";

class ShowSingleArticleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      content: "",
      published_at: "",
      imageFile: null,
      user: {
        firstName: "",
        lastName: "",
        username: "",
      },
      commentArticles: [
        {
          id: "",
          commentContent: "",
          commented_at: "",
          authorName: {
            id: "",
            firstName: "",
            lastName: "",
            username: ""
          },
        },
      ],
      likes: [
        {
          id: ""
        }
      ],
      commentContent: "",
      article: {
        id: "",
      },
      user: {
        firstName: "",
        lastName: "",
        username: "",
      },
      requiredItem: 0
    };
    this.replaceModalItem = this.replaceModalItem.bind(this);
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  handleCommentArticle(event) {
    this.setState({
      commentContent: event.target.value,
    });
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  submitComment(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ commentContent: "" });
    let body = {
      commentContent: this.state.commentContent,
      article: {
        id: this.state.id,
      },
    };

    console.log("body: ", body);

    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:8000/api/new-comment`, {
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
          setInterval(this.getArticleDetails(), 200);
        })
        .catch((error) => {
          console.error("error test: ", error);
        });
    } else {
      this.props.history.push("/login");
    }
  }


  getArticleDetails() {
    let articleId = this.props.match.params.articleId;
    fetch(`http://localhost:8000/api/single-article/` + articleId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("resJson details", resJson);
        this.setState(
          {
            id: resJson.id,
            title: resJson.title,
            content: resJson.content,
            published_at: resJson.published_at,
            imageFile: resJson.imageFile,
            user: resJson.user,
            commentArticles: resJson.commentArticles,
            likes: resJson.likes,
          },
          () => {
            console.log("this state: ", this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  showSingleArticleAfterCommentDelete() {
    setTimeout(() => {
      let articleId = this.props.match.params.articleId;
      fetch(`http://localhost:8000/api/single-article/` + articleId, {
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
            imageFile: resJson.imageFile,
            user: resJson.user,
            commentArticles: resJson.commentArticles,
            likes: resJson.likes,
            },
            () => {
              console.log(this.state);
            }
          );
        });
    }, 200);
  }
  deleteCommentArticle(e, id) {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      if (window.confirm("Are you sure to delete this comment article?")) {
        console.log("id article:", id);
        let token = localStorage.getItem("token");
        fetch(`http://localhost:8000/api/delete-comment-article/` + id, {
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
            this.showSingleArticleAfterCommentDelete();
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
    console.log("username author of article: ", this.state.user.username);
    let tokenRedirect = localStorage.getItem("token");
    console.log("articles comment: ", this.state.commentArticles);

    const requiredItem = this.state.requiredItem;
    console.log("this.state.requiredItem: ", requiredItem)
    let modalData = this.state.commentArticles[requiredItem];
    //console.log("modal data: ", modalData["id"]);
    
    
    return (
      
      <div className="container-fluid"> 
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-sm-12">
            <div className="text-center">
              {tokenRedirect ? (
                <a
                  href={"/articles"}
                  style={{ borderRadius: "35px", fontSize: "25px" }}
                >
                  <p>
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <strong>Click here to see list of Articles</strong>
                  </p>
                </a>
              ) : (
                <a
                  href={"/show-list-articles"}
                  style={{ borderRadius: "35px", fontSize: "25px" }}
                >
                  <p>
                    <i class="fa fa-list-alt" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <strong>Click here to see list of Articles</strong>
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
                src={this.state.imageFile}
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
              </p> {" "}
              {/* <span className="react-like"></span>
              <LikeButtonArticles test={this.props.likes}/>
              <span>{this.state.likes.length}</span> */}


              <p className="text-right">
                <strong style={{ color: "green" }}>
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </strong>
              </p>
            </div>
          </div>
        </div>

        <form
          name="commentContent"
          className="form-horizontal form-horizontal-article"
          onSubmit={this.submitComment.bind(this)}
        >
          <div className="col-lg-6 comment-article">
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Comment here"
                value={this.state.commentContent}
                onChange={this.handleCommentArticle.bind(this)}
                required
              ></textarea>
              <button className="btn btn-success" style={{ marginTop: "10px" }}>
                Comment
              </button>
            </div>
          </div>
          
        </form>
        <div className="comment-div-article col-lg-6">
            {this.state.commentArticles.map((comment, index) => {
              return (
                <div className="container-article-comment">
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
                        this.deleteCommentArticle(e, comment.id)
                      }
                    ></i>
                    </div>
                  )
                  }
                    by{" "}
                    {
                      this.state.user.username != comment.authorName.username ? (<a href="#">
                      {comment.authorName.firstName}{" "}
                      {comment.authorName.lastName}
                    </a>) : (<strong style={{color: "green"}}>Author of this article</strong>)
                    }
                    {" "}
                    {
                      comment.commented_at ? (
                    //     <span>at {moment(comment.commented_at).format("LT")},{" "}
                    // {moment(comment.commented_at).format("LL")}</span>
                        <span>{moment(comment.commented_at).startOf("minutes").fromNow()}</span>
                      ) : null
                    }
                    
                    
                  </p>
                  <ModalEditArticleCommentComponent
                 id={modalData.id}
                 commentContent={modalData.commentContent}
                 articleId = {this.props.match.params.articleId}          
                 />
                </div>
                 
              );
            })}
          </div>
           
         
      </div>
    );
  }
}

export { ShowSingleArticleComponent };
