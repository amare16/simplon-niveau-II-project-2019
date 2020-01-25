import React from "react";
//import { NavbarComponent } from "../_components/NavbarComponent";

class UserLoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
    //console.log('this state value: ', this.state)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

 

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(name, value);
  }

  handleSubmit(e){
    e.preventDefault();
    let userData = {
      username: this.state.username,
      password: this.state.password
    };

    const { history } = this.props; 


    fetch(`http://localhost:8000/api/login_check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        }).then(data => {
          data.json()
          .then(results => {
            
            console.log(this.state.username, "is logged in successfuly!", results);
            history.push("/home");
          })
          .catch(err => {
            console.log("Error", err);
          })
        });

        
    // // call Auth function
    // if(this.state.username && this.state.password) {
    //   AuthService(this.state).then((result) => {
    //     console.log("value of result: ", result)
    //   });
    // }
   


    // let user = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
    // fetch(`http://localhost:8000/api/login_check`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify(user)
          
    //     }).then(data => {
    //       data.json().then(results => {
    //         console.log('what is results; ', results);
    //       });
    //     });
    //     console.log('data: ', this.data)
}
  

  render() {
    
    return (
      <div className="container login-container h-100">
        
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                {/* <img
                  src="http://localhost:3000/logo.png"
                  class="brand_logo"
                  alt="Logo"
                ></img> */}
                <p>Connexion</p>
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form onSubmit={this.handleSubmit}>
                <div className="input-group mb-3">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    className="form-control input_user"
                    onChange={this.handleChange}
                    placeholder="Username"
                  ></input>
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className="form-control input_pass"
                    onChange={this.handleChange}
                    placeholder="Password"
                  ></input>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlInline"
                    ></input>
                    <label
                      className="custom-control-label"
                      htmlFor="customControlInline"
                    >
                      Rester connecté
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  {/* <button type="button" name="button" className="btn btn-success login_btn">
                    Login
                  </button> */}
                  <input className="form-submit btn btn-success" type="submit" value="Login"/>
                </div>
              </form>
            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-center links">
              Pas encore de compte ?{" "}
                <a href="/register" className="ml-2">
                S'inscrire!
                </a>
              </div>
              <div className="d-flex justify-content-center links">
                <a href="#">Mot de passe oublié?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { UserLoginComponent };
