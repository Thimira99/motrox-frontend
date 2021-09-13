
import styles from "./JobCardMain.module.css"
import { Form, Button, Table,Row,Col } from "react-bootstrap";
import { createRef, Component } from 'react';
import InvoiceService from "../../../Services/InvoiceService";





class JobCardMain extends Component {
    constructor(props){
        super(props)
    
        this.state={
            
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
           qty:''

        }

        
        this.formData = createRef();
        this.changeinvoiceNumberHandler=this.changeinvoiceNumberHandler.bind(this);
        this.changeVehicalHandler=this.changeVehicalHandler.bind(this);
        this.changeDateHandler=this.changeDateHandler.bind(this);
        this.changetotalAmountHandler=this.changetotalAmountHandler.bind(this);
        this.saveInvoice=this.saveInvoice.bind(this);
    
   
        this.viewAll=this.viewAll.bind(this);
    }



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
        date:this.state.date,billItemObj:this.state.billItemObj};
        console.log('invoice =>'+JSON.stringify(invoice));

        InvoiceService.createInvoice(invoice).then(res =>{
            this.props.history.push('/view_all_Jobcards');
        });

        }


    add = (event) => {

      event.preventDefault();

      


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
  
  
  const indexOfArray = event.target.value;

  const number =this.state.billItemObj[indexOfArray].amount;
  console.log(number)

  
  console.log(indexOfArray);
  var array = [...this.state.billItemObj];

  

  if (indexOfArray !== -1) {
    array.splice(array[event.target.value],1);
    this.setState({billItemObj: array});
  }


}


 // increment qty value by 1
 increQty = (event) => {
  //console.log(event.target.value)
  const indexOfArray = event.target.value;
  this.state.billItemObj[indexOfArray].qty = this.state.billItemObj[indexOfArray].qty + 1;
  this.setState({
      billItemObj: this.state.billItemObj
  });
}
// decrement qty value by 1
decreQty = (event) => {
  const indexOfArray = event.target.value;
  this.state.billItemObj[indexOfArray].qty = this.state.billItemObj[indexOfArray].qty - 1;
  this.setState({
      billItemObj: this.state.billItemObj
  
  });
}




    componentDidMount(){

      InvoiceService.getAllstockItems().then((res) => {
        this.setState({ getItems: res.data});
    });

    }




    render() {
        return (
            <div>
            <h2>Job Card</h2>
            <div className={styles.saveButton}>
              <button className="btn btn-secondary" onClick={this.viewAll}>
                View All
              </button>
            </div>

            <div className="container p-3 my-3 bg-dark text-white">

              <Form className={styles.form}>

                <div className={styles.input_group1}>
                   <label>Job number:</label>
                   <input placeholder="Customer Name" name="jobNumber"
                   value={this.state.invoiceNumber} onChange={this.changeinvoiceNumberHandler} />
                </div>
              
                <div className={styles.input_group}>
                   <label>Total Amount:</label>
                   <input type="text" placeholder="Toal Amount" name="totalAmount" 
                   value={this.state.totalAmount} onChange={this.changetotalAmountHandler}/>
                </div>
               
            
            

                <div className={styles.input_group}>
                  <label>Date:</label>
                  <input type="Date" placeholder="Date" name="date" 
                  value={this.state.date} onChange={this.changeDateHandler}/>
                </div>

                <div className={styles.input_group_vehicalnumber}>  
                <label>Vehicle Number:</label>              
                <select class="form-select" aria-label="Default select example" name="vehicalNumber" 
                onChange={this.changeVehicalHandler}  value={this.state.vehicalNumber} >
                <option selected>Open this select menu</option>
                <option  > 2222222222</option>
                <option  > 111111111</option>
                </select>
                </div>
                
                <div className={styles.saveButton}>
                <button className="btn btn-secondary" onClick={this.saveInvoice}>
                Save
                </button>
                </div>
                
              </Form>
            </div>


            <div className="container p-3 my-3 bg-dark text-white">

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
                  <label>QTY:</label>
                  <Form.Control onClick={this.AddQty} type="number" placeholder="Price " name="qty"/>
                </div>
              
                <div className={styles.input_groups}>
                  <label>Amount :</label>
                  <Form.Control value={this.state.amount} type="text" placeholder="Price " name="amount"/>
                </div>

                <div className={styles.saveButton}>
                <Button className="btn btn-secondary" variant="primary" type="submit">
                Add
                </Button >
                </div>
                
              </Form>
            </div>


            <div className="container p-3 my-3 bg-dark text-white">

<Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>index:</th>
                <th>Item Code</th>
                <th>Item Name:</th>
                <th>Cost Price:</th>
                <th>QTY:</th>
                <th>Amount:</th>
                <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.billItemObj.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.itemcode}</td>
                            <td>{item.itemname}</td>
                            <td>{item.price}</td>
                            <td>{item.qty}</td>
                            <td>{item.amount}</td>
                            
                           
        
                            
                           
                            <td>
                            
                                <Button variant="danger"  onClick={event => this.ItemDelete(event)}  value={index}>Delete</Button>
                                <Button variant="success" onClick={event => this.increQty(event)} value={index}>+</Button>
                                <Button variant="danger" onClick={event => this.decreQty(event)} value={index}>-</Button>
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