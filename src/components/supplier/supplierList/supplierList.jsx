import React, { Component } from 'react';
import SupplierService from '../../../Services/SupplierService';
import styles from "./supplierList.module.css";

class supplierList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            suppliers: []

        }
        this.addSupplier = this.addSupplier.bind(this);
        this.editSupplier = this.editSupplier.bind(this);
        this.deleteSupplier = this.deleteSupplier.bind(this);
    }

    deleteSupplier(id){
        SupplierService.deleteSupplier(id).then(res => {
            this.setState({suppliers: this.state.suppliers.filter(supplier => supplier.supplierId !== id)});
        });
    }

    viewSupplier(id){
        this.props.history.push(`/view-supplier/${id}`);

    }

    editSupplier(id){
        this.props.history.push(`/add-supplier/${id}`);

    }

    componentDidMount(){
        SupplierService.getSuppliers().then((res) => {
            this.setState({ suppliers: res.data});
        });
    }

    addSupplier(){
        this.props.history.push('/add-supplier/_add');
    }
    
    render() {
        return (
            <div>
                <br/>
                <h2 className ="text-center">Suppliers List</h2>

                <br/>
                
                    <button className= {styles.addUpdate} onClick={this.addSupplier}> Add Supplier</button>
                <br/><br/>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Supplier Name</th>
                                <th> Contact Number</th>
                                <th> Address</th>
                                <th> Item Description</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.suppliers.map(
                                    supplier =>
                                    <tr key = {supplier.supplierId}>
                                        <td className= {styles.aligning}> { supplier.supplierName}</td>
                                        <td className= {styles.aligning}> { supplier.supplierPhone}</td>
                                        <td className= {styles.aligning}> { supplier.supplierAddress}</td>
                                        <td className= {styles.aligning}> { supplier.itemDescription}</td>
                                        <td className= {styles.actions}>
                                            <button onClick = { () => this.editSupplier(supplier.supplierId)} className= {styles.addUpdate}>Update</button>
                                            <button onClick = { () => this.viewSupplier(supplier.supplierId)} className= {styles.view}>View</button>
                                            <button onClick = { () => this.deleteSupplier(supplier.supplierId)} className= {styles.delete}>Delete</button>
                                            

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

export default supplierList;
