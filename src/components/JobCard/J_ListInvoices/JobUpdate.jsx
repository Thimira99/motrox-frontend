
import { Form, Button, Table,Row,Col,Card ,FloatingLabel,InputGroup} from "react-bootstrap";
import { createRef, Component } from 'react';
import InvoiceService from "../../../Services/InvoiceService";
import styles from "./Update.module.css"
import vehicleService from "../../../Services/vehicleService";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



class JobUpdate extends Component {
  constructor(props){
    super(props)

    this.state={
        
      vehicals:[],
      Invoices:[],
      vehicals:[],
        invoicId:this.props.match.params.id,
        invoiceNumber:'',
        vehicalNumber:'',
        totalAmount:'',
        date:'',
        itemcode:'',
        itemname:'',
        billId:'',
        price:'',
        amount:'',
        qty:'',

        billItemObj:[],

        getItems:[],


       items:[], 
       temcode: '',
       itemname: '',
       price: '',
       amount: '',
       qty:'',

       datetoday:'',

       time:new Date(),

       ErrorInvoiceNumber:'',

       curentqty1:0,
       totalAmount:'',
       

       vehi2:''

    }

    
    this.formData = createRef();
    this.changeinvoiceNumberHandler=this.changeinvoiceNumberHandler.bind(this);
    this.changeVehicalHandler=this.changeVehicalHandler.bind(this);
    this.changeDateHandler=this.changeDateHandler.bind(this);
    this.changetotalAmountHandler=this.changetotalAmountHandler.bind(this);
    this.saveInvoice=this.saveInvoice.bind(this);


    this.viewAll=this.viewAll.bind(this);

    this.getinvoiceByID=this.getinvoiceByID.bind(this);
    this.getItemList=this.getItemList.bind(this);
    this.getVehicalList=this.getVehicalList.bind(this);

       
        this.datetime=this.datetime.bind(this);
        this.getallinvoicess=this.getallinvoicess.bind(this);
        this.editInvoice=this.editInvoice.bind(this);
}


datetime (){

  var showdate = new Date();
  var displaydate = showdate.getDate()+'/'+showdate.getMonth()+'/'+showdate.getFullYear();
  var datetoday=displaydate.toString();
  this.setState({
    datetoday:datetoday
  })
  console.log(datetoday);
  console.log(this.state.datetoday);

}

callme(){
  setInterval(()=> {
    this.setState({time:new Date()});
  },1000);
}



getItemList(){
  InvoiceService.getAllstockItems().then((res) => {
    this.setState({ getItems: res.data});
});
}



getVehicalList(){
  vehicleService.getVehicles().then((res) => {
    this.setState({ vehicals: res.data});
});
}

getinvoiceByID(){

  InvoiceService.getInvoiceById(this.state.invoicId).then((res) => {
   
    let invoice=res.data;
    console.log(invoice);
    this.setState({           invoiceNumber: invoice.invoiceNumber,
                              vehicalNumber: invoice.vehicalNumber,
                              totalAmount: invoice.totalAmount,
                              date:invoice.date,
                              billItemObj:invoice.billItemObj
    
    });
});
}

getallinvoicess(){
  InvoiceService.getAllInvoices().then((res) => {
    this.setState({ Invoices: res.data});
  });
}


editInvoice(id){
  
  
 
  this.props.history.push(`/edit_JobCard/${id}`);
  
  window.location.reload(false);
}


componentDidMount(){
  
this.getItemList();
this.getinvoiceByID();
this.getVehicalList();



this.datetime();
this.getallinvoicess();


}




 
//get all itemcode




viewAll(){
    this.props.history.push('/view_all_Jobcards');
}



changeinvoiceNumberHandler(event){
    this.setState({invoiceNumber: event.target.value})
}

changetotalAmountHandler(event){
    this.setState({totalAmount: event.target.value})
}

changeDateHandler(event){
    this.setState({date: event.target.value})
}

changeVehicalHandler(event){
    this.setState({vehicalNumber: event.target.value})
}


saveInvoice = (e) =>{
    e.preventDefault();

    let invoice={invoiceNumber:this.state.invoiceNumber, vehicalNumber:this.state.vehicalNumber, totalAmount:this.state.totalAmount, 
    date:this.state.date, billItemObj:this.state.billItemObj};

     

    var arrey = [...this.state.billItemObj];
       
    if(arrey.length !== 0){
    console.log('invoice =>'+JSON.stringify(invoice));

    InvoiceService.updateInvoiceById(invoice,this.state.invoicId).then(res =>{
        this.props.history.push('/view_all_Jobcards');
    });

  }else{

    alert("Add Items to Job card");

  }

    }


add = (event) => {

  event.preventDefault();

  

  const prize = parseInt(this.formData.current.amount.value)

  
//condition for negative price value
if(prize>0){


  var num = parseInt(this.formData.current.qty.value);
  this.setState((prevState)=>(
    {
      curentqty1: prevState.curentqty1+num    }
  ));
  console.log(this.state.curentqty1+"ch");
 
  console.log(num+" 2");



  var tot= parseInt(this.formData.current.amount.value);
  this.setState((prevState)=>(
    {
      totalAmount: prevState.totalAmount+tot}
  ));


  const BillItemObj = {
    itemcode: this.formData.current.itemcode.value,
    itemname: this.formData.current.itemname.value,
    price: this.formData.current.price.value,
    amount: this.formData.current.amount.value,
    qty: this.formData.current.qty.value,
  }



  this.state.billItemObj.push(BillItemObj);
  this.setState({
    billItemObj: this.state.billItemObj
  });
}else{
  alert("cant add");
}











 
  






}    


selectAdd = (event) =>{
  event.preventDefault();
   
   const num = (this.formData.current.itemcode.value)
   
 
   InvoiceService.getitemById(num).then((res)=>{
     console.log(res.data);
     let empp=res.data;
     this.setState({price: empp.price,
      itemname:empp.itemname,
     })
     //this.setState(console.log({ employees: res.data}));
     //console.log(this.state.emailName1.lastName)
 });
   
 }
 


AddQty = (event) =>{
  event.preventDefault();

  const qtyOBJ = (this.formData.current.qty.value)
  const prize = parseInt(this.formData.current.price.value)

  const total = (qtyOBJ*prize);
  const StringTot = total.toString();
  this.setState({amount:total})
  console.log(total);
 
}

/*

deleteItem(index){
  const filteredItems= this.state.items.filter(item =>
    item.index!==index);
  this.setState({
    items: filteredItems
  })

*/



ItemDelete = (event) => {
  
  
  const indexOfArray = Number(event.target.value);

  const Qty =this.state.billItemObj[indexOfArray].qty;
  if(Qty>0){
  this.setState((prevState)=>(
    {
      curentqty1: prevState.curentqty1-Qty}
  ));

  const number =this.state.billItemObj[indexOfArray].amount;
  console.log(number)

  this.setState((prevState)=>(
    {
      totalAmount: prevState.totalAmount-number}
  ));

    }else{
      this.setState((prevState)=>(
        {
          curentqty1: prevState.curentqty1=prevState.totalAmount}
      ));

      this.setState((prevState)=>(
        {
          totalAmount: prevState.totalAmount=prevState.totalAmount}
      ));
    }
  console.log(indexOfArray);
  var arrays = [...this.state.billItemObj];

  

  if (indexOfArray !== -1) {
    arrays.splice(arrays[Number(event.target.value)],1);
    this.setState({billItemObj: arrays});
  }


}





