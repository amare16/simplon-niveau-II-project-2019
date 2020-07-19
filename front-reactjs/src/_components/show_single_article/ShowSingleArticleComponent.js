import React, { Component } from "react";
import * as moment from "moment";
import {LikeButtonArticles} from "./../like_button_articles/LikeButtonArticles";
import "./showSingleArticle.css";

class ShowSingleArticleComponent extends React.Component {
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
    };
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  handleCommentArticle(event) {
    this.setState({
      commentContent: event.target.value,
    });
  }

  submitComment(e) {
    e.preventDefault();
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
        })
        .catch((error) => {
          console.error("error test: ", error);
        });
    } else {
      this.props.history.push("/login");
    }
  }

  getSingleComment() {
    let commentId = this.props.match.params.commentId;
    fetch(`http://localhost:8000/api/single-comment-article/` + commentId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resultJson) => {
        console.log("resJson result: ", resultJson);
        this.setState({
          comentContent: resultJson.commentContent,
          user: resultJson.user,
        });
      })
      .catch((error) => console.log(error));
  }
  getArticleDetails() {
    let articleId = this.props.match.params.articleId;
    fetch(`http://localhost:8000/api/single-article/` + articleId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        //console.log("resJson details", resJson);
        this.setState(
          {
            id: resJson.id,
            title: resJson.title,
            content: resJson.content,
            published_at: resJson.published_at,
            user: resJson.user,
            commentArticles: resJson.commentArticles,
            likes: resJson.likes,
          },
          () => {
            //console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log("username author of article: ", this.state.user.username);
    let tokenRedirect = localStorage.getItem("token");
    console.log("articles comment: ", this.state.commentArticles);
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
              </p> {" "}
              <span className="react-like"></span>
              <LikeButtonArticles test={this.props.likes}/>
              <span>{this.state.likes.length}</span>


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
          className="form-horizontal"
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
          <div className="comment-div col-lg-6">
            {this.state.commentArticles.map((comment) => {
              return (
                <div className="container-article-comment">
                  <div class="text">
                    <p>{comment.commentContent}</p>
                  </div>
                  <p class="attribution">
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
                        <span>at {moment(comment.commented_at).format("LT")},{" "}
                    {moment(comment.commented_at).format("LL")}</span>
                      ) : null
                    }
                    
                    
                  </p>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}

export { ShowSingleArticleComponent };
