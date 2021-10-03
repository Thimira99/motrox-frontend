import React, { Component } from 'react';
import OrderServices from '../../../Services/OrderServices';
import  styles from "../Orders/Orders.module.css" ;
import SearchIcon from "@material-ui/icons/Search";

class Orders extends Component {

    constructor(props){
        super(props)

        this.state = {
            orders: []
        }
        this.createanorder = this.createanorder.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }

    deleteOrder(id){
        OrderServices.deleteorders(id).then(res => {
            this.setState({orders: this.state.orders.filter(order => order.id !== id)});

        });

    }

    viewOrder(id){
        this.props.history.push(`/view-order/${id}`);

    }

    editOrder(id){
        this.props.history.push(`/create-an-order/${id}`);

    }

    componentDidMount(){
        OrderServices.getOrders().then((res)  =>{
            this.setState({orders:res.data});
        });

    }

    createanorder(){
        this.props.history.push('/create-an-order/_add');

    }
    render() {
        return (
                <div>
                <h2 >Order List</h2>

                <div className={styles.searchBar}>
            <input
              type="text"
              id="header-search"
              placeholder="Search "
              name="s"
            />
            <div className={styles.searchBarImage}>
              <button onClick={this.search}>
                <SearchIcon />
              </button>
              </div>
              </div>


                <div className = "row">
                    <button className = "btn btn-primary" onClick = {this.createanorder}>Create An Order</button>

                </div>
                <div className = "row">
                    <table className = "table table-striped table-bordered" >
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Date</th>
                                <th>Supplier</th>
                                <th>Item Code</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.orders.map(
                                    order =>
                                    <tr key = {order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.date}</td>
                                        <td>{order.supplier}</td>
                                        <td>{order.itemCode}</td>
                                        <td>{order.itemName}</td>
                                        <td>{order.price}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            <button onClick = { () => this.editOrder(order.id) } className = "btn btn-info">Update</button>
                                            <button style={{marginLeft:"1px"}} onClick = { () => this.deleteOrder(order.id) } className = "btn btn-danger">Delete</button>
                                            <button style={{marginLeft:"1px"}} onClick = { () => this.viewOrder(order.id) } className = "btn btn-info">View</button>
                                        </td>

                                    </tr>
                                    

                                )

                            }

                        </tbody>

                    </table> 
                </div>
                 
                
            </div>
        )
    }
}

export default Orders;