import React, { Component } from 'react';
import { UserLogoutComponent } from "./UserLogoutComponent";
import { NavbarComponent } from '../_components/NavbarComponent';

class ExperiencesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <UserLogoutComponent />
                <NavbarComponent />
                <p>Experiences Page</p>
            </div>
        );
    }

}

export { ExperiencesComponent };