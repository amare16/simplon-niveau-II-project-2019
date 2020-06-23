import React, { Component } from 'react';

class CreateBorrowMaterialComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            id_borrower:{
                username: ""
            },
            id_lender: {
                username: ""
            },
            start_date: "",
            end_date: "",
            material: {
                id: ""
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        
      let token = localStorage.getItem('token');
      fetch(`http://localhost:8000/api/add-borrow-material`, {
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
            <div>
                
            </div>
        )
    }


}
export { CreateBorrowMaterialComponent };