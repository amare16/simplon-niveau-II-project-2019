import React, { Component } from "react";

class ModalEditExperiencCommentComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: "",
      commentContent: "",
      singleExperience: [
        {
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
        }
      ],
      
    };
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("id value: ", nextProps.id)
    fetch(
          `http://localhost:8000/api/single-comment-experience/` + nextProps.id,
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
  // this.setState({
  //   id: nextProps.id,
  //   commentContent: nextProps.commentContent,
  // });
}


showSingleExperienceAfterEditExperienceComment() {
 // console.log("experience id props: ", this.props.experienceId)
 
    fetch(`http://localhost:8000/api/single-experience/` + this.props.experienceId, {
    method: "GET",
    mode: "cors",
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("show exp res json: ", resJson);
      this.setState(
        {
          // id: resJson.id,
          // title: resJson.title,
          // content: resJson.content,
          // published_at: resJson.published_at,
          // commentExperiences: resJson.commentExperiences,
          // user: resJson.user,
          singleExperience: resJson.singleExperience
        }
        
      );
    });
  
}

editCommentExperience(newCommentExperience, nextProps) {
  //console.log("blallalalll", this.nextProps.id)
  let token = localStorage.getItem("token");
  // const commentExperienceId = this.props.match.params.commentExperienceId;
  // console.log("edit comment experience id: ", commentExperienceId);
  fetch(
    `http://localhost:8000/api/edit-comment-experience/` + nextProps.id,
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
      this.setState({
        response,
      })
      
      //this.props.history.push('/experiences');
    })
    .catch((err) => console.error(err));
}
  // componentWillMount() {
  //   this.getSingleCommentExperience();
  // }

  // getSingleCommentExperience() {
  //   let commentExperienceId = this.props.match.params.commentExperienceId;
  //   //console.log("commentExperienceId: ", commentExperienceId);
  //   fetch(
  //     `http://localhost:8000/api/single-comment-experience/${commentExperienceId}`,
  //     {
  //       method: "GET",
  //       mode: "cors",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((resJson) => {
  //       console.log("res json single comment: ", resJson);
  //       this.setState(
  //         {
  //           id: resJson.id,
  //           commentContent: resJson.commentContent,
  //         },
  //         () => {
  //           console.log("get single comment experience: ", this.state);
  //         }
  //       );
       
  //     });
  // }

  

  commentContentHandler(e) {
    this.setState({ commentContent: e.target.value });
  }

  handleSave() {
    let newCommentExperience = {
      commentContent: this.state.commentContent,
    };
    let nextProps = {
      id: this.state.id
    }

    this.editCommentExperience(newCommentExperience, nextProps);
    setInterval(this.showSingleExperienceAfterEditExperienceComment(), 500);

  }

  render() {
    console.log("props of get single experience: ", this.props.experienceId)
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <span className="modal-lable">Comment Content:</span>
                <input
                  value={this.state.commentContent}
                  onChange={(e) => this.commentContentHandler(e)}
                />
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  this.handleSave();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalEditExperiencCommentComponent;
