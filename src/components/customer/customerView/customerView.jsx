import React, { Component } from 'react';

import CustomerService from '../../../Services/CustomerService';
import  styles from "./customerView.module.css";


class customerView extends Component {
    constructor(props){
        super (props)

        this.state = {
            customerid: this.props.match.params.id,
            customer:{}
        }
    }

    componentDidMount(){
        CustomerService.getCustomerById(this.state.customerid).then( res =>{
            this.setState({customer: res.data});
        });
    }

    render() {
        return (
            <div>
                
                    <br/><br/>
                    <h3 className = "text-center">View Customer Details</h3>
                    <br/>
                    <div className={styles.dcard}>
                        
                        <table class ={styles.details}>

                        <tr>
                            <td>First Name :</td>
                            <td>{this.state.customer.firstName} </td>
                        </tr>
                        <tr> 
                            <td>Last Name: </td>
                            <td>{this.state.customer.lastName} </td>
                        </tr>
                         <tr>
                            <td>NIC: </td>
                            <td>{this.state.customer.nic} </td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{this.state.customer.address} </td>
                        </tr>
                        <tr> 
                            <td>Phone No: </td>
                            <td>{this.state.customer.phoneNo} </td>
                        </tr>
                        <tr > 
                            <td>Email: </td>
                            <td>{this.state.customer.email} </td>
                        </tr>
                        <tr > 
                            <td>Vehicle Reg No: </td>
                            <td>{this.state.customer.vehicleRegNo} </td>
                        </tr>
                        </table>
                        <div class={styles.buttons}>
                        <button className ={styles.report}>Report</button>
                        </div>
                    </div>
                </div>
           
        );
    }
}

export default customerView;