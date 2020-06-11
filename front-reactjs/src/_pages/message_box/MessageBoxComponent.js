import React from 'react';
import { SingleUserProfileComponent } from "../single_user_profile/SingleUserProfileComponent";


class MessageBoxComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("typeof: ", typeof(this.props.response))
        return (
            <div>
                
            {console.log("test result: ", this.props)}
           </div>
        )
    }
}
export { MessageBoxComponent };