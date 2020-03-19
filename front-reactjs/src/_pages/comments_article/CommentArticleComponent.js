// import React, { Component } from 'react';


// class CommentArticleComponent extends React.Component
// {
//     constructor(props) {
//         super(props);

//         this.state = {
//             id: "",
//             commentContent: "",
//             article: {
//                 id: ""
//             },
//             user: {
//                 firstName: "",
//                 lastName: ""
//             }
//         }
//     }

//     handleCommentArticle(event) {
//         this.setState({
//           commentContent: event.target.value
//         });
//       }

//     submitComment(e) {
//         e.preventDefault();
//         let body = {
//           commentContent: this.state.commentContent,
//           article: {
//             id:this.state.article.id
//           }
//         }
    
//         console.log("body: ",body);
    
//         let token = localStorage.getItem("token");
//         if (token) {
//           fetch(`http://localhost:8000/api/new-comment`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ` + token
//           },
//           body: JSON.stringify(body)
//         })
        
//           .then(data => {
//             data.json().then(results => {
//               console.log("results: ", results)
//             })
//           })
//           .catch(error => {
//             console.error("error test: ",error);
//           });
//         } else {
//           this.props.history.push("/login")
//         }
        
//       }

//       render() {
//           return(
//               <div>
//                   <form
//           name="commentContent"
//           className="form-horizontal"
//           onSubmit={this.submitComment.bind(this)}
//         >
//           <div className="col-lg-6 comment-article" style={{ marginBottom: "100px"}}>
//             <div className="form-group">
//               <textarea
//                 className="form-control"
//                 rows="3"
//                 placeholder="Comment here"
//                 value={this.state.commentContent}
//                 onChange={this.handleCommentArticle.bind(this)}
//                 required
//               ></textarea>
//               <button className="btn btn-success" style={{marginTop: "10px"}}>Comment</button>
//             </div>
//           </div>
//         </form>
//               </div>
//           )
//       }
// }

// export { CommentArticleComponent };