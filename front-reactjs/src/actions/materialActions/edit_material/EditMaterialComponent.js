import React, { Component } from "react";

class EditMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      availability: Boolean(),
      borrowed_date: "",
      return_date: "",
    };

    this.handleBorrowedDateChange = this.handleBorrowedDateChange.bind(this);
    this.handleReturnDateChange = this.handleReturnDateChange.bind(this);
  }

  componentWillMount() {
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
        console.log("resJson details", resJson);
        this.setState(
          {
            name: resJson.name,
            description: resJson.description,
            availability: resJson.availability,
            borrowed_date: resJson.borrowed_date,
            return_date: resJson.return_date,
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((error) => console.log(error));
  }

  handleNameChange(nameEvent) {
    this.setState({
      name: nameEvent.target.value,
    });
  }

  handleDescriptionChange(descriptionEvent) {
    this.setState({
      description: descriptionEvent.target.value,
    });
  }

  handleAvailabilityChange(availabilityEvent) {
  
    this.setState(initialState => ({
      isApple: !initialState.isAvocado,
    }));
  }

  handleAvailabilityChange = () => {
    this.setState(availabilityEvent => ({
      availability: !availabilityEvent.availability,
    }));
  }

  handleBorrowedDateChange(borrowedDateEvent) {
    this.setState({
      borrowed_date: borrowedDateEvent.target.value,
    });
  }

  handleReturnDateChange(returnDateEvent) {
    this.setState({
      return_date: returnDateEvent.target.value,
    });
  }

  handleImageFileMaterialOnChange(imageMaterialEvent) {
    let imageFile = imageMaterialEvent.target.files[0];
    this.setState({ imageFile: imageFile });
  }

  cancelEditMaterial = () => {
    window.history.back();
  };

  editMaterial(newMaterial) {
    let token = localStorage.getItem("token");
    console.log("inside token: ", token);

    let name = this.state.name;
    let description = this.state.description;
    let availability = this.state.availability;
    let borrowed_date = this.state.borrowed_date;
    let return_date = this.state.return_date;
    let imageFile = this.state.imageFile;

    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("availability", availability);
    formData.append("borrowed_date", borrowed_date);
    formData.append("return_date", return_date);
    formData.append("imageFile", imageFile);

    console.log("form data result: ", formData);

    fetch(
      `http://localhost:8000/api/edit-material/${this.props.match.params.materialId}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": `Bearer ` + token,
        },
        body: formData,
      }
    )
      .then((response) => {
        console.log("response from getDetails: ", response);
        if(response.status !== 500) {
        this.props.history.push("/materials-list-by-user");
        }
      })
      .catch((err) => console.log(err));
  }

  handleSubmitAfterEditMaterial(e) {
    e.preventDefault();

    console.log("uuuuuuuuuu", this.props.match.params.materialId);
    let newMaterial = {
      name: this.state.name,
      description: this.state.description,
      availability: this.state.availability,
      borrowed_date: this.state.borrowed_date,
      return_date: this.state.return_date,
      imageFile: this.state.imageFile
    };
    this.editMaterial(newMaterial);
  }

  render() {
    console.log("availability: ", this.state);
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
                    <label class="form-check-label" for="inlineRadio2">
                      Availability
                    </label>
                    &nbsp;&nbsp; &nbsp;
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="inlinecheckbox"
                      id="inlinecheckbox"
                      checked={this.state.availability}
                      onChange={this.handleAvailabilityChange.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <h3 className="create-material-borrowed-date">
                      Borrowed Date
                    </h3>
                    <input
                      type="date"
                      className="form-control"
                      name="borrowed_date"
                      value={this.state.borrowed_date}
                      onChange={this.handleBorrowedDateChange}
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
                  <div class="form-group">
                    <label for="imageFile"><h3>Update Your Picture</h3></label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileMaterialOnChange.bind(this)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-danger"
                      onClick={this.cancelEditMaterial.bind(this)}
                    >
                      Cancel
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
export { EditMaterialComponent };
