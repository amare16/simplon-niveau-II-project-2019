import React, { Component } from "react";
import * as moment from "moment";

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
        lastName: ""
      },
      commentContent: "",
      article: {
        id: ""
      }
    };
  }

  componentWillMount() {
    this.getArticleDetails();
  }

  handleCommentArticle(event) {
    this.setState({
      commentContent: event.target.value
    });
  }

  submitComment(e) {
    e.preventDefault();
    let body = {
      commentContent: this.state.commentContent,
      article: {
        id:this.state.id
      }
    }

    console.log("body: ",body);

    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:8000/api/new-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ` + token
      },
      body: JSON.stringify(body)
    })
    
      .then(data => {
        data.json().then(results => {
          console.log("results: ", results)
        })
      })
      .catch(error => {
        console.error("error test: ",error);
      });
    } else {
      this.props.history.push("/login")
    }
    
  }
  getArticleDetails() {
    let articleId = this.props.match.params.articleId;
    fetch(`http://localhost:8000/api/single-article/` + articleId, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(resJson => {
        console.log("resJson details", resJson);
        this.setState(
          {
            id: resJson.id,
            title: resJson.title,
            content: resJson.content,
            published_at: resJson.published_at,
            user: resJson.user
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container-fluid">
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
              <h4 className="media-heading">{this.state.title}</h4>
              <p>{this.state.content}</p>
              <p className="text-left">{moment(this.state.published_at).format('LLL')}</p>
              <p className="text-right">
                {this.state.user.firstName + " " + this.state.user.lastName}
              </p>
            </div>
          </div>
        </div>
        <form
          name="commentContent"
          className="form-horizontal"
          onSubmit={this.submitComment.bind(this)}
        >
          <div className="col-lg-6 comment-article" style={{ marginBottom: "100px"}}>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Comment here"
                value={this.state.commentContent}
                onChange={this.handleCommentArticle.bind(this)}
              ></textarea>
              <button className="btn btn-success" style={{marginTop: "10px"}}>Comment</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export { ShowSingleArticleComponent };
