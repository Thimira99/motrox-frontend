import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';
import styles from "./supplierCreate.module.css";

class supplierCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            supplierId: this.props.match.params.id,
            supplierName: '',
            supplierPhone: '',
            supplierAddress: '',
            supplierEmail: '',
            itemDescription: '',
            supplierJoinDate: '',
            paymentMethod: ''

        }
        this.changeSupplierNameHandler = this.changeSupplierNameHandler.bind(this);
        this.changeSupplierPhoneHandler = this.changeSupplierPhoneHandler.bind(this);
        this.changeSupplierAddressHandler = this.changeSupplierAddressHandler.bind(this);
        this.changeSupplierEmailHandler = this.changeSupplierEmailHandler.bind(this);
        this.changeItemDescriptionHandler = this.changeItemDescriptionHandler.bind(this);
        this.changeSupplierJoinDateHandler = this.changeSupplierJoinDateHandler.bind(this);
        this.changePaymentMethodHandler = this.changePaymentMethodHandler.bind(this);
        this.saveOrUpdateSupplier = this.saveOrUpdateSupplier.bind(this);
        
    }

    componentDidMount(){

        if(this.state.supplierId === '_add'){
            return
        }else{
            SupplierService.getSupplierById(this.state.supplierId).then((res) => {
                let supplier = res.data;
                this.setState({supplierName: supplier.supplierName,
                    supplierPhone: supplier.supplierPhone,
                    supplierAddress: supplier.supplierAddress,
                    supplierEmail: supplier.supplierEmail,
                    itemDescription: supplier.itemDescription,
                    supplierJoinDate: supplier.supplierJoinDate,
                    paymentMethod: supplier.paymentMethod
                });  
            });
       }

    }

    saveOrUpdateSupplier = (e) => {
        e.preventDefault();
        let supplier = {supplierName: this.state.supplierName,
                        supplierPhone: this.state.supplierPhone,
                        supplierAddress: this.state.supplierAddress,
                        supplierEmail: this.state.supplierEmail,
                        itemDescription: this.state.itemDescription,
                        supplierJoinDate: this.state.supplierJoinDate,
                        paymentMethod: this.state.paymentMethod,

                        };
        console.log('supplier => ' + JSON.stringify(supplier));

        if(this.state.supplierId === '_add'){
            SupplierService.createSupplier(supplier).then(res => {
                this.props.history.push('/supplierDetails');
            });
        }else{
            SupplierService.updateSupplier(supplier, this.state.supplierId).then(res => {
                this.props.history.push('/supplierDetails');
            });

            
        }

        
    }

    changeSupplierNameHandler = (event) => {
        this.setState({supplierName: event.target.value});
    }
    
    changeSupplierPhoneHandler = (event) => {
        this.setState({supplierPhone: event.target.value});
    }

    changeSupplierAddressHandler = (event) => {
        this.setState({supplierAddress: event.target.value});
    }

    changeSupplierEmailHandler = (event) => {
        this.setState({supplierEmail: event.target.value});
    }

    changeItemDescriptionHandler = (event) => {
        this.setState({itemDescription: event.target.value});
    }

    changeSupplierJoinDateHandler = (event) => {
        this.setState({supplierJoinDate: event.target.value});
    }

    changePaymentMethodHandler = (event) => {
        this.setState({paymentMethod: event.target.value});
    }

    cancel(){
        this.props.history.push('/supplierDetails');
    }

    getTitle(){
        if(this.state.supplierId === '_add'){
            return <h3 className= "text-center">Add Supplier</h3>
        }else{
            return <h3 className= "text-center">Update Supplier</h3>
        }
    }

    render() {
        return (
            
                        <div>
                            <br/><br/>
                            {
                                this.getTitle()
                            }
                            <br/>
                            <div className={styles.vcard}>
                                <form>
                                    <div className = {styles.inputs}>
                                        <label> Company/Supplier Name</label>
                                        <input placeholder="Enter Name" type= "text" name="supplierName" className= "form-control"
                                        value={this.state.supplierName} onChange= {this.changeSupplierNameHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Contact Number </label>
                                        <input placeholder="Phone Number" type= "text" name="supplierPhone" className= "form-control"
                                        value={this.state.supplierPhone} onChange= {this.changeSupplierPhoneHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Address </label>
                                        <input placeholder="Address" type= "text" name="supplierAddress" className= "form-control"
                                        value={this.state.supplierAddress} onChange= {this.changeSupplierAddressHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Email ID: </label>
                                        <input placeholder="Email" type= "text" name="supplierEmail" className= "form-control"
                                        value={this.state.supplierEmail} onChange= {this.changeSupplierEmailHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Item Description </label>
                                        <input placeholder="Item Description" type= "text" name="itemDescription" className= "form-control"
                                        value={this.state.itemDescription} onChange= {this.changeItemDescriptionHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Join Date </label>
                                        <input placeholder="Join Date " type= "date" name="supplierJoinDate" className= "form-control"
                                        value={this.state.supplierJoinDate} onChange= {this.changeSupplierJoinDateHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label> Payment Method </label>
                                        <input placeholder="Payment Method" type= "text" name="paymentMethod" className= "form-control"
                                        value={this.state.paymentMethod} onChange= {this.changePaymentMethodHandler}/>
                                    </div>

                                    <br/><br/>
                                    <div class = {styles.buttons}>

                                    <button className="btn btn-secondary" onClick={this.saveOrUpdateSupplier}>Save</button>
                                    <div class = {styles.divider}></div>
                                    <button className="btn btn-secondary" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </div>
                                </form>

                            </div>

                        </div>

               
        );
    }
}

export default supplierCreate;
