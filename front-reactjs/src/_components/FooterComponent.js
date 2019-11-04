import React, { Component } from "react";

class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="footer"><div className="copyright"><p>©2019 - Agro Interest</p></div></div>;
  }
}

export { FooterComponent };
