import React from "react";
import axios from "axios";


class App extends React.Component {
      constructor(props) {
        super(props);

        this.routeChange = this.routeChange.bind(this);
    }

    checkLoginStatus() {
      fetch("http://localhost:8000/api/login_check", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
        .then(response => {
          console.log("logged in? ", response)
        })
        .catch(error => {
          console.log("check login error", error)
        })
    }

    componentDidMount() {
      this.checkLoginStatus();
    }

    routeChange() {
      let path = `home`;
      this.props.history.push(path);
    }
  render() {
    return (
      <div className="App">
        <div className="card mb-3" onClick={this.routeChange}>
              
              <div className="card-body">
                <h1 className="card-title">Bienvenue <br></br>chez <br></br>Agro Interest</h1>
                
              </div>
            </div>
      </div>
    );
  }

  
}

export {App};
