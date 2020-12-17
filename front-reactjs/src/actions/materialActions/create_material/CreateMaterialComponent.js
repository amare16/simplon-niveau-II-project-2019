import React, { Component } from "react";
import "./createMaterial.css";

class CreateMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      availability: Boolean(),
      borrowed_date: "",
      return_date: "",
      imageFile: null
    };
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
  handleImageFileArticleOnChange(imageFileCreateEvent) {
    let imageFile = imageFileCreateEvent.target.files[0];
    this.setState({ imageFile: imageFile });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    // this.setState({ name: "" });
    // this.setState({ description: "" });
    // this.setState({ availability: false });
    // this.setState({ borrowed_date: "" });
    // this.setState({ return_date: "" });
    // this.setState({imageFile: null });

    let formData = new FormData();
    
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('availability', this.state.availability);
    formData.append('borrowed_date', this.state.borrowed_date);
    formData.append('return_date', this.state.return_date);
    formData.append('imageFile', this.state.imageFile);

    console.log("form data value: ", formData);

    let token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/add-material`, {
      method: "post",
      headers: {
        "Authorization": `Bearer ` + token,
      },
      body: formData,
    })
      .then((data) => data.json())
      .then((dataJson) => {
        console.log("data json: ", dataJson);
        this.props.history.push("/borrow-lend-materials");
      });
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
                      required
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
                      onChange={this.handleBorrowedDateChange.bind(this)}
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
                      onChange={this.handleReturnDateChange.bind(this)}
                      required
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
                    <label for="imageFile"><h3>Upload Your Picture</h3></label>
                    <input
                      type="file"
                      name="imageFile"
                      class="form-control"
                      id="imageFile"
                      onChange={this.handleImageFileArticleOnChange.bind(this)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Add Material
                    </button>&nbsp;&nbsp;
                    <a href={"/borrow-lend-materials"}>
                      <input
                        type="button"
                        className="btn btn-success"
                        value="Back to List of Materials"
                      />
                    </a>
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
