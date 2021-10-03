import React, { Component } from 'react';
import OrderServices from '../../../Services/OrderServices';
import { Button } from 'reactstrap';



class ViewOrder extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            order: {}

        }
    }

    componentDidMount(){
        OrderServices.getOrdersById(this.state.id).then (res => {
            this.setState({order: res.data});
            })

    }
  
    


        

    
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h2 className = "text-center">MOTROX AUTOMOBILES</h2>
                    <h3 className = "text-center">View Order Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>Order ID: </label>
                            <div>{this.state.order.id}</div>

                        </div>
                        <div className = "row">
                            <label>Date: </label>
                            <div>{this.state.order.date}</div>

                        </div>
                        <div className = "row">
                            <label>Supplier: </label>
                            <div>{this.state.order.supplier}</div>

                        </div>
                        <div className = "row">
                            <label>Item Code: </label>
                            <div>{this.state.order.itemCode}</div>

                        </div>
                        <div className = "row">
                            <label>Item Name: </label>
                            <div>{this.state.order.itemName}</div>

                        </div>
                        <div className = "row">
                            <label>Quantity: </label>
                            <div>{this.state.order.quantity}</div>

                        </div>
                        <div className = "row">
                            <label>Price: </label>
                            <div>{this.state.order.price}</div>

                        </div>
                        <div className = "row">
                            <label>Total Price: </label>
                            <div>{this.state.order.totalPrice}</div>

                        </div>

                        <div style = {{textAlign:'center'}}><br/>
                            <Button onClick = {this.pdfGenerate}>Generate PDF</Button>
                        </div>
                        
                        
                        

                    </div>

                    

                </div>
            </div>
        );
    }
}

export default ViewOrder;