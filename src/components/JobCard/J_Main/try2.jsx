
import styles from "./JobCardMain.module.css"
import { Form, Button, Table,Row,Col ,FloatingLabel,InputGroup} from "react-bootstrap";
import { createRef, Component } from 'react';
import InvoiceService from "../../../Services/InvoiceService";
import { Alert } from "bootstrap";
import vehicleService from "../../../Services/vehicleService";
import { Label } from "@material-ui/icons";






class JobCardMain extends Component {
    constructor(props){
        super(props)
    
        this.state={

          vehicals:[],
            
            BillId:'',
            invoicId:'',
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



           ErrorInvoiceNumber:''

        }

        
        this.formData = createRef();
        this.changeinvoiceNumberHandler=this.changeinvoiceNumberHandler.bind(this);
        this.changeVehicalHandler=this.changeVehicalHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changetotalAmountHandler=this.changetotalAmountHandler.bind(this);
        this.saveInvoice=this.saveInvoice.bind(this);
        this.validate=this.validate.bind(this);
    
   
        this.viewAll=this.viewAll.bind(this);
        this.getInvoiceList=this.getInvoiceList.bind(this);
    }


//..............
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


    viewAll(){
        this.props.history.push('/view_all_Jobcards');
    }




    dateHandle =(e) =>{
      let date =e.target.value;
      if(date == ""){
        console.log("date no");
      }

    }



    changeinvoiceNumberHandler(event){
        this.setState({invoiceNumber: event.target.value})

        event.preventDefault();
        const isValid = this.validate();
        if(isValid){
        console.log(this.state);
        }
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

        InvoiceService.createInvoice(invoice).then(res =>{
            this.props.history.push('/view_all_Jobcards');
        });


        const isCheckbox = e.target.type === "checkbox";
        this.setState({
          [e.target.name]: isCheckbox
          ? e.target.checked
          : e.target.value
        });

      }else{

        alert("Add Items to Job card");

      }

        }

