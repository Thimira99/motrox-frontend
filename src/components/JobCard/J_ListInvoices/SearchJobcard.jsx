import React, { Component } from 'react';
import InvoiceService from '../../../Services/InvoiceService';
import { Form, Button, Table,Row,Col } from "react-bootstrap";

import styles from "./List.module.css" 

class SearchJobcard extends Component {
    constructor(props){
      super(props)
  this.state = {

      Invoices:[],
      datefrom:'',
      dateto:'',
      amount1:0,
      amount2:0,
      Svehical:'',
      InvoiceId:''
        
      }
      this.editInvoice=this.editInvoice.bind(this);
      this.deleteInvoice=this.deleteInvoice.bind(this);
      this.addbtn=this.addbtn.bind(this);
      this.changeDateHandlerfrom=this.changeDateHandlerfrom.bind(this);
      this.changeDateHandlerto=this.changeDateHandlerto.bind(this);
      this.changeAmount1=this.changeAmount1.bind(this);
      this.changeAmount2=this.changeAmount2.bind(this);
      this.changedbyVehicalNumber=this.changedbyVehicalNumber.bind(this);
      this.changeInviyceId=this.changeInviyceId.bind(this);
     
    
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

changeDateHandlerfrom(event){
    this.setState({datefrom: event.target.value})
}

changeDateHandlerto(event){
  this.setState({dateto: event.target.value})
}

changeAmount1(event){
    this.setState({amount1: event.target.value})
  }

  changeAmount2(event){
    this.setState({amount2: event.target.value})
  }

  changedbyVehicalNumber(event){
    this.setState({Svehical: event.target.value})
  }

  changeInviyceId(event){
    this.setState({InvoiceId: event.target.value})
  }


getVehical =( event) =>{

    event.preventDefault();

    var VehiNumber = this.state.Svehical;
    var InvoiceNumber = this.state.invoicId;


    InvoiceService.findInvoiceNumber(InvoiceNumber).then((res) => {
        this.setState({ Invoices: res.data});
       let invoice=res.data;
       console.log(invoice);
      
    
  });

    InvoiceService.getVehicalSearch(VehiNumber).then((res) => {
        this.setState({ Invoices: res.data});
       let invoice=res.data;
       console.log(invoice);
      
    
  });



  }


addtotal =( event) =>{
    event.preventDefault();

    var Amount1 = this.state.amount1;
    var Amount2 = this.state.amount2;

    console.log(Amount1);
    let isnum1 = /^\d+$/.test(Amount1);
    console.log(isnum1);

    console.log(Amount2);
    let isnum2 = /^\d+$/.test(Amount2);
    console.log(isnum2);


if(Amount1==="" && Amount2===""){
        alert("Empty fields ");

    }else{
        if(isnum1==true && isnum2 == true){


            InvoiceService.getInvoiceBetweebId(Amount1,Amount2).then((res) => {
                this.setState({ Invoices: res.data});
               let invoice=res.data;
               console.log(invoice);
              
            
          });


        }else{
            alert("Enter digit only ");
        }
    }

}






    //time add in here ........

    adddate =( event) =>{
        event.preventDefault();
  
        var datefirst = this.state.datefrom
        var datesecond = this.state.dateto
        console.log(datefirst);

        if(datefirst===""){
            console.log("inside if");
            alert("Select Date")
        }else{
  
       
  //Second date change
  const formatDate2 = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };
  const formattedDate2 = formatDate2(datesecond);
  
  
  //first date change
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };
  
  const formattedDate = formatDate(datefirst);
  
  
  console.log(formattedDate);
  console.log(formattedDate2);
  
  

        console.log(datesecond);
  
        InvoiceService.getInvoiceBetweebdate(formattedDate,formattedDate2).then((res) => {
            this.setState({ Invoices: res.data});
           let invoice=res.data;
           console.log(invoice);
          
        
      });
  
  
      }
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
           
 {/* First Card ...... */}
            
 <div className="container p-3 my-80 bg-secondary text-gradient bg-opacity-50 fw-bold">

<div class="container">
   <div class="row">
      <div class="col-sm">

        {/* First Form ...... */}

          <Form>

             <Row>
                <Col>

                   <div className={styles.input_group_amount}>
                    <label>Invoice Number 1:</label>
                     <input type="Date" placeholder="Customer Name" name="datefrom"
                     name="date" 
                     value={this.state.datefrom} onChange={this.changeDateHandlerfrom} />
                   </div>
               </Col>
              
               
              </Row>


             <Row>
                <Col >
                <label></label>
                </Col>
             </Row>
          </Form>
        </div>


{/* second colomn empty ...... */}

<div class="col-sm">

<div className={styles.input_group_amount}>
                    <label>Invoice Number 2:</label>
                     <input type="Date" placeholder="Customer Name" name="dateto"
                     name="date" 
                     value={this.state.dateto} onChange={this.changeDateHandlerto} />
                   </div>
</div>

{/* Third colomn Toatl amount ...... */}

<div class="col-sm">
              <Row>
              <style type="text/css">
                                    {`
                                       .btn-adds {
                                           width: 85px;
                                           margin-left: auto;
                                           margin-top:20px;
                                                  }
                                                 }
                                     `}
                                 </style>

                                         <Button size="sm" className="btn btn-secondary" variant="adds" type="submit"  onClick={event => this.adddate(event)}>
                                             Save
                                         </Button >
              </Row>

            
  </div>
</div>
</div>
           <div class="row">

           <div class="col-sm">

{/* First Form ...... */}

  <Form>

     <Row>
        <Col>

           <div className={styles.input_group_amount}>
            <label>Toal amount 1:</label>
             <input placeholder="Customer Name" name="jobNumber"
             onChange={this.changeAmount1} value={this.state.amount1} />
           </div>
       </Col>
       

        <Col >
        
         </Col>
      </Row>

      <Row>
         <Col>
       
        </Col>
      </Row>

     <Row>
          <Col >
          
         </Col>
     </Row>


     <Row>
         <Col>
         
         </Col>
     </Row>

     <Row>
        <Col >
        
        </Col>
     </Row>
  </Form>
</div>


{/* second colomn empty ...... */}

<div class="col-sm">
<div className={styles.input_group_amount}>
            <label>Toal amount 2:</label>
             <input placeholder="Customer Name" name="jobNumber"
             onChange={this.changeAmount2} value={this.state.amount2}/>
           </div>
</div>

{/* Third colomn Toatl amount ...... */}

<div class="col-sm">
      <Row>
      <style type="text/css">
                                    {`
                                       .btn-addsq {
                                           width: 85px;
                                           margin-left: auto;
                                           margin-right: 12px
                                           margin-top:20px;
                                                  }
                                                 }
                                     `}
                                 </style>
      <Button style={{"margin-right": "12px"}} size="sm" className="btn btn-secondary" variant="addsq" type="submit"  onClick={event => this.addtotal(event)}>
                                             Search
                                         </Button >
      </Row>

      <Row>

         {/* empty row below amount ...... */}
         <label>Invoice Number:</label>

      </Row>

      <Row>
          
      <label>Invoice Number:</label>
                  
        </Row>
</div>
</div>

<div class="row">

<div class="col-sm">

{/* First Form ...... */}

<Form>

<Row>
<Col>

<div className={styles.input_group_amount}>
 <label>Search by ItemNumber:</label>
  <input placeholder="Customer Name" name="jobNumber"
  onChange={this.changeInviyceId} value={this.state.InvoiceId} />
</div>
</Col>


<Col >

</Col>
</Row>

<Row>
<Col>

</Col>
</Row>

<Row>
<Col >

</Col>
</Row>


<Row>
<Col>

</Col>
</Row>

<Row>
<Col >

</Col>
</Row>
</Form>
</div>


{/* second colomn empty ...... */}

<div class="col-sm">
<div className={styles.input_group_amount}>
 <label>Seach by vehicalNumber:</label>
  <input placeholder="Customer Name" name="jobNumber"
  onChange={this.changedbyVehicalNumber} value={this.state.Svehical}/>
</div>
</div>

{/* Third colomn Toatl amount ...... */}

<div class="col-sm">
<Row>
<style type="text/css">
                         {`
                            .btn-addsq {
                                width: 85px;
                                margin-left: auto;
                                margin-right: 12px
                                margin-top:20px;
                                       }
                                      }
                          `}
                      </style>
<Button style={{"margin-right": "12px"}} size="sm" className="btn btn-secondary" variant="addsq" type="submit"  onClick={event => this.getVehical(event)}>
                                  Search3
                              </Button >
</Row>

<Row>

{/* empty row below amount ...... */}


</Row>

<Row>


       
</Row>
</div>
</div>





             
</div>





                  <style type="text/css">
                      {`
                         .btn-save {
                          margin-left: 1150px;
                          padding-left: 35px;
                          padding-right: 35px
                                   }
                      `}
                   </style>






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
    


export default SearchJobcard;