import React from "react";
import { NavbarComponent } from './NavbarComponent';


class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavbarComponent /><br /><br />
        <div class="jumbotron">
          <p class="lead">
            Agro Interest is a site to meet a farmer or who has a hobby to cultivate (gardener)
             and also to meet a lender or donor of agricultural equipment.
          </p>
          <hr class="my-4"></hr>
          <p className="lead">
            <b>Are you a farmer?</b><br></br> Do you want to meet and share your experiences for 
            anyone who wants to cultivate on your farm? <br></br>or <br></br><b>Do you have a hobby to cultivate?</b><br></br>
            If so, would you like to meet a farmer to get a good experience? <br></br>or <br></br><b>Do you have farm equipment?</b><br></br>
            If so, do you want to give or lend it to others?<br></br>If you are one of them, please register and access our website.
          </p>
          <a href="/register"><button className="btn btn-secondary">Register Here</button></a><br></br><br></br>if you are already registered, login below: <br></br><br></br>
          <a href="/login"><button className="btn btn-primary">Login</button></a> <br></br><br></br>

          <p className="lead"><b>Otherwise, you can access articles and experiences of others.</b></p>
        </div>
      </div>

      
    );
  }

  
}

export {HomeComponent};