validate = () => {
  
  let nameError = "";
  if(!this.state.invoiceNumber.includes('@')){
    nameError = "invalid rmail";
  }
 if(nameError){
  this.setState({nameError});
  return false;
}
return true;


};



    add = (event) => {

      event.preventDefault();

      

      const prize = parseInt(this.formData.current.amount.value)

      
//condition for negative price value
      if(prize>0){

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
       var str = num.toString();
       
     
       InvoiceService.getitemById(str).then((res)=>{
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

  const number =this.state.billItemObj[indexOfArray].amount;
  console.log(number)

  
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


  let newPrice=Number(this.state.billItemObj[indexOfArray].price);
  console.log(newPrice)

  
  this.state.billItemObj[indexOfArray].qty = Number(this.state.billItemObj[indexOfArray].qty) + 1;
  if(this.state.billItemObj[indexOfArray].qty>=0){
  this.state.billItemObj[indexOfArray].amount = Number(this.state.billItemObj[indexOfArray].qty) * newPrice;

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



getInvoiceList(){
  InvoiceService.getAllInvoices().then((res) => {
    let invoice=res.data;
    console.log(invoice);
    this.setState({    BillId: invoice.BillId,
                            
    
    });


    var arrays = [...invoice];
    var newarrey = arrays[arrays.length-1];
    console.log(newarrey.invoicId);
    var invoicenum = ((newarrey.invoicId)+1);
    console.log(invoicenum);
    var code =("INV"+invoicenum)
    this.setState({ invoicId:invoicenum,
      invoiceNumber:code


    })






});

}


getVehicalList(){
  vehicleService.getVehicles().then((res) => {
    this.setState({ vehicals: res.data});
});
}



    componentDidMount(){

      InvoiceService.getAllstockItems().then((res) => {
        this.setState({ getItems: res.data});
    });

    this.getInvoiceList();
    this.getVehicalList();

    }




    render() {
        return (
            <div >
              <div >
                <h2>
              JOB CARD
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

            <div className="container.fluid p-2 my-3 bg-secondary text-gradient bg-opacity-50 fw-bold">

              <Form className={styles.form}>

                <div className={styles.input_group1}>
                   <label>Job number:</label>
                   <input placeholder="Customer Name" name="jobNumber"
                   value={this.state.invoiceNumber} onChange={this.changeinvoiceNumberHandler} />
                </div>








                

                
               
            
                <div className={styles.input_group}>
                <label>Date:</label>
                <input type="Date" placeholder="Date" name="date" 
                value={this.state.date} onChange={this.changeDateHandler} onClick={this.dateHandle} />
                </div>
                 
                  
                 
               
                
                

                <div className={styles.input_group_vehicalnumber}>  
                <label>Vehicle Number:</label>              
                <select class="form-select" aria-label="Default select example" name="vehicalNumber" 
                onChange={this.changeVehicalHandler}  value={this.state.registrationNo} >
                {this.state.vehicals.map(person => <option  > {person.registrationNo}</option>)}
                </select>
                </div>



                <div>{this.state.ErrorInvoiceNumber}</div>
              
              <div className={styles.input_group_amount}>
                 <label>Total Amount:</label>
                 <input  type="text" placeholder="Toal Amount" name="totalAmount" 
                 value={this.state.totalAmount} onChange={this.changetotalAmountHandler}  />
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

                
                <div className={styles.saveButton}>
                <Button className="btn btn-secondary" variant="save" onClick={this.saveInvoice}>
                Save
                </Button>
                </div>
                
              </Form>
            </div>

            

            <div className="container.fluid p-3 my-3 bg-secondary bg-opacity-50 text-gradient fw-bold">

              <Form className={styles.form} onSubmit={this.add} ref={this.formData}>

                <div className={styles.input_groups}>
                  <label>Item:</label>

                
                    <Form.Select onClick={this.selectAdd}  aria-label="Default select example" name="itemcode">
                      
                    {this.state.getItems.map(itemObj => <option  > {itemObj.itemcode}</option>)}
                   
                    </Form.Select>
                  
                </div>

           
                <div className={styles.input_groups}>
                  <label>Item Name:</label>
                  <Form.Control   value={this.state.itemname}  type="text"  name="itemname" />
                </div>


                <div className={styles.input_groups}>
                  <label>Cost price:</label>
                  <Form.Control   value={this.state.price}  type="text"  name="price" />
                </div>

                <div className={styles.input_groups}>
                  
                  <Form.Control onClick={this.AddQty} type="number" placeholder="QTY " name="qty"/>
                </div>
              
                <div className={styles.input_groups}>
                  
                  <Form.Control value={this.state.amount} type="text" placeholder="Amount " name="amount"/>
                </div>
                
                <style type="text/css">
    {`

.btn-add {
  margin-left: 1150px;
  padding-left: 40px;
  padding-right: 40px
  margin-top: 27px;
  margin-right: 26px;
}
}
  
    
    `}
  </style>

               
                <Button className="btn btn-secondary" variant="add" type="submit">
                Add
                </Button >
                
                
              </Form>
            </div>


            <div className="container.fluid p-3 my-3 bg-secondary text-white bg-opacity-50">

<Table striped bordered hover variant="secondary" class="table table-hover " class="table table-bordered">
        <thead class="table-dark">
            <tr>
                <th></th>
                <th>Item Code</th>
                <th>Item Name:</th>
                <th>Cost Price:</th>
                <th>QTY:</th>
                <th>Amount:</th>
                <th>Options</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.billItemObj.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.itemcode}</td>
                            <td>{item.itemname}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>{item.amount}</td>
                            
                           
        
                            
                           
                            <td>
                            <style type="text/css">
    {`

.btn-add {
  margin-left: 1150px;
  padding-left: 40px;
  padding-right: 40px
}
    .btn-flat {
      background-color: #4a5662;
      color: white;
      padding-top: 3px;
      padding-left: 0px;
      padding-bottom: 3px;
      margin-top: 5px;
      padding-right: 0px;
    }

 
    .btn-del {
      background-color: #e3db60;
      padding-top: 3px;
padding-left: 0px;
padding-bottom: 3px;
margin-top: 20px;
padding-right: 0px;
    }
    
    `}
  </style>
                               
                                <Button    variant="flat"  onClick={event => this.increQty(event)} value={index}>+</Button>
                                <Button  variant="flat" class="btn btn-primary btn-sm" onClick={event => this.decreQty(event)} value={index}>-</Button>
                            </td>
                            <td>
                            
                            <Button  variant="del" class="btn btn-primary btn-sm" onClick={event => this.ItemDelete(event)}  value={index}>Delete</Button>
                           
                        </td>
                      
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>

    </div>

          </div>
            
        );
    }

}

export default JobCardMain;