import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserLogoutComponent extends React.Component {
    constructor(props) {
        super(props);
        
        
    }



    render() {
        return(
            <div>
                <h1>You have been logged out!!!</h1>
                <Link to="/login">Login again</Link>
            </div>
        )
    }
}

export { UserLogoutComponent };