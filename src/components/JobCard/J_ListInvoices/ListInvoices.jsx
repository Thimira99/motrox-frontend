import React, { Component } from 'react';
import InvoiceService from '../../../Services/InvoiceService';

import styles from "./List.module.css" 

class ListInvoices extends Component {
    constructor(props){
      super(props)
  this.state = {

      Invoices:[]
        
      }
    
    }



      componentDidMount(){
        InvoiceService.getAllInvoices().then((res) => {
            this.setState({ Invoices: res.data});
        });
        console.log(this.state.Invoices);

    }
    


      render() {
        return (
          <>
            <h2>Job Sheet List</h2>
            <div className={styles.topContainer}>
              <button className="btn btn-primary" onClick={this.jobSheetMain}>
                Add Job Sheet
              </button>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search "
                  name="s"
                />
                
              </div>
            </div>
            <div className={styles.table}>
              <div className="table  table-bordered">
                <thead>
                  <th>Invoice Number</th>
                  <th>Vehical Number</th>
                  <th>Total</th>
                  <th>Date</th>
                  
                  <th>Item Code</th>
                  <th>itemname</th>
                </thead>
                <tbody>
                  {this.state.Invoices.map(
                    InvoiceObj => 
                    <tr key={InvoiceObj.invoicId}>
                      <td>{InvoiceObj.invoiceNumber}</td>
                      <td>{InvoiceObj.vehicalNumber}</td>
                      <td>{InvoiceObj.totalAmount}</td>
                      <td>{InvoiceObj.date}</td>
                      <td>{InvoiceObj.billItemObj.map(ItemObj => <div>{ItemObj.itemcode}</div>)}</td>
                      <td>{InvoiceObj.billItemObj.map(ItemObj => <div>{ItemObj.itemname}</div>)}</td>
                    </tr>
                  )
                  }
                </tbody>
              </div>
            </div>
          </>
        );
      }
    }
    


export default ListInvoices;