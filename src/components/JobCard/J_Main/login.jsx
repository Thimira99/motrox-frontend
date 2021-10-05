import styles from "./JobCardMain.module.css"
import { Form, Button, Table,Row,Col,Card ,FloatingLabel,InputGroup} from "react-bootstrap";
import { createRef, Component } from 'react';
import InvoiceService from "../../../Services/InvoiceService";
import { Alert } from "bootstrap";
import vehicleService from "../../../Services/vehicleService";
import { Label } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert';
  






class login extends Component {
    constructor(props){
        super(props)
    
        this.state={




            usernameU:'',
            passwordU:'',
            Loginclass:[],



          vehicals:[],
          Invoices:[],
            
            BillId:'',
            invoicId:'',
            invoiceNumber:'',
            vehicalNumber:'',
            totalAmount:'',
            date:'',
            date2:'',
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
           totalAmount:0,
           

           vehi2:''
           

        }

        
        this.formData = createRef();
        this.changeinvoiceNumberHandler=this.changeinvoiceNumberHandler.bind(this);
        this.changeVehicalHandler=this.changeVehicalHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changeDateHandler2=this.changeDateHandler2.bind(this);
        this.changetotalAmountHandler=this.changetotalAmountHandler.bind(this);
        this.saveInvoice=this.saveInvoice.bind(this);
        this.validate=this.validate.bind(this);
    
   
        this.viewAll=this.viewAll.bind(this);
        this.getInvoiceList=this.getInvoiceList.bind(this);
        this.datetime=this.datetime.bind(this);
        this.getallinvoicess=this.getallinvoicess.bind(this);
        this.editInvoice=this.editInvoice.bind(this);
        this.goForSearch=this.goForSearch.bind(this);
        this.goForSearch=this.goForSearch.bind(this);
        this.getpassword=this.getpassword.bind(this);
        this.getusername=this.getusername.bind(this);
    }

datetime (){


  let MyDate = new Date();
  let MyDateString;
  
  MyDate.setDate(MyDate.getDate() );
  
  MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
               + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
               + MyDate.getFullYear();
               console.log(MyDateString+"new date")
               this.setState({
                datetoday:MyDateString
              })
             
              console.log(this.state.datetoday);

  /*var showdate = new Date();
  var displaydate = showdate.getDate()+'/'+showdate.getMonth()+'/'+showdate.getFullYear();
  console.log(displaydate +"qwerty")
  var datetoday=displaydate.toString();
  this.setState({
    datetoday:datetoday
  })
  console.log(datetoday);
  console.log(this.state.datetoday);
*/
}


callme(){
  setInterval(()=> {
    this.setState({time:new Date()});
  },1000);
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


    goForSearch(){
      this.props.history.push('/view_search_Jobcards');
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

    changeDateHandler2(event){
      this.setState({date2: event.target.value})
  }

    changeVehicalHandler(event){
      
      var num = event.target.value
      console.log(num)
        this.setState({vehicalNumber: event.target.value})
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

    //time add in here ........

    adddate =( event) =>{
      event.preventDefault();

      var datefirst = this.state.date
      var datesecond = this.state.date2

     
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
       
        let invoice=res.data;
        console.log(invoice);
      
    });


    }

   

selectAdd = (event) =>{
  event.preventDefault();
   
   const num = (this.formData.current.itemcode.value)
   console.log(num);
 
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

 
      const curetqty = parseInt(this.formData.current.qty.value)
      
      this.setState({curetqty:curetqty})


      const qtyOBJ = (this.formData.current.qty.value)
      const prize = parseInt(this.formData.current.price.value)

      const total = (qtyOBJ*prize);
      const StringTot = total.toString();
      this.setState({amount:total})
      
     
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
  
  this.setState((prevState)=>(
    {
      curentqty1: prevState.curentqty1-1   }
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

    //console.log(this.state.invoicId);




});

}


getVehicalList(){
  vehicleService.getVehicles().then((res) => {
    this.setState({ vehicals: res.data});
});



//console.log(this.state.invoicId);



}

getallinvoicess(){
  InvoiceService.getAllInvoices().then((res) => {
    this.setState({ Invoices: res.data});
  });
}

editInvoice(id){

  
  this.props.history.push(`/edit_JobCard/${id}`);
}

    componentDidMount(){

      InvoiceService.getAllstockItems().then((res) => {
        this.setState({ getItems: res.data});
    });

    this.getInvoiceList();
    this.getVehicalList();
    this.datetime();
    this.getallinvoicess();

    }


   goForpdf(event){
      event.preventDefault();
      event.preventDefault();
   
  
   InvoiceService.generateReport("pdf").then((res)=>{
     console.log(res.data);
     let empp=res.data;
     console.log(empp);
     
     
 });
    }



   goForlogin(event){
    event.preventDefault();
   
 
    this.props.history.push(`/login/`);


  }


  saveInvoice = (e) =>{
       
    e.preventDefault();

   
    var username= this.state.usernameU;
    var password= this.state.passwordU;


    InvoiceService.getpassword(username,password).then((res) => {
      this.setState({ Loginclass:res.data});
     let invoice=res.data;
     
     console.log(invoice);
    if(invoice===""){
        swal("Password Incorrect !", "Enter AmountTo Search!", "warning")
        

    }else{
        swal("login successful !", "Enter AmountTo Search!", "warning")
        this.props.history.push('/jobcard');
    }
  
});

   
   
      
     

      }


//..................................................................

getusername(event){
    event.preventDefault();
    this.setState({usernameU:event.target.value});
    console.log(event.target.value);
}

getpassword(event){
    event.preventDefault();
    this.setState({passwordU:event.target.value});
    console.log(event.target.value);
}





    render() {
        return (
            <div >
              <div >
                <h2>
              JOB CARD
              </h2>
              </div>
            
              <Row>

              <div className={styles.saveButton}>
            <style type="text/css">
    {`

.btn-viewall {
  
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
  <Col>
  
              <Button className="btn btn-secondary" variant="viewall" onClick={this.viewAll}>
                View All
              </Button>
              </Col>
            </div>

           <Col>
            <Button className="btn btn-secondary" variant="viewall" onClick={this.goForSearch}>
                View All
              </Button>


              </Col>

              <Col>
            <Button className="btn btn-secondary" variant="viewall" onClick={this.goForpdf}>
               PDF
              </Button>


              <Button className="btn btn-secondary" variant="viewall" onClick={this.goForlogin}>
               login
              </Button>

              </Col>

              </Row>

            
            
            {/* First Card ...... */}
            
            <div className="container p-3 my-80 bg-secondary text-gradient bg-opacity-50 fw-bold">

              <div class="container">
                 <div class="row">
                    <div class="col-sm">

                      {/* First Form ...... */}

                        <Form>

                           <Row>
                              <Col>
    
                             </Col>
     
     
                              <Col >
                                  <div className={styles.input_group_amount}>
                               


                                  
                                  </div>
                               </Col>
                            </Row>

                            <Row>
                               <Col>
                                   username
                              </Col>
                            </Row>

                           <Row>
                                <Col >
                                   <input  placeholder="Date" name="date" 
                                   value={this.state.username}  onChange={this.getusername}  />
                               </Col>
                           </Row>
  

                           <Row>
                               <Col>
                               password
                               </Col>
                           </Row>

                           <Row>
                              <Col >
                                  <input  placeholder="Date" name="date" 
                                  value={this.state.password}  onChange={this.getpassword}  />
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
                                             Save
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


                


</div>
          
            
        );
    }

  }

export default login;