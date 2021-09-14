import React, { Component } from 'react';
import CustomerService from '../../../Services/CustomerService';
import  styles from "./customerList.module.css";

class customerList extends Component {
    constructor(props){
        super(props)

        this.state ={
            customers:[]
        }

        this.addCustomer= this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
    }
    
    deleteCustomer(id){
        CustomerService.deleteCustomer(id).then( res =>{
            this.setState({customers: this.state.customers.filter(customer => customer.customerid !==id)});
        });
    }
    viewCustomer(id){
        this.props.history.push(`/view-customer/${id}`);
    }

    editCustomer(id){
        this.props.history.push(`/update-customer/${id}`);
    }

    componentDidMount(){
        CustomerService.getCustomer().then((res) => {
            this.setState({customers:res.data});
        });
    }

    addCustomer(){
        this.props.history.push('/add-customer/_add');
    }
    render() {
        return (
            <div>
                <br/>
                <h2 className="text-center">Customers List</h2>
                
                    <button className="btn btn-primary" onClick={this.addCustomer}> Add Customer</button>
                    <br/><br/>
                
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Frist Name</th>
                                <th>Last Name</th>
                                <th>NIC</th>
                                
                                <th>Phone No</th>
                                <th> Email Id</th>
                                <th>Vehicle Reg No</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer=>
                                    <tr key = {customer.customerid}>
                                        <td className= {styles.aligning}>{customer.firstName}</td>
                                        <td className= {styles.aligning}>{customer.lastName}</td>
                                        <td className= {styles.aligning}>{customer.nic}</td>
                                        
                                        <td className= {styles.aligning}>{customer.phoneNo}</td>
                                        <td className= {styles.aligning}>{customer.email}</td>
                                        <td className= {styles.aligning}>{customer.vehicleRegNo}</td>
                                        <td className= {styles.actions}>
                                            <button onClick = { () => this.editCustomer(customer.customerid)} className ="btn btn-info btn-sm"> Update </button>&nbsp;
                                            <button  onClick = { () => this.viewCustomer(customer.customerid)} className ="btn btn-warning btn-sm"> View </button>&nbsp;
                                            <button  onClick = { () => this.deleteCustomer(customer.customerid)} className ="btn btn-danger btn-sm"> Delete </button>&nbsp;
                                        </td>
                                    </tr>
                                    
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default customerList;