import React, { Component } from 'react';
import { NavbarComponent } from '../_components/NavbarComponent';

class ExperiencesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <NavbarComponent />
                <p>Experiences Page</p>
            </div>
        );
    }

}

export { ExperiencesComponent };