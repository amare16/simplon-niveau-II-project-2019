import React, { Component } from 'react';
import { directive } from '@babel/types';

class WelcomePageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
      let path = `home`;
      this.props.history.push(path);
    }

    render() {
        return(
          <div>
            <div class="card mb-3" onClick={this.routeChange}>
              
              <div class="card-body">
                <h1 class="card-title">Bienvenue <br></br>chez <br></br>Agro Interest</h1>
                
              </div>
            </div>
          </div>
          
            
        );
    }

}

export { WelcomePageComponent };