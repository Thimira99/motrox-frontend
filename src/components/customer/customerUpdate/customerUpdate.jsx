import React, { Component } from 'react';

import CustomerService from '../../../Services/CustomerService';
import  styles from "./customerUpdate.module.css";

class customerUpdate extends Component {
    constructor(props){
        super(props)

        this.state={
            customerid: this.props.match.params.id,
            firstName:'',
            lastName:'',
            nic:'',
            address:'',
            phoneNo:'',
            email:'',
            vehicleRegNo:'',

        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler =this.changeLastNameHandler.bind(this);
        this.changenicHandler =this.changenicHandler.bind(this);
        this.changeaddressHandler =this.changeaddressHandler.bind(this);
        this.changephoneNoHandler =this.changephoneNoHandler.bind(this);
        this.changeemailHandler =this.changeemailHandler.bind(this);
        this.changevehicleRegNoHandler =this.changevehicleRegNoHandler.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        
        }
    componentDidMount(){
        CustomerService.getCustomerById(this.state.customerid).then( (res) =>{
            let customer = res.data;
            this.setState({firstName: customer.firstName,
                lastName: customer.lastName,
                nic: customer.nic,
                address: customer.address,
                phoneNo: customer.phoneNo,
                email: customer.email,
                vehicleRegNo: customer.vehicleRegNo
            });
        });
    }

    updateCustomer = (e)=> {
        e.preventDefault();
            let customer = {firstName: this.state.firstName, lastName: this.state.lastName, nic: this.state.nic, address: this.state.address,
            phoneNo: this.state.phoneNo, email: this.state.email, vehicleRegNo: this.state.vehicleRegNo};
            console.log('customer =>' + JSON.stringify(customer));
            CustomerService.updateCustomer(customer, this.state.customerid).then(res =>{
                this.props.history.push('/customerDetails');
            });
    
    }
    
    changeFirstNameHandler = (event)=> {
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler = (event)=>{
        this.setState({lastName: event.target.value});
    }   
    changenicHandler = (event)=>{
        this.setState({nic: event.target.value});
    }
    changeaddressHandler = (event)=>{
        this.setState({address: event.target.value});
    }
    changephoneNoHandler = (event)=>{
        this.setState({phoneNo: event.target.value});
    }
    changeemailHandler = (event)=>{
        this.setState({email: event.target.value});
    }
    changevehicleRegNoHandler = (event)=>{
        this.setState({vehicleRegNo: event.target.value});
    }
    cancel(){
        this.props.history.push('/customerDetails');
    }
    render() {
        return (
            <div>
               <br/>
                            <h3 className="text-center">Update Customer</h3><br/>
                            <div className={styles.vcard}>
                                
                                <form>

                                    <div className={styles.inputs}>
                                        <label>First Name:</label>
                                        <input type="text" placeholder="First Name" name="firstName" className="form-control"
                                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>

                                    <div className={styles.inputs}>
                                        <label>Last Name:</label>
                                        <input type="text" placeholder="Last Name" name="lastName" className="form-control"
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>

                                    <div className={styles.inputs}>
                                        <label>NIC:</label>
                                        <input type="text" placeholder="NIC" name="nic" className="form-control"
                                        value={this.state.nic} onChange={this.changenicHandler}/>
                                    </div>
                                    <div className={styles.inputs}>
                                        <label>Address:</label>
                                        <input type="text" placeholder="Address" name="address" className="form-control"
                                        value={this.state.address} onChange={this.changeaddressHandler}/>
                                    </div>
                                    <div className={styles.inputs}>
                                        <label>Phone No:</label>
                                        <input type="text" placeholder="Phone Number" name="phoneNo" className="form-control"
                                        value={this.state.phoneNo} onChange={this.changephoneNoHandler}/>
                                    </div>
                                    <div className={styles.inputs}>
                                        <label>Email:</label>
                                        <input type="text" placeholder="Email Address" name="email" className="form-control"
                                        value={this.state.email} onChange={this.changeemailHandler}/>
                                    </div>
                                    <div className={styles.inputs}>
                                        <label>Vehicle Reg No:</label>
                                        <input type="text" placeholder="Vehicle Reg No" name="vehivleRegNo" className="form-control"
                                        value={this.state.vehicleRegNo} onChange={this.changevehicleRegNoHandler}/>
                                    </div>

                                    <div class={styles.buttons}>
                                    <button className="btn btn-secondary" onClick={this.updateCustomer}>save</button>
                                    <div class={styles.divider}></div>
                                    <button className="btn btn-secondary" onClick={this.cancel.bind(this)} style={{margingleft:"10px"}}> Cancel </button>
                                    </div>
                                </form>
                            </div>

                        </div>
                   

                
           
        )
    }
}

export default customerUpdate;