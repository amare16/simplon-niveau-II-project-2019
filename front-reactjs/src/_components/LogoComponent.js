import React, { Component } from 'react';

class LogoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let token = localStorage.getItem("token");
        if (token) {
            return(
                <div className="logo" style={{marginTop: '13px'}}>
                    <a href="/home"><img className="img-logo" src="http://localhost:3000/logo.png" width="170" height="170" alt="logo"></img></a>
                
                </div>
            );
        } 
        else {
            return(
                <div className="logo">
                    <a href="/home"><img className="img-logo" src="http://localhost:3000/logo.png" width="170" height="170" alt="logo"></img></a>
                
                </div>
            );
        }
        
    }

}

export { LogoComponent };