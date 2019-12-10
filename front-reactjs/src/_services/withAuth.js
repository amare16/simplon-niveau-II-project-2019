import React from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    // instantiate our service
    const Auth = new AuthService('http://localhost:8000');
    return class AuthWrapped extends React.Component {
        constructor() {
            super();

            this.state = {
                user: null
            }
            console.log("what is : ", this.state);
        }

        componentWillMount() {
            if(!Auth.loggedIn()) {
                this.props.history.replace('/welcome');
            }
                
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    })
                }
                catch(err) {
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if(this.state.user) {
                return(
                    <AuthComponent {...this.props} {...this.state} />
                )
            } else {
                return null;
            }
        }
    }
}