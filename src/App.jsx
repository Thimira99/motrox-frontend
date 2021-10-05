import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import JobsheetPart from "./components/jobSheet/jobsheetPart/JobSheetPart";
import JobSheetMain from "./components/jobSheet/jobSheetMain/jobSheetMain";
import Main from "./components/jobSheet/jobSheetList/jobSheetList";
import jobSheetList from "./components/jobSheet/jobSheetList/jobSheetList";

import stockList from "./components/stockItem/stockList/stockList";
import createStock from "./components/stockItem/stockItemForm/createStock";
import UpdateStockItem from "./components/stockItem/updateStockItem/updateStockItem";
import UpdateJobSheet from "./components/jobSheet/updateJobSheet/updateJobSheet";
import ViewJobSheet from "./components/jobSheet/viewJobSheet/viewJobSheet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import employeeList from "./components/employee/employeeList/employeeList";
import employeeCreate from "./components/employee/employeeCreate/employeeCreate";
import employeeView from "./components/employee/employeeView/employeeView";


import vehicleList from "./components/vehicle/vehicleList/vehicleList";
import vehicleCreate from "./components/vehicle/vehicleCreate/vehicleCreate";
import vehicleView from "./components/vehicle/vehicleView/vehicleView";

import supplierList from "./components/supplier/supplierList/supplierList";
import supplierCreate from "./components/supplier/supplierCreate/supplierCreate";
import supplierView from "./components/supplier/supplierView/supplierView";


import customerList from "./components/customer/customerList/customerList";
import customerView from "./components/customer/customerView/customerView";
import customerUpdate from "./components/customer/customerUpdate/customerUpdate";
import customerCreate from "./components/customer/customerCreate/customerCreate";

import JobCardMain from "./components/JobCard/J_Main/JobCardMain";
import ListInvoices from "./components/JobCard/J_ListInvoices/ListInvoices";
import JobUpdate from "./components/JobCard/J_ListInvoices/JobUpdate";
import SearchJobcard from "./components/JobCard/J_ListInvoices/SearchJobcard";
import login from "./components/JobCard/J_Main/login";
import Admin_Login from "./components/Admin_Login";


class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
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
                  

                  <Route
                    path="/updateJobSheet/:jobSheetId"
                    component={UpdateJobSheet}
                  />
                  <Route
                    path="/viewJobSheet/:jobSheetId"
                    component={ViewJobSheet}
                  />
                  {/* Customer */}
                <Route path = "/customerDetails" exact component  = {customerList}></Route>
                <Route path = "/add-customer" component = {customerCreate}></Route>
                <Route path = "/view-customer/:id" component ={customerView}></Route>
                <Route path = "/update-customer/:id" component = {customerUpdate}></Route> 

                  {/* Supplier */}
                  <Route path = "/supplierDetails" exact component = {supplierList}></Route>
                  <Route path = "/add-supplier/:id" component = {supplierCreate}></Route> 
                  <Route path = "/view-supplier/:id" component = {supplierView}></Route> 

                    {/*Vehicle*/}
                    <Route path = "/vehicleDetails" exact component = {vehicleList}></Route>
                    <Route path = "/add-vehicle/:id" component = {vehicleCreate}></Route>      
                    <Route path = "/view-vehicle/:id" component = {vehicleView}></Route>                   
                    


                  {/* employee */}
                  <Route path = "/employeeDetails" exact component = {employeeList}></Route>
                  <Route path = "/add-employee/:id" component = {employeeCreate}></Route>
                  <Route path = "/view-employee/:id" component = {employeeView}></Route>

                   {/* Invoice */}
                   <Route path="/jobcard" component={JobCardMain} />
                   <Route path="/view_all_Jobcards" component={ListInvoices}/>
                   <Route path="/view_search_Jobcards" component={SearchJobcard}/>
                   <Route path = "/edit_JobCard/:id" component ={JobUpdate}></Route>
                   <Route path = "/delet-Invoice/:id" component ={JobUpdate}></Route>
                   <Route path = "/login" component ={login}></Route>
                  

                </div>
              </Switch>
              <Route path = "/loginadmin" component ={Admin_Login}></Route>
              <Redirect exact from ='/' to = '/loginadmin'/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
