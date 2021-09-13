import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';
import styles from "./supplierView.module.css";

class supplierView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            supplierId: this.props.match.params.id,
            supplier: {}
            
        }
    }

    componentDidMount(){
        SupplierService.getSupplierById(this.state.supplierId).then(res => {
                this.setState({supplier: res.data});
            });
    }

    render() {
        return (
            <div>
                <br/><br/>
                    <h3 className = "text-center"> View Supplier Details</h3>
                    <br/>
                    <div className={styles.dcard}>
                        <table className ={styles.details}>
                        <tr>   
                            <td>Company/Supplier Name: </td>
                            <td> { this.state.supplier.supplierName }</td>
                        </tr>
                        <tr> 
                            <td>Contact Number: </td>
                            <td>{ this.state.supplier.supplierPhone }</td>
                        </tr>
                        <tr> 
                            <td> Address: </td>
                            <td>{ this.state.supplier.supplierAddress }</td>
                        </tr>
                        <tr>
                            <td>Email ID: </td>
                            <td>{ this.state.supplier.supplierEmail }</td>
                        </tr>
                        <tr>
                            <td>Item Description: </td>
                            <td>{ this.state.supplier.itemDescription }</td>
                        </tr>
                        <tr>
                            <td> Join Date:  </td>
                            <td>{ this.state.supplier.supplierJoinDate }</td>
                        </tr>
                        <tr>
                            <td> Payment Method: </td>
                            <td>{ this.state.supplier.paymentMethod }</td>
                         </tr>
                         </table>

                         <div className = {styles.buttons}>
                             <button className= {styles.report}>Report</button>
                         </div>
                    </div>
                
                
            </div>
        );
    }
}

export default supplierView;
