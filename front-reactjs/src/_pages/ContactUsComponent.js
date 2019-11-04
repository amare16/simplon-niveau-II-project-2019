import React, { Component } from 'react';
import { NavbarComponent } from '../_components/NavbarComponent';

class ContactUsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <NavbarComponent />

                <p>Contact us Page</p>
                <img src="http://localhost:3000/under-construction.jpg"></img>
            </div>
        );
    }

}

export { ContactUsComponent };