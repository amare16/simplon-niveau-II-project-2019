import React, { Component } from "react";

class CreateBorrowMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id_borrower: {
        username: "",
      },
      material: {
        id: "",
      },
      items: [
        {
          id: "",
          name: "",
          description: "",
          availability: Boolean(),
          user: {
            id: "",
            firstName: "",
            lastName: "",
            username: "",
            email: "",
          },
        },
      ],
    };
  }

  componentDidMount() {
    this.getAllMaterials();
  }

  handleIdBorrowerChange(event) {
    this.setState({
      id_borrower: event.target.value,
    });
  }

  handleMaterialChange(materialEvent) {
    this.setState({
      name: materialEvent.target.value,
    });
  }

  getAllMaterials() {
    fetch("http://localhost:8000/api/materials", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("list of materials : ", responseJson);
        this.setState({
          items: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleSubmit(e) {
    e.preventDefault();

    let body = {
        
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        items: [
            {
                name: this.state.items.name
            }
        ]
            ,
        id_borrower: {
            username: this.state.id_borrower
        }
      };
      console.log("handle submit body: ", body);

    let token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/add-borrow-material`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((dataJson) => {
        console.log("data json: ", dataJson);
      });
  }

  render() {
    let username = localStorage.getItem("username");

    return (
      <div className="container">
        <div className="row">
            <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-4">
                {/* {
                      this.state.items.map(item => {
                          username === item.user.username ? console.log("name: ", item.name) : console.log("uuuu")
                      })
                  } */}
                <select
                  className="custom-select my-1 mr-sm-2"
                  id="inlineFormCustomSelectPref"
                  //onChange={this.handleMaterialChange.bind(this)}
                >
                    <option value="select">Select who you are</option>
                  {this.state.items.map((item) =>
                    username === item.user.username ? (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ) : null
                  )}
                  
                </select>
              </div>
              <div className="col-md-4">
                {username === this.state.id_borrower.username
                  ? console.log("borrower username: ", username)
                  : console.log("test", this.state.id_borrower)}
                <div class="form-group">
                  <input
                    type="text"
                    value={username}
                    placeholder="Borrower username"
                    className="form-control"
                    id="receiverUsername"
                    name="receiverUsername"
                    //onChange={this.handleReceiverMessageChange.bind(this)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
            
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-4">
                <button className="btn btn-primary">Add Material Info</button>
              </div>

              <div className="col-md-3"></div>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
export { CreateBorrowMaterialComponent };
