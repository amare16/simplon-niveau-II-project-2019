import React from "react";
import { Redirect } from "react-router-dom";
//import { NavbarComponent } from "../_components/NavbarComponent";

class UserLoginComponent extends React.Component {
  constructor(props) {
    super(props);

    const { history } = this.props;
    

    this.state = {
      username: '',
      password: '',
      loginError: 'ldlldld',
      redirect: false,
      liked: Number,
      disliked: Number
    }
    //console.log('this state value: ', this.state)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange = (type, e) => {
    switch (type) {
      case 'username':
        this.setState({ username: e.target.value });
        console.log("event: ", e.target.value)
        break;
      
      case 'password':
        this.setState({ password: e.target.value });
        break;
    }
    
  }

  // handleChange(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   console.log(name, value);
  // }

  handleSubmit(e){
    e.preventDefault();
    //console.log("SUBMITTING", this.state);
    let userData = {
      username: this.state.username,
      password: this.state.password
    };

    

    
      fetch(`http://localhost:8000/api/login_check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData),
          
        })
        .then(res => {
          
          if (res.status === 200) {
            res.json().then(data => {
              
              let user = {
                token: data.token,
                username: userData.username
              }
              //console.log("data value: ", userData.username)
             //console.log("test json stringfy:",JSON.stringify({token: data.token, username: userData.username}))
             localStorage.setItem('token', data.token);
             localStorage.setItem('username', userData.username);

              
              this.props.history.push('/dashboard')
            })
            
            //this.setState({ redirect: true })
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again');
        })       
    
}
  

  render() {
    // if(this.state.redirect) {
    //   console.log("why it is not redirect? ", this.state.redirect);
    //   return (<Redirect to={'/dashboard'} />)
    // }

    if(localStorage.getItem("token")) {
      return (<Redirect to={'/dashboard'} />)
    }
   
    return (
      <div className="container login-container h-100">
        
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                {/* <img
                  src="http://localhost:3000/logo.png"
                  className="brand_logo"
                  alt="Logo"
                ></img> */}
                <p>Connexion</p>
              </div>
            </div>
            <div className="d-flex justify-content-center form-container">
              <form onSubmit={this.handleSubmit} className="form">
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
                    onChange={(e) => this.handleChange('username', e)}
                    placeholder="Username"
                    required
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
                    onChange={(e) => this.handleChange('password', e)}
                    placeholder="Password"
                    required
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
