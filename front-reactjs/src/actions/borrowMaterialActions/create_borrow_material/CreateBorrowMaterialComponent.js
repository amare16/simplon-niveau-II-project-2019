import React, { Component } from 'react';

class CreateBorrowMaterialComponent extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            start_date: "",
            end_date: "",
            material: {
                id: "",
                name: "",
                description: "",
                availablity: Boolean()
            }
        }
    }


}
export { CreateBorrowMaterialComponent };