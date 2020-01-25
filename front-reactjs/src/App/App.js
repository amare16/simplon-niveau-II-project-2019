import React from "react";


class App extends React.Component {
      constructor(props) {
        super(props);

        this.routeChange = this.routeChange.bind(this);
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
