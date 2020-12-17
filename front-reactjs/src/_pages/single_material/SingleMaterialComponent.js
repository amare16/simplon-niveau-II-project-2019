import React, { Component } from "react";
import "./singleMaterial.css";

class SingleMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      description: "",
      availability: Boolean(),
      imageFile: null,
      user: {
        username: "",
      },
      id_borrower: {
        username: "",
      },
      id_lender: {
        username: "",
      },
      material: {
        id: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getSingleMaterial();
  }

  getSingleMaterial() {
    let materialId = this.props.match.params.materialId;
    fetch(`http://localhost:8000/api/single-material/` + materialId, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("res json: ", resJson);
        this.setState({
          id: resJson.id,
          name: resJson.name,
          description: resJson.description,
          availability: resJson.availability,
          imageFile: resJson.imageFile,
          user: resJson.user,
        });
      });
    console.log("test: ", this.state.availability.toString());
  }
  

  handleSubmit(e) {
    console.log("I am clicked");
    e.preventDefault();

    let body = {
      id_borrower: {
        username: this.state.id_borrower,
      },
      id_lender: {
        username: this.state.id_lender,
      },
      material: {
        id: this.state.material,
      },
    };
    console.log("handle submit body: ", body);

    let token = localStorage.getItem("token");
    console.log(token)
    fetch(`http://localhost:8000/api/add-borrow-material`, {
      method: "post",
      headers: {
        "Authorization": `Bearer ` + token,
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((dataJson) => {
        console.log("data json: ", dataJson);
        
      })
      .catch((error) => {
        console.error("Material is not available : ", error);
      });
  }

  render() {
    
    let materialId = this.props.match.params.materialId;
    this.state.material = materialId;

    //console.log("params url: ", this.state.material.id)
    let username = localStorage.getItem("username");
    this.state.id_borrower = username;
    //console.log("borrower username: ", this.state.id_borrower.username);

    this.state.id_lender = this.state.user.username;
    //console.log("lender username: ", this.state.id_lender.username);

    let buttonAddActive = (
      <div className="form-group">
        <button type="button" class="btn btn-warning btn-pulsate">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            If you want to Borrow, <br />
            <span style={{ color: "white", fontWeight: "bold" }}>Click Me</span>
          </span>
        </button>
      </div>
    );

    let buttonAddDisable = (
      <div className="form-group">
        <button
          type="button"
          class="btn btn-warning btn-pulsate"
          disabled={true}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>
            I'm not available!
          </span>
        </button>
      </div>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-4">
            <div className="row">
              <div className="col col-md-12">
                <img src={this.state.imageFile} width="100" height="100" />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-12">
                <h3>{this.state.name}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col col-md-12">
                <p>
                  {this.state.availability == true ? (
                    <strong style={{ color: "green" }}>It is available!</strong>
                  ) : (
                    <strong style={{ color: "red" }}>
                      It is not available!
                    </strong>
                  )}
                </p>
              </div>
            </div>
            <div className="single_c_text text-md-left text-xs-center">
              <a href={"/borrow-lend-materials"}>
                <button className="btn btn-info">Back</button>
              </a>
            </div>
            <br />
            {this.state.availability ? (
              <div>
                <h4 style={{ textAlign: "center", color: "#008755" }}>
                  Material Borrower Information Add Form
                </h4>
                <form
                  className="form-inline"
                  
                  style={{ marginBottom: "100px" }}
                >
                  <div className="form-group">
                    <label style={{ marginRight: "10px" }}>
                      <strong>Material Borrower: </strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.id_borrower}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ marginRight: "35px" }}>
                      <strong>Material Lender: </strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.id_lender}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ marginRight: "85px" }}>
                      <strong>Material Id: </strong>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.material}
                    />
                  </div>
                  <div className="form-group">
        <button type="submit" onClick={this.handleSubmit} class="btn btn-warning btn-pulsate">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            If you want to Borrow, <br />
            <span style={{ color: "white", fontWeight: "bold" }}>Click Me</span>
          </span>
        </button>
      </div>
                  
                </form>
              </div>
            ) : (<p style={{color: "red", fontWeight: "bold", textAlign: "justify"}}>You cannot ask anything because the material is not available.</p>)}
          </div>

          <div className="col col-md-8">
            <div className="row">
              <div className="col col-md-2"></div>
              <div className="col col-md-8">
                <h1>Description</h1>
                <p style={{ textAlign: "justify" }}>{this.state.description}</p>
              </div>
              <div className="col col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export { SingleMaterialComponent };
