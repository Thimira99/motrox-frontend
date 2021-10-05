import React, { Component } from "react";
import styles from "../jobSheetList/jobSheetList.module.css";
import SearchIcon from "@material-ui/icons/Search";
import JobSheetService from "../../../Services/JobSheetService";
import { Modal, ModalBody, Alert, Table } from "reactstrap";
import { toast } from "react-toastify";

class jobSheetList extends Component {
  state = {
    jobSheets: [],
    filteredData: [],
    selectedItem: null,
    isOpen: false,
    search: "",
  };

  editJobSheet = (jobSheetId) =>
    this.props.history.push(`/updateJobSheet/${jobSheetId}`);

  deleteJobSheet = () => {
    this.toggleDeleteModal();
    JobSheetService.deleteJobSheet(this.state.selectedItem).then((res) => {
      this.setState({
        jobSheets: this.state.jobSheets.filter(
          (jobSheet) => jobSheet.jobSheetId !== this.state.selectedItem
        ),
        selectedItem: null,
      });
      toast.success("Job sheet deleted");
    });
  };

  toggleDeleteModal = () => this.setState({ isOpen: !this.state.isOpen });

  setSelectedItem = (item) => {
    this.setState({ selectedItem: item });
    this.toggleDeleteModal();
  };

  viewJobSheet = (jobSheetId) => {
    this.props.history.push(`/viewJobSheet/${jobSheetId}`);
  };

  jobSheetMain = () => {
    this.props.history.push("/jobSheetMain");
  };

  componentDidMount() {
    JobSheetService.getJobSheets().then((res) => {
      this.setState({ jobSheets: res.data });
    });
  }

  searchhandler = ({ target }) => {
    this.filterData(target.value);
  };

  filterData = (search) => {
    const { jobSheets } = this.state;

    const result = !!search
      ? jobSheets.filter(
          (item) =>
            item.customerName.toLowerCase().includes(search.toLowerCase()) ||
            item.customerNIC.includes(search)
        )
      : [];

    this.setState({ search, filteredData: result });
  };

  render() {
    const { jobSheets, filteredData, search } = this.state;
    const data = !!search ? filteredData : jobSheets;

    return (
      <>
        <h2>Job Sheet List</h2>
        <div className={styles.topContainer}>
          <button
            id={styles.addButton}
            className="btn btn-primary"
            onClick={this.jobSheetMain}
          >
            Add Job Sheet
          </button>
          <div className={styles.searchBar}>
            <input
              type="text"
              id="header-search"
              placeholder="Search "
              name="s"
              onChange={this.searchhandler}
            />
            <div className={styles.searchBarImage}>
              <button onClick={() => this.filterData(search)}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        {data && data.length > 0 ? (
          <div className={styles.table}>
            <Table hover>
              <thead>
                <th style={{ textAlign: "left" }}>#</th>
                <th style={{ textAlign: "left" }}>Customer Name</th>
                <th style={{ textAlign: "left" }}>Customer NIC</th>
                <th style={{ textAlign: "left" }}>Contact Number</th>
                <th style={{ textAlign: "left" }}>Date</th>
                <th style={{ textAlign: "left" }}>Time</th>
                <th>Action</th>
              </thead>
              <tbody>
                {data.map((jobDetails, index) => (
                  <tr key={jobDetails.jobSheetId}>
                    <td>{index + 1}</td>
                    <td>{jobDetails.customerName}</td>
                    <td>{jobDetails.customerNIC}</td>
                    <td>{jobDetails.contactNumber}</td>
                    <td>{jobDetails.date}</td>
                    <td>{jobDetails.time}</td>
                    <td>
                      <div className={styles.buttons}>
                        <button
                          onClick={() =>
                            this.editJobSheet(jobDetails.jobSheetId)
                          }
                          className="btn btn-info btn-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() =>
                            this.viewJobSheet(jobDetails.jobSheetId)
                          }
                          className="btn btn-warning btn-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            this.setSelectedItem(jobDetails.jobSheetId)
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
            </Table>
          </div>
        ) : (
          <Alert className="mt-2" color="primary">
            No items to display
          </Alert>
        )}

        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggleDeleteModal}
          size="sm"
        >
          <ModalBody>
            <p>Are you sure?</p>
            <div className={styles.delete_modal_buttons}>
              <button className="btn btn-danger" onClick={this.deleteJobSheet}>
                Yes
              </button>
              <button
                className="btn btn-primary"
                onClick={this.toggleDeleteModal}
              >
                No
              </button>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default jobSheetList;
