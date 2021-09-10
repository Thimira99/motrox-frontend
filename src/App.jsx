import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import JobsheetPart from "./components/jobSheet/jobsheetPart/JobSheetPart";
import JobSheetMain from "./components/jobSheet/jobSheetMain/jobSheetMain";
import Main from "./components/jobSheet/jobSheetList/jobSheetList";
import jobSheetList from "./components/jobSheet/jobSheetList/jobSheetList";
import UpdateJobSheet from "./components/jobSheet/updateJobSheet/updateJobSheet";

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
                  <Route
                    path="/updateJobSheet/:jobSheetId"
                    component={UpdateJobSheet}
                  />
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
