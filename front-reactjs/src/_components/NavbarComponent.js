import React, { Component } from 'react';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarColor01">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/articles">Articles <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="experiences">Experiences</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="events">Événements</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contact">Contact</a>
                    </li>
                    </ul>
                    
                </div>
                </nav>
            </div>
        );
    }

}

export { NavbarComponent };