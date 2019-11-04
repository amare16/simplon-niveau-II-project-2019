import React, { Component } from 'react';
import { NavbarComponent } from '../_components/NavbarComponent';

class EventsComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <NavbarComponent />
                <p>Events Page</p>
            </div>
        );
    }

}

export { EventsComponent };