import React, { Component } from "react";
import "./singleMaterial.css";

class SingleMaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      description: "",
      availability: Boolean()
    };
  }

  componentDidMount() {
    this.getSingleMaterial();
  }

  getSingleMaterial() {
    let materialId = this.props.match.params.materialId;
    fetch(`http://localhost:8000/api/single-material/` + materialId, {
      method: "GET",
      mode: "cors"
    })
      .then(res => res.json())
      .then(resJson => {
        console.log("res json: ", resJson);
        this.setState({
          id: resJson.id,
          name: resJson.name,
          description: resJson.description,
          availability: resJson.availability
        });
      });
      console.log("test: ", this.state.availability.toString())
  }

  render() {
      
    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-2">
            <div className="row">
              <div className="col col-md-12">
                <img
                  src="https://cdn.manomano.com/beche-manche-en-fibre-creux-90-cm-P-149211-3213131_1.jpg"
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-12">
                <h3>{this.state.name}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col col-md-12">
                  
                <p>{
                     this.state.availability == true
                      ? <strong style={{color: "green"}}>It is available!</strong>
                      : <strong style={{color: "red"}}>It is not available!</strong>
                    }</p>
              </div>
            </div>
            <div className="single_c_text text-md-left text-xs-center">
                <a href={"/borrow-lend-materials"}><button className="btn btn-info">Back</button></a>
              </div>
          </div>
          <div className="col col-md-10">
              <div className="row">
                <div className="col col-md-2"></div>
                <div className="col col-md-8">
                <h1>Description</h1>
                    <p style={{textAlign: "justify"}}>
                      {this.state.description}
                    </p>
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
