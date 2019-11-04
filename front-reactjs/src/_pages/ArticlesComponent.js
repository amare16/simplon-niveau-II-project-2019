import React from 'react';
import { NavbarComponent } from '../_components/NavbarComponent';

class ArticlesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <NavbarComponent />
                <p>Articles Page</p>
            </div>
        );
    }

}

export { ArticlesComponent };