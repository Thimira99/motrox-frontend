import React, { Component } from 'react';
import InvoiceService from '../../../Services/InvoiceService';
import { Form, Button, Table,Row,Col } from "react-bootstrap";

import styles from "./List.module.css" 

class ListInvoices extends Component {
    constructor(props){
      super(props)
  this.state = {

      Invoices:[]
        
      }
      this.editInvoice=this.editInvoice.bind(this);
      this.deleteInvoice=this.deleteInvoice.bind(this);
      this.addbtn=this.addbtn.bind(this);
    
    }



      componentDidMount(){
        InvoiceService.getAllInvoices().then((res) => {
            this.setState({ Invoices: res.data});
        });
        console.log(this.state.Invoices);

    }


    editInvoice(id){
      this.props.history.push(`/edit_JobCard/${id}`);
  }

  deleteInvoice(invoicId){
    this.props.history.push(`/delet-Invoice/${invoicId}`);
  }

  addbtn(){
    
    this.props.history.push('/jobcard');
    
  }

    


      render() {
        return (
          <>
            <h2>Job Sheet List</h2>
            <div className={styles.topContainer}>
            <div className={styles.saveButton}>
                          <button className="btn btn-secondary" onClick={this.addbtn}>
                          CREATE
                         </button>
                       </div> 
             
            </div>
           
            <div className="container p-3 my-3 bg-dark text-white">
              <Table striped bordered hover variant="dark"> 
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
                      <td><div className={styles.saveButton}>
                          <button className="btn btn-secondary" onClick={()=> this.editInvoice(InvoiceObj.invoicId)}>
                          Edit
                         </button>
                       </div> 
                      </td>

                      <td><div className={styles.saveButton}>
                          <button className="btn btn-secondary" onClick={()=> this.deleteInvoice(InvoiceObj.invoicId)}>
                          Delete
                         </button>
                       </div> 
                      </td>




                    </tr>
                  )
                  }
                </tbody>
                </Table>
              </div>
           
          </>
        );
      }
    }
    


export default ListInvoices;