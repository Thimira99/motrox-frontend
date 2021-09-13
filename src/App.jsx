import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import JobsheetPart from "./components/jobSheet/jobsheetPart/JobSheetPart";
import JobSheetMain from "./components/jobSheet/jobSheetMain/jobSheetMain";
import Main from "./components/jobSheet/jobSheetList/jobSheetList";
import jobSheetList from "./components/jobSheet/jobSheetList/jobSheetList";
import stockList from "./components/stockItem/stockList/stockList";
import createStock from "./components/stockItem/stockItemForm/createStock";
import UpdateStockItem from "./components/stockItem/updateStockItem/updateStockItem";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="main-wrapper">
          <div className="app-header">
            <Header />
          </div>
          <div className="app-body">
            <div className="body-wrapper">
              <div className="app-navbar">
                <Navbar />
              </div>
              <Switch>
                <div className="app-content">
                  {/* JobSheet */}
                  <Route path="/jobSheet" exact component={jobSheetList} />
                  <Route path="/jobSheetMain" component={JobSheetMain} />
                  <Route path="/jobParts" component={JobsheetPart} />
                  {/* Item Master */}
                  <Route path="/updateStock/:item" component={UpdateStockItem}/>
                  <Route path="/itemMask" exact component={stockList}/>
                  <Route path="/add-stock" component={createStock}/>
                  
                </div>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
