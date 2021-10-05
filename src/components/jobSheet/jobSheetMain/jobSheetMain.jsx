import React, { Component } from "react";
import styles from "./jobSheetMain.module.css";
import { useHistory } from "react-router-dom";
import JobSheetService from "../../../Services/JobSheetService";
import { toast } from "react-toastify";

class JobSheetMain extends Component {
  state = {
    customerName: "",
    customerNIC: "",
    vehicelId: "",
    contactNumber: "",
    date: "",
    time: "",
    frontUsable: "",
    frontReplace: "",
    rearUsable: "",
    rearReplace: "",
    lRUsable: "",
    lRReplace: "",
    topUsable: "",
    topReplace: "",
    engineRUsable: "",
    engineRReplace: "",
    bottomUsable: "",
    bottomReplace: "",
  };

  jobParts = () => {
    window.open("/jobParts");
  };

  saveJobSheet = (e) => {
    e.preventDefault();

    if (!!!this.state.customerName)
      return toast.error("Please input the customer name.");

    if (!!!this.state.customerNIC)
      return toast.error("Please input the customer NIC.");

    if (!!!this.state.vehicelId)
      return toast.error("Please input the Vehicle ID.");

    if (!!!this.state.contactNumber)
      return toast.error("Please input the Contact Number.");

    if (!!!this.state.date) return toast.error("Please input the Date.");

    if (!!!this.state.time) return toast.error("Please input the Time.");

    let jobSheet = {
      customerName: this.state.customerName,
      customerNIC: this.state.customerNIC,
      vehicelId: this.state.vehicelId,
      contactNumber: this.state.contactNumber,
      date: this.state.date,
      time: this.state.time,
      frontUsable: this.state.frontUsable,
      frontReplace: this.state.frontReplace,
      rearUsable: this.state.rearUsable,
      rearReplace: this.state.rearReplace,
      lRUsable: this.state.lRUsable,
      lRReplace: this.state.lRReplace,
      topUsable: this.state.topUsable,
      topReplace: this.state.topReplace,
      engineRUsable: this.state.engineRUsable,
      engineRReplace: this.state.engineRReplace,
      bottomUsable: this.state.bottomUsable,
      bottomReplace: this.state.bottomReplace,
    };
    console.log(`jobSheet => ` + JSON.stringify(jobSheet));
    JobSheetService.createJobSheet(jobSheet).then((res) => {
      this.props.history.push("/jobSheet");
      toast.success("Job sheet added");
    });
  };

  cancel() {
    this.props.history.push("/jobSheet");
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div>
        <h2>Job Sheet</h2>
        <button
          id={styles.jobSheetPartButton}
          className="btn btn-primary"
          onClick={this.jobParts}
        >
          CLICK HERE TO GET THE ITEM CODE
        </button>
        <div className="container p-3 my-3 bg-light border border-dark ">
          <form className={styles.form}>
            <div className={styles.input_group}>
              <label>Customer Name*:</label>
              <input
                placeholder="Customer Name"
                name="customerName"
                value={this.state.customerName}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <label>Customer NIC*:</label>
              <input
                placeholder="Customer NIC"
                name="customerNIC"
                value={this.state.customerNIC}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <label>Vehicle Id*:</label>
              <input
                placeholder="Vehicle Id"
                name="vehicelId"
                value={this.state.vehicelId}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <label>Contact Number*:</label>
              <input
                placeholder="Contact Number"
                name="contactNumber"
                value={this.state.contactNumber}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <label>Date*:</label>
              <input
                type="Date"
                placeholder="Date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.input_group}>
              <label>Time*:</label>
              <input
                placeholder="Time"
                name="time"
                value={this.state.time}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.frontSide}>
              <h4>
                <u>FRONT SIDE</u>
              </h4>
              <label>Front(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="frontUsable"
                value={this.state.frontUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Front(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="frontReplace"
                  value={this.state.frontReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.rearSide}>
              <h4>
                <u>REAR SIDE</u>
              </h4>
              <label>Rear(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="rearUsable"
                value={this.state.rearUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Rear(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="rearReplace"
                  value={this.state.rearReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.leftrightSide}>
              <h4>
                <u>LEFT/RIGHT SIDE</u>
              </h4>
              <label>Left/Right(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="lRUsable"
                value={this.state.lRUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Left/Right(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="lRReplace"
                  value={this.state.lRReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.topSide}>
              <h4>
                <u>TOP SIDE</u>
              </h4>
              <label>Top(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="topUsable"
                value={this.state.topUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Top(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="topReplace"
                  value={this.state.topReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.engineRoom}>
              <h4>
                <u>ENGINE ROOM</u>
              </h4>
              <label>Engine Room(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="engineRUsable"
                value={this.state.engineRUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Engine Room(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="engineRReplace"
                  value={this.state.engineRReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.bottomSide}>
              <h4>
                <u>BOTTOM SIDE</u>
              </h4>
              <label>Bottom(Usable):</label>
              <input
                placeholder="Eg:#----/#----"
                name="bottomUsable"
                value={this.state.bottomUsable}
                onChange={this.handleChange}
              />
              <div>
                <label>Bottom(Replace):</label>
                <input
                  placeholder="Eg:#----/#----"
                  name="bottomReplace"
                  value={this.state.bottomReplace}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className={styles.saveButton}>
              <button className="btn btn-secondary" onClick={this.saveJobSheet}>
                Save
              </button>
            </div>
            <div className={styles.cancelButton}>
              <button className="btn btn-secondary" onClick={this.cancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JobSheetMain;
