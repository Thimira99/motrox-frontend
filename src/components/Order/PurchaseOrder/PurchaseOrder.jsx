import React, { Component } from 'react';
import OrderServices from '../../../Services/OrderServices';

class PurchaseOrder extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id, 
            date: '',
            supplier: '',
            itemcode: '',
            itemname: '',
            quantity: '',
            price: '',
            totalprice: ''

        }
        this.changedateHandler = this.changedateHandler.bind(this);
        this.changesupplierHandler = this.changesupplierHandler.bind(this);
        this.changeitemCodeHandler = this.changeitemCodeHandler.bind(this);
        this.changeitemNameHandler = this.changeitemNameHandler.bind(this);
        this.changequantityHandler = this.changequantityHandler.bind(this);
        this.changepriceHandler = this.changepriceHandler.bind(this);
        this.changetotalPriceHandler = this.changetotalPriceHandler.bind(this);
        this.saveOrUpdateOrder = this.saveOrUpdateOrder.bind(this);
 
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }
        else{
            OrderServices.getOrdersById(this.state.id).then( (res) => {
                let order = res.data;
                this.setState({
                    date: order.date,
                    supplier: order.supplier,
                    itemCode: order.itemCode,
                    itemName: order.itemName,
                    quantity: order.quantity,
                    price: order.price,
                    totalPrice: order.totalPrice,
                });
            }); 

        }
        
    }

    saveOrUpdateOrder = (e) =>{
        e.preventDefault();
        let order = {date: this.state.date, 
            supplier: this.state.supplier, 
            itemCode: this.state.itemCode, 
            itemName: this.state.itemName, 
            quantity: this.state.quantity, 
            price: this.state.price, 
            totalPrice: this.state.totalPrice };
            
        console.log('order =>' +JSON.stringify(order));

        if(this.state.id === '_add'){
            OrderServices.createorders(order).then(res =>{
                this.props.history.push('/purchaseOrder');
    
            });
        }
        else{
            OrderServices.updateorders(order, this.state.id).then (res => {
                this.props.history.push('/purchaseOrder')
    
            }); 
             

        }

    }

    changedateHandler = (event) => {
        this.setState({date: event.target.value});
    }

    changesupplierHandler = (event) => {
        this.setState({supplier: event.target.value});
    }

    changeitemCodeHandler = (event) => {
        this.setState({itemCode: event.target.value});
    }

    changeitemNameHandler = (event) => {
        this.setState({itemName: event.target.value});
    }

    changequantityHandler = (event) => {
        this.setState({quantity: event.target.value});
    }

    changepriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    changetotalPriceHandler = (event) => {
        this.setState({totalPrice: event.target.value});
    }
    cancel(){
        this.props.history.push('/purchaseOrder');

    }

    getTitle(){
        if(this.state.id === '_add'){
           return  <h3 className = "text-center">Create Order Form</h3>
           
        }
        else{
            return <h3 className = "text-center">Update Order Form</h3>
        }
    }
  
    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                    <label>Date</label>
                                        <input type = "date" 
                                        placeholder = "date" 
                                        name = "date" 
                                        className = "form-control"
                                        value = {this.state.date} onChange = {this.changedateHandler}/> 
                                    </div>

                                    <div className = "form-group">
                                        <label>Supplier</label>
                                        <input placeholder = "supplier"
                                        name = "supplier"
                                        className = "form-control"
                                        value = {this.state.supplier} onChange = {this.changesupplierHandler}/>

                                    </div>

                                    <div className = "form-group">
                                        <label>Item Code</label>
                                        <input placeholder = "item code"
                                        name = "itemCode"
                                        className = "form-control"
                                        value = {this.state.itemCode} onChange = {this.changeitemCodeHandler}/>

                                    </div>

                                    <div className = "form-group">
                                        <label>Item Name</label>
                                        <input placeholder = "item name"
                                        name = "itemName"
                                        className = "form-control"
                                        value = {this.state.itemName} onChange = {this.changeitemNameHandler}/>

                                    </div>

                                    <div className = "form-group">
                                        <label>Quantity</label>
                                        <input placeholder = "quantity"
                                        name = "quantity"
                                        className = "form-control"
                                        value = {this.state.quantity} onChange = {this.changequantityHandler}/>

                                    </div>

                                    <div className = "form-group">
                                        <label>Price</label>
                                        <input placeholder = "price"
                                        name = "price"
                                        className = "form-control"
                                        value = {this.state.price} onChange = {this.changepriceHandler}/>

                                    </div>

                                    <div className = "form-group">
                                        <label>Total Price</label>
                                        <input placeholder = "total price"
                                        name = "totalPrice"
                                        className = "form-control"
                                        value = {this.state.totalPrice} onChange = {this.changetotalPriceHandler}/>

                                    </div>

                                    <button className = "btn btn-success" onClick = {this.saveOrUpdateOrder}>Save</button>
                                    <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>

                                    
                                     

                                </form>

                            </div>

                        </div>

                    </div>

                </div>
         </div>
         
        );
    }
}

export default PurchaseOrder;