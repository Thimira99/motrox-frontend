import React, { Component } from 'react';
import InvoiceService from '../../../Services/InvoiceService';
import { Form, Button, Table,Row,Col } from "react-bootstrap";
import swal from 'sweetalert';



import styles from "./List.module.css" 

class SearchJobcard extends Component {
    constructor(props){
      super(props)
  this.state = {

      Invoices:[],
      datefrom:'',
      dateto:'',
      amount1:'',
      amount2:'',
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
    var InvoiceNumber = this.state.InvoiceId;

console.log(InvoiceNumber);
console.log( VehiNumber);

if(InvoiceNumber!=="" || VehiNumber!==""){

if(InvoiceNumber===""){
  console.log("InvoiceNumber");
  InvoiceService.getVehicalSearch(VehiNumber).then((res) => {
    this.setState({ Invoices: res.data});
   let invoice=res.data;
   console.log(invoice);
  

});

}else if(VehiNumber===""){

  InvoiceService.findInvoiceNumber(InvoiceNumber).then((res) => {
    this.setState({ Invoices: res.data});
   let invoice=res.data;
   console.log(invoice);
  

});

}else {
  swal("Invalid Input!", "Enter Values to the Field!", "warning")
}

  
}else{


  swal("Field Values are empty!", "Enter valid Values to the Field!", "warning")



}



    


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
  swal("Amount Not Enterd !", "Enter AmountTo Search!", "warning")

    }else{
        if(isnum1==true && isnum2 == true){


            InvoiceService.getInvoiceBetweebId(Amount1,Amount2).then((res) => {
                this.setState({ Invoices: res.data});
               let invoice=res.data;
               console.log(invoice);
              
            
          });


        }else{
          swal("Enter Digites Only!", "Enter valid Values to the Field!", "warning")
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
            swal("Date Not Selected!", "Select Date!", "warning")
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
                <Col xs={9} style={{"margin-lefr":"12px"}}>

                   <div className={styles.input_group_amount}>
                    <label style={{"display":"block ruby"}}>Date From:</label>
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
<Col xs={3} style={{"margin-right":"125px"}}>
<div class="col-sm">


                    <label style={{"display":"block ruby"}}>Date To:</label>
                     <input  type="Date" placeholder="Customer Name" name="dateto"
                     name="date" 
                     value={this.state.dateto} onChange={this.changeDateHandlerto} />
                   
</div>
</Col>
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
                                             Search
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
        <Col style={{"marginLeft":"20px"}}>

           
            <label>Toal From:</label>
             <input placeholder="Enter First totoal" name="jobNumber"
             onChange={this.changeAmount1} value={this.state.amount1} />
           
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
            <label style={{"display":"block ruby"}}>Total To:</label>
             <input placeholder="Enter Second totoal" name="jobNumber"
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
      <Button style={{"margin-right": "12px","marginTop":"10px"}} size="sm" className="btn btn-secondary" variant="addsq" type="submit"  onClick={event => this.addtotal(event)}>
                                             Search
                                         </Button >
      </Row>

      <Row>

         {/* empty row below amount ...... */}
         

      </Row>

      <Row>
          
     
                  
        </Row>
</div>
</div>

<div class="row">

<div class="col-sm">

{/* First Form ...... */}

<Form>

<Row>
<Col style={{"marginLeft":"22px","marginBottom":"10px","marginTop":"25px"}}>

<div className={styles.input_group_amount}>
 <label>Search by ItemNumber:</label>
  <input placeholder="INV10098" name="jobNumber"
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

<Col style={{"marginBottom":"10px","marginTop":"25px"}}>
{/* second colomn empty ...... */}

<div class="col-sm">
<div className={styles.input_group_amount}>
 <label style={{"display":"block ruby"}}>Seach by vehicalNumber:</label>
  <input placeholder="HI-2090" name="jobNumber"
  onChange={this.changedbyVehicalNumber} value={this.state.Svehical}/>
</div>
</div>
</Col>
{/* Third colomn Toatl amount ...... */}

<div class="col-sm">
<Row>

</Row>

<Row>

{/* empty row below amount ...... */}


</Row>

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
<Button style={{"margin-right": "12px","marginTop":"35px"}} size="sm" className="btn btn-secondary" variant="addsq" type="submit"  onClick={event => this.getVehical(event)}>
                                  Search
                              </Button >
       
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






            <div className="container p-3 my-3 bg-secondary text-gradient bg-opacity-50 fw-bold">
              <Table striped bordered hover variant="secondary" class="table table-hover " class="table table-bordered">
                <thead  style={{'display': 'block'}} >
                  <th style={{"width":"150px","font-size":"small","fontSize":"15px"}}>Invoice Number</th>
                  <th style={{"width":"150px","font-size":"small","fontSize":"15px"}}>Vehical Number</th>
                  <th style={{"width":"150px","font-size":"small","fontSize":"15px"}}>Total</th>
                  <th style={{"width":"150px","font-size":"small","fontSize":"15px"}}>Date</th>
                  
                  <th style={{"width":"150px","font-size":"small","fontSize":"15px"}}>Item Code</th>
                  <th style={{"width":"390px","font-size":"small","fontSize":"15px"}}>itemname</th>
                  <th style={{"width":"200px","font-size":"small"}}></th>
                  <th style={{"width":"2px","font-size":"small"}}></th>
                </thead>
                <tbody style={{'height': '410px', 'overflow':'auto', 'display': 'block'}}>
                  {this.state.Invoices.map(InvoiceObj => 
                    <tr key={InvoiceObj.invoicId}>
                      <td style={{"width":"150px","font-size":"small"}}>{InvoiceObj.invoiceNumber}</td>
                      <td style={{"width":"150px","font-size":"small"}}>{InvoiceObj.vehicalNumber}</td>
                      <td style={{"width":"150px","font-size":"small"}}>{"Rs."+InvoiceObj.totalAmount+".00"}</td>
                      <td style={{"width":"150px","font-size":"small"}}>{InvoiceObj.date}</td>
                      <td style={{"width":"150px","font-size":"small"}}>{InvoiceObj.billItemObj.map(ItemObj => <div>{ItemObj.itemcode}</div>)}</td>

                      <td style={{"width":"5px","font-size":"small"}}>{InvoiceObj.billItemObj.map((ItemObj,index )=> <div>{index+1}</div>)}</td>

                      <td style={{"width":"370px","font-size":"small"}}>{InvoiceObj.billItemObj.map(ItemObj => <div>{ItemObj.itemname}</div>)}</td>
                      <td style={{"width":"90px","font-size":"small"}}><div className={styles.saveButton}>

                      <style type="text/css">
                                                       {`  
                                                           .btn-addD {
                                                           margin-top: 5px;
                                                            margin-left: 8px;
                                                            height: 25px;
                                                            font-size: small;
                                                            text-align: center;
                                                            width:55px;
                                                              
                                                            }
                                                            }
                                                              
                                                                
                                                                `}
                                                              </style>
                      <Button size="sm" className="btn btn-secondary" variant="addD" type="submit"  onClick={()=> this.editInvoice(InvoiceObj.invoicId)}>
                                                           View
                                                       </Button>

                        
                       </div> 
                      </td>
                      <style type="text/css">
                                                       {`  
                                                           .btn-addDel {
                                                            margin-top: 5px;
                                                            margin-left: 2px;
                                                            height: 25px;
                                                            font-size: small;
                                                            text-align: center;
                                                            width:55px;
                                                              
                                                            }
                                                            }
                                                              
                                                                
                                                                `}
                                                              </style>

                      <td style={{"width":"25px","font-size":"small"}}><div className={styles.saveButton}>
                      <Button size="sm" className="btn btn-secondary" variant="addDel" type="submit"  onClick={()=> this.deleteInvoice(InvoiceObj.invoicId)}>
                                                           Delete
                                                       </Button>
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