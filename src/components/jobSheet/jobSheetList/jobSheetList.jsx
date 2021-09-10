import React, { Component } from "react";
import styles from "../jobSheetList/jobSheetList.module.css";
import SearchIcon from "@material-ui/icons/Search";
import JobSheetService from "../../../Services/JobSheetService";

class jobSheetList extends Component {
  state = {
    jobSheets: [],
  };

  editJobSheet = (jobSheetId) =>
    this.props.history.push(`/updateJobSheet/${jobSheetId}`);

  deleteJobSheet = (jobSheetId) => {
    JobSheetService.deleteJobSheet(jobSheetId).then((res) => {
      this.setState({
        jobSheets: this.state.jobSheets.filter(
          (jobSheet) => jobSheet.jobSheetId !== jobSheetId
        ),
      });
    });
  };

  jobSheetMain = () => {
    this.props.history.push("/jobSheetMain");
  };

  componentDidMount() {
    JobSheetService.getJobSheets().then((res) => {
      this.setState({ jobSheets: res.data });
    });
  }

  render() {
    return (
      <>
        <h2>Job Sheet List</h2>
        <div className={styles.topContainer}>
          <button className="btn btn-primary" onClick={this.jobSheetMain}>
            Add Job Sheet
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
          <div className="table table-bordered">
            <thead>
              <th>Customer Name</th>
              <th>Customer NIC</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </thead>
            <tbody>
              {this.state.jobSheets.map((jobDetails) => (
                <tr key={jobDetails.jobSheetId}>
                  <td>{jobDetails.customerName}</td>
                  <td>{jobDetails.customerNIC}</td>
                  <td>{jobDetails.contactNumber}</td>
                  <td>{jobDetails.date}</td>
                  <td>{jobDetails.time}</td>
                  <td>
                    <div className={styles.buttons}>
                      <button
                        onClick={() => this.editJobSheet(jobDetails.jobSheetId)}
                        className="btn btn-info btn-sm"
                      >
                        Update
                      </button>
                      <button className="btn btn-warning btn-sm">View</button>
                      <button
                        onClick={() =>
                          this.deleteJobSheet(jobDetails.jobSheetId)
                        }
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </div>
      </>
    );
  }
}

export default jobSheetList;
