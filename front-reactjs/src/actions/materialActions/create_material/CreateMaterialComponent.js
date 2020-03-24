import React, { Component } from "react";
import "./createMaterial.css";

class CreateMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      availability: Boolean()
    };

  }

  handleNameChange(nameEvent) {
      this.setState({
          name: nameEvent.target.value
      })
  }

  handleDescriptionChange(descriptionEvent) {
    this.setState({
        description: descriptionEvent.target.value
    })
}

handleAvailabilityChange(availabilityEvent) {
    this.setState({
        availability: availabilityEvent.target.value
    })
}
  

  handleSubmit(e) {
      e.preventDefault();
      
      
    let token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/add-material`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ` + token },
            body: JSON.stringify(this.state)
    })
    .then(data => data.json())
    .then(dataJson => {
        console.log("data json: ", dataJson)
    })
  }

  render() {
    return (
      <section id="material">
        <div class="section-content">
          <h1 class="section-header">
            <span
              class="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              Add Material
            </span>
          </h1>
        </div>
        <div class="material-section">
          <div class="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div class="col-md-6 form-line">
                  <div class="form-group">
                    <label for="exampleInputUsername">Material Name</label>
                    <input
                      type="text"
                      name="material-name"
                      class="form-control"
                      id=""
                      value={this.state.name}
                      placeholder=" Enter Your Material Name"
                      onChange={this.handleNameChange.bind(this)}
                    />
                  </div>
                  <div class="form-check form-check-inline">
                  <label class="form-check-label" for="inlineRadio2">Availability</label>&nbsp;&nbsp;
                  &nbsp;
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value={this.state.availability}
                      onChange={this.handleAvailabilityChange.bind(this)}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="description"> Description</label>
                    <textarea
                      name="description"
                      class="form-control"
                      id="description"
                      value={this.state.description}
                      placeholder="Enter Your Description"
                      onChange={this.handleDescriptionChange.bind(this)}
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export { CreateMaterialComponent };
