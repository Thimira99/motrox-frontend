import React, { Component } from 'react';
import styles from "../stockList/stockList.module.css";
import SearchIcon from "@material-ui/icons/Search";
import stockItemService from '../../../Services/stockItemService';
//import { TheatersRounded } from '@material-ui/icons';

class stockList extends Component {
  
  constructor(props){
      super(props)
    
      this.state = {
        stockItems:[]
    }
      this.stockListForm = this.stockListForm.bind(this);
      this.updateItems = this.updateItems.bind(this);
      this.deleteItems = this.deleteItems.bind(this);
    }    
componentDidMount(){
  stockItemService.getstockItems().then((res) => {
    this.setState({stockItems: res.data});
  });
}

viewStock(itemcode){
  this.props.history.push(`/view-stock/${itemcode}`);
}

stockListForm(){
  this.props.history.push('/add-stock');
}

updateItems = (itemcode) =>{
  this.props.history.push(`/updateStock/${itemcode}`);
}

deleteItems(itemcode){
  stockItemService.deleteStockItem(itemcode).then(res => {
    this.setState({stockItems: this.state.stockItems.filter(stockItem => stockItem.itemcode !== itemcode)});
  });
}


    render() {
        return (
          <>
            <h2>Stock Item List</h2>
            <div className={styles.topContainer}>
              <button id={styles.addStockButton} className="btn btn-primary" onClick={this.stockListForm}>
                Add stock
              </button>
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
            </div>
            <div className={styles.table}>
              <div className="table  table-bordered">
                <thead>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {
                    this.state.stockItems.map(stockItems => 

                        <tr key={stockItems.itemcode}>
                        <td>{stockItems.itemcode}</td>
                        <td>{stockItems.itemname}</td>
                        <td>{stockItems.qty}</td>
                        <td>{stockItems.price}</td>
                        <td>
                        <div className={styles.btn}>
                          <button onClick ={() => this.updateItems(stockItems.itemcode)} className="btn btn-info">Update</button>
                          <button style={{marginLeft: "10px"}}onClick ={() => this.deleteItems(stockItems.itemcode)} className="btn btn-danger">Delete</button>
                          <button style={{marginLeft: "10px"}}onClick ={() => this.viewStock(stockItems.itemcode)} className="btn btn-info">View</button>
                          </div>
                        </td>
                      </tr>
                )}
                </tbody>
              
              </div>
            </div>
          </>
        );
      }
    }
export default stockList;