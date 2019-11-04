import React, { Component } from 'react';

class LogoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="logo">
                <a href="http://localhost:3000/welcome"><img src="http://localhost:3000/logo.png" alt="logo"></img></a>
            
            </div>
        );
    }

}

export { LogoComponent };