 // increment qty value by 1
 increQty = (event) => {
  const indexOfArray = event.target.value;
  console.log(indexOfArray+"change")

  let newPrice=Number(this.state.billItemObj[indexOfArray].price);
  console.log(newPrice)

  
  this.state.billItemObj[indexOfArray].qty = Number(this.state.billItemObj[indexOfArray].qty) + 1;
  var num = this.state.billItemObj[indexOfArray].qty ;

  console.log(num+"change")
  this.setState((prevState)=>(
    {
      curentqty1: prevState.curentqty1+1   }
  ));


  if(this.state.billItemObj[indexOfArray].qty>=0){
  this.state.billItemObj[indexOfArray].amount = Number(this.state.billItemObj[indexOfArray].qty) * newPrice;


  var newAmount = (this.state.billItemObj[indexOfArray].amount);
  this.setState((prevState)=>(
    {
      totalAmount: prevState.totalAmount+ newPrice   }
  ));



  this.setState({
      billItemObj: this.state.billItemObj
  });
}else{
  this.state.billItemObj[indexOfArray].qty = 0;

  this.setState({
      billItemObj: this.state.billItemObj
  });
}
}








// decrement qty value by 1
decreQty = (event) => {
  const indexOfArray = event.target.value;

  let newPrice=Number(this.state.billItemObj[indexOfArray].price);
  console.log(newPrice)

  this.state.billItemObj[indexOfArray].qty = this.state.billItemObj[indexOfArray].qty - 1;
if(this.state.billItemObj[indexOfArray].qty>=0){
  this.state.billItemObj[indexOfArray].amount = Number(this.state.billItemObj[indexOfArray].qty) * newPrice;

  var newAmount = (this.state.billItemObj[indexOfArray].amount);
  this.setState((prevState)=>(
    {
      totalAmount: prevState.totalAmount-newPrice  }
  ));
  
  if(this.state.curentqty1>0){
  this.setState((prevState)=>(
    {
      curentqty1: prevState.curentqty1-1   }
  ));

    }


  this.setState({
      billItemObj: this.state.billItemObj
  });
}else{
  this.state.billItemObj[indexOfArray].qty = 0;

  this.setState({
      billItemObj: this.state.billItemObj
  });
}
}



deleteInvoice=(e)=>{

  alert("confirm delete");
  e.preventDefault();
 
 
  InvoiceService.deleteInvoice(this.state.invoicId).then(res=>{
      alert(this.state.invoicId+" Deleted Successfully");
      this.props.history.push('/view_all_Jobcards');
  });
  
}









render() {
  return (
    <div >
      <div >
        <h2>
      Update Job {this.state.invoiceNumber}
      </h2>
      </div>
    


    <div className={styles.saveButton}>
    <style type="text/css">
{`

.btn-viewall {

padding-left: 0px;
padding-right: 0px;
margin-left: 50px;
}
}


`}
</style>
      <Button className="btn btn-secondary" variant="viewall" onClick={this.viewAll}>
        View All
      </Button>
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
                          <label>Invoice Number:</label>
                           <input placeholder="Customer Name" name="jobNumber"
                           value={this.state.invoiceNumber+"          /            "+this.state.vehicalNumber} onChange={this.changeinvoiceNumberHandler} />
                         </div>
                     </Col>


                      <Col >
                          <div className={styles.input_group_amount}>
                           <label>Vehical Number:</label>

                           <Card style={{ width: '10rem' ,height: '1.9rem'}}>
                           <Autocomplete onChange={this.changeVehicalHandler}
                             
                              options = {this.state.vehicals.map(person =>  person.registrationNo)} 
                              style={{ width: 130 ,marginTop: 10 }}
                              renderInput={(params) =>
                              <TextField  id="outlined-size-small"
                              defaultValue="Small"
                              size="small"   value={this.state.vehicalNumber}   {...params}  onClick={this.changeVehicalHandler} onKeyPressonClick={this.changeVehicalHandler}  name="vehicalNumber"/>}

                           />
                           </Card>


                          
                          </div>
                       </Col>
                    </Row>

                    <Row>
                       <Col>
                           Time
                      </Col>
                    </Row>

                   <Row>
                        <Col >
                           <input  placeholder="Date" name="date" 
                           value={this.state.time.toLocaleTimeString()} onChange={this.changeDateHandler} onClick={this.dateHandle} {...this.callme()} />
                       </Col>
                   </Row>


                   <Row>
                       <Col>
                         date:
                       </Col>
                   </Row>

                   <Row>
                      <Col >
                          <input  placeholder="Date" name="date" 
                          value={this.state.date} onChange={this.changeDateHandler} onClick={this.dateHandle}  />
                      </Col>
                   </Row>
                </Form>
              </div>


      {/* second colomn empty ...... */}

      <div class="col-sm">
        
      </div>

      {/* Third colomn Toatl amount ...... */}

      <div class="col-sm">
                    <Row>
                      <div className={styles.amount}>
                           <p>{"Rs. "+this.state.totalAmount+".00"}</p>
                      </div>
                    </Row>

                    <Row>

                       {/* empty row below amount ...... */}

                    </Row>

                    <Row>
                         <style type="text/css">
                            {`
                               .btn-adds {
                                   width: 85px;
                                   margin-left: auto;
                                          }
                                         }
                             `}
                         </style>

                                 <Button size="sm" className="btn btn-secondary" variant="adds" type="submit" onClick={this.saveInvoice}>
                                     Update
                                 </Button >
                      </Row>
        </div>
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


          {/* Second card ...... */}

          <div className="container p-3 my-3 bg-secondary text-gradient bg-opacity-50 fw-bold">
                      <Form onSubmit={this.add} ref={this.formData}>

                            <Row>
                               <Col xs={2}>

                                    <label>Item Id:</label>
                                      <Card style={{ width: '10rem' ,height: '1.9rem'}}>
                                       <Autocomplete onChange={this.selectAdd}

                                       onInputChange={this.selectAdd}
                                      
                                           options = {this.state.getItems.map(itemObj =>  itemObj.itemcode)}
                                           style={{ width: 130 ,marginTop: 10 }}
                                           renderInput={(params) =>
                                           <TextField 
                                           id="outlined-size-small"
                                           defaultValue="Small"
                                           size="small"  {...params} onMouseLeave={this.selectAdd} onChange={this.selectAdd} name="itemcode"/>}

                                        />
                                        </Card>
                                    {/* 
                                    <Form.Select size="sm" onClick={this.selectAdd}  aria-label="Default select example" name="itemcode">
                                    {this.state.getItems.map(itemObj => <option> {itemObj.itemcode}</option>)}
                                    </Form.Select>
                                    */}

                                </Col>

                               

                               

                               <Col xs={5}>
                                    <label style={{"display":"block ruby"}}>Item Name:</label>
                                    <Form.Control size="sm" value={this.state.itemname}  type="text"  name="itemname" />
                               </Col>


                               <Col xs={2}>
                                     <label style={{"display":"block ruby"}}>Cost Price:</label>
                                     <Form.Control size="sm" value={this.state.price}  type="text"  name="price" />
                               </Col>


                               <Col xs={1}>
                                      <label style={{"display":"block ruby"}}>qty:</label>
                                      <Form.Control size="sm" sm={3} onClick={this.AddQty} type="number" placeholder="QTY " name="qty"/>
                                      </Col>


                             


                              <Col>
                                     <label style={{"display":"block ruby"}}>Amount:</label>
                                     <Form.Control size="sm" sm={60} value={this.state.amount} type="text" placeholder="Amount " name="amount"/>
                              </Col>

                          </Row>

                          {/* Second row ...... */}

                          <Row> 

                              <Col xs={2}>
                              </Col>
                          </Row>

                          <Row>
                              <Col xs={2}>
                               </Col>

                              <Col xs={1}>
                              </Col>

                              <Col xs={2}>
                              </Col >

                              <Col xs={2}>
                              </Col>

                              <Col xs={1}>
                              </Col>

                              <Col xs={2}>
                              </Col>



{/* Add Button Display ...... */}

                      <Col xs={1}>

                          <style type="text/css">
                             {` 
                                .btn-add {
                                  margin-top: 27px; 
                                  margin-left: 110px;
                                  }
                                }
                            `}
                            </style>

                                       <Button size="sm" className="btn btn-secondary" variant="add" type="submit">
                                         Add
                                       </Button >
                        </Col>
                   </Row>

              </Form>
           </div>


{/* Third Card View ...... */}

          <div className="container p-3 my-3 bg-secondary text-white bg-opacity-50">

              <div class="row">
                 <div class="col-9">

                       <Table striped bordered hover variant="secondary" class="table table-hover " class="table table-bordered">

                             <thead style={{'display': 'block'}} class="table-dark">
                                <tr>
                                    <th style={{"width":"25px","font-size":"small"}}></th>
                                    <th style={{"width":"140px","font-size":"small"}}>Item Code</th>
                                    <th style={{"width":"240px","font-size":"small"}}>Item Name:</th>
                                    <th style={{"width":"135px","font-size":"small"}}>Cost Price:</th>
                                    <th style={{"width":"50px","font-size":"small"}}>QTY:</th>
                                    <th style={{"width":"120px","font-size":"small"}}>Amount:</th>
                                    <th style={{"width":"145px","font-size":"small"}}>Options</th>
                                    <th style={{"width":"90px","font-size":"small"}}></th>
                                </tr>
                             </thead>

                             <tbody style={{'height': '320px', 'overflow':'auto', 'display': 'block'}}>
                                {
                                  this.state.billItemObj.map((item, index) => {
                                       return (
                                             <tr key={index}>
                                                   <td>{index+1}</td>
                                                   <td style={{'width': '150px',"font-size":"small"}}>{item.itemcode}</td>
                                                   <td style={{'width': '250px',"font-size":"small"}}>{item.itemname}</td>
                                                   <td style={{'width': '150px',"font-size":"small"}}>{item.price}</td>
                                                   <td style={{'width': '50px',"font-size":"small"}}>{item.qty}</td>
                                                   <td style={{'width': '125px',"font-size":"small"}}>{item.amount}</td>

                                                   <td style={{"width":"155px","font-size":"small"}}>
                                        <style type="text/css">
                                             {`
                                                 .btn-addDd {
                                                     margin-top: 1px;
                                                     margin-left: 20px;
                                                     height: 25px;
                                                     font-size: small;
                                                     text-align: center;
                                                     width:45px;
                                                  }
                                                   
                                                 .btn-del {
                                                      background-color: #364a5b;
                                                      padding-left: 0px;
                                                      padding-right: 0px;
                                                      font-size:12px;
                                                    }
                                                    
                                              `}
                                        </style>      

                                        <Button size="sm" className="btn btn-secondary" variant="addDd"  onClick={event => this.increQty(event)} value={index}> + </Button>
                                        <Button size="sm" className="btn btn-secondary" variant="addDd" onClick={event => this.decreQty(event)} value={index}> - </Button>
                                            
                                         </td>

                                        <td style={{'width': '90px'}}>
                                        <Button  className="btn btn-secondary" size="sm" variant="del"  onClick={event => this.ItemDelete(event)}  value={index}>Delete</Button>       
                                        </td>
              
                                   </tr>
                                            )
                                         })
                                       }

                                 </tbody>

                                 <tfoot style={{'display': 'block'}}>
                                     {
                                         <tr>
                                             <th style={{"width":"25px","font-size":"small"}}></th>
                                             <th style={{"width":"140px","font-size":"small"}}></th>
                                             <th style={{"width":"240px","font-size":"small"}}></th>
                                             <th style={{"width":"135px","font-size":"small"}}></th>
                                             <th style={{"width":"50px","font-size":"small"}}>{this.state.curentqty1}</th>
                                             <th style={{"width":"120px","font-size":"small"}}>{"Rs."+this.state.totalAmount+".00"}</th>
                                             <th style={{"width":"145px","font-size":"small"}}></th>
                                             <th style={{"width":"90px","font-size":"small"}}></th>
                                        
                                         </tr>
                                      }
                                </tfoot>

                         </Table>

                    </div>


              <div class="col-3">

                   <Table style={{'align': 'left'}} striped bordered hover variant="secondary" class="table table-hover " class="table table-bordered">

                        <thead class="table-dark" style={{'display': 'block'}} >
                           <tr>
                           <th style={{"width":"95px","font-size":"small"}}>InvoiceNo</th>
                           <th style={{"width":"95px","font-size":"small"}}> VehicalNo</th>
                           <th style={{"width":"104px"}}></th>
                           </tr>

                        </thead>

                             <tbody style={{'height': '350px', 'overflow':'auto', 'display': 'block'}}>
                                {
                                   this.state.Invoices.map((item, index) => {
                                      return (
                                         <tr key={index}>
                                           <td style={{"width":"100px","font-size":"small"}}>{item.invoiceNumber}</td>
                                           <td style={{"width":"100px","font-size":"small"}}>{item.vehicalNumber}</td>

                                               <style type="text/css">
                                               {`  
                                                   .btn-addD {
                                                    margin-top: 1px;
                                                    margin-left: 20px;
                                                    height: 25px;
                                                    font-size: small;
                                                    text-align: center;
                                                    width:45px;
                                                      
                                                    }
                                                    }
                                                      
                                                        
                                                        `}
                                                      </style>
                                                        

                                           <td style={{"width":"100px"}}>
                                               <Button size="sm" className="btn btn-secondary" variant="addD" type="submit"  onClick={()=> this.editInvoice(item.invoicId)}>
                                                   View
                                               </Button>
                                           </td>
                                        </tr>
                                             )
                                           })
                                         }
                               </tbody>
                       </Table>
                   </div>
              </div >




</div>
</div>
  
    
);
}

}

export default JobUpdate;