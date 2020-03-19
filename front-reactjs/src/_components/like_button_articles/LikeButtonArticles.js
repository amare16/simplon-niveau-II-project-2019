import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class LikeButtonArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes || 0,
      isLiked: props.isLiked || false
    };
  }

  handleClick() {
    const isLiked = this.state.isLiked;
    console.log("is liked: ", isLiked)
    const likes = this.state.likes + (isLiked ? -1 : 1);

    // this set state is the same as the below one
    // this.setState({
    //     likes: likes
    // });
    this.setState({likes, isLiked: !isLiked})
  }

  render() {
      
    return React.createElement(
        "button",
        { className: "btn btn-link", onClick: () => this.handleClick() },
            this.state.likes,
            " ",

            React.createElement('i', { className: this.state.isLiked ? " fa fa-thumbs-down" : " fa fa-thumbs-up" }),
            " ",
         "Like!"
    );
  }
}

document.querySelectorAll('span.react-like').forEach(function(span) {
    const likes = +span.dataset.likes;
    console.log("likes :", likes)
    const isLiked = +span.dataset.isLiked === 1;
    
    //ReactDOM.render(React.createElement(LikeButtonArticles), span);
    ReactDOM.render(<LikeButtonArticles likes={likes} isLiked={isLiked} />, span);   
})

export { LikeButtonArticles };
