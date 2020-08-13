import React, { Component } from 'react';


class EditMaterialComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            availability: Boolean(),
            borrowed_date: "",
            return_date: ""
        };

        this.handleBorrowedDateChange = this.handleBorrowedDateChange.bind(this);
        this.handleReturnDateChange = this.handleReturnDateChange.bind(this);

    }

    componentWillMount() {
        this.getSingleMaterial();
    }

    getSingleMaterial() {
        let materialId = this.props.match.params.materialId;
        fetch(`http://localhost:8000/api/single-material/` + materialId,{
          method: "GET",
          mode: "cors"
        })
        .then(res => res.json())
        .then(resJson => {
          console.log("resJson details", resJson)
          this.setState({
            name: resJson.name,
            description: resJson.description,
            availability: resJson.availability,
            borrowed_date: resJson.borrowed_date,
            return_date: resJson.return_date
          }, () => {
              console.log(this.state);
          });
        })
        .catch(error => console.log(error))
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

  handleBorrowedDateChange(borrowedDateEvent) {
    this.setState({
        borrowed_date: borrowedDateEvent.target.value
    })
  }
  
  handleReturnDateChange(returnDateEvent) {
    this.setState({
        return_date: returnDateEvent.target.value
    })
  }

  editMaterial(newMaterial) {
    let token = localStorage.getItem('token');
    console.log("inside token: ", token)
    fetch(`http://localhost:8000/api/edit-material/${this.props.match.params.materialId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ` + token
      },
      body: JSON.stringify(this.state)
     
    })
    .then(response => {
      console.log("response from getDetails: ", response)
      this.props.history.push('/materials-list-by-user');
    })
    .catch(err => console.log(err));
  }

  handleSubmitAfterEditMaterial(e) {
    e.preventDefault();
    
    
    console.log("uuuuuuuuuu", this.props.match.params.materialId)
    let newMaterial = {
      name: this.state.name,
      description: this.state.description,
      availability: this.state.availability,
      borrowed_date: this.state.borrowed_date,
      return_date: this.state.return_date,
    };
    this.editMaterial(newMaterial);
}


    render() {
      console.log("borrowed date: ", this.state.borrowed_date);
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
              Edit Material
            </span>
          </h1>
        </div>
        <div class="material-section">
          <div class="container">
            <form onSubmit={this.handleSubmitAfterEditMaterial.bind(this)}>
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
                  <div className="form-group">
                    <h3 className="create-material-borrowed-date">Borrowed Date</h3>
                    <input
                      type="date"
                      className="form-control"
                      name="borrowed_date"
                      value={this.state.borrowed_date}
                      onChange={this.handleBorrowedDateChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <h3 className="create-material-return-date">Return Date</h3>
                    <input
                      type="date"
                      className="form-control"
                      name="return_date"
                      value={this.state.return_date}
                      onChange={this.handleReturnDateChange}
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
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
        )
    }
}
export {EditMaterialComponent};