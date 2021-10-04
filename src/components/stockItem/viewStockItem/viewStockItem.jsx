import React, { Component } from 'react';
import stockItemService from '../../../Services/stockItemService';
import styles from "./viewStockItem.module.css";

class viewStockItem extends Component {

    state ={
        itemcode: this.props.match.params.itemcode,
        stockItem: {}
    }

    componentDidMount(){
        stockItemService.getTStockItemByItemcode(this.state.itemcode).then(res => {
            this.setState({stockItem: res.data});
        })
    }

    render() {
        return (
            <div>
               <div className= {styles.card}>
                   <h3 className= "text-center">View Item Details</h3>
                   <div className={styles}>
                       <div className= {styles.row }>
                           <label>Item Code :</label>
                           <div>{this.state.stockItem.itemcode}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Item Name :</label>
                           <div>{this.state.stockItem.itemname}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Quantity :</label>
                           <div>{this.state.stockItem.qty}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Received Quantity :</label>
                           <div>{this.state.stockItem.receivedqty}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Sold Quantity :</label>
                           <div>{this.state.stockItem.soldqty}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Damaged Quantity :</label>
                           <div>{this.state.stockItem.damageqty}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>Return Quantity :</label>
                           <div>{this.state.stockItem.returnqty}</div>
                       </div>
                       <div className= {styles.row }>
                           <label>price :</label>
                           <div>{this.state.stockItem.price}</div>
                       </div>
                       <div className={styles.reportbutton}>
                       <button className="btn btn-secondary" onClick={this.updateitem}>Report</button>
                       </div>
                       </div>
                   </div>

               </div>
            
        );
    }
}

export default viewStockItem;