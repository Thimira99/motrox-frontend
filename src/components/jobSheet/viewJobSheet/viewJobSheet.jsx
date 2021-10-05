import { StylesContext } from "@material-ui/styles";
import React, { Component, useRef } from "react";
import JobSheetService from "../../../Services/JobSheetService";
import styles from "../viewJobSheet/viewJobSheet.module.css";
import Pdf from "react-to-pdf";

class ViewJobSheet extends Component {
  state = {
    jobSheetId: this.props.match.params.jobSheetId,
    jobSheet: {},
  };

  componentDidMount() {
    JobSheetService.getJobSheetById(this.state.jobSheetId).then((res) => {
      this.setState({ jobSheet: res.data });
    });
  }

  render() {
    const ref = React.createRef();
    return (
      <div ref={ref}>
        <h2 style={{ marginTop: "1rem" }}>Details</h2>
        <div className={styles.mainCard}>
          <div className="container p-3 my-3 bg-dark text-white">
            <div className={styles.nameNumber}>
              <lable>Customer Name: {this.state.jobSheet.customerName}</lable>
              <br />
              <lable>Contact Number: {this.state.jobSheet.contactNumber}</lable>
            </div>
            <div className={styles.detailsGroup}>
              <div>
                Front(Usable) Parts: {this.state.jobSheet.frontUsable}
                <br />
                Front(Replace) Parts:{this.state.jobSheet.frontReplace}
              </div>
              <div>
                Rear(Usable) Parts: {this.state.jobSheet.rearUsable}
                <br />
                Rear(Replace) Parts:{this.state.jobSheet.rearReplace}
              </div>
              <div>
                Left/Right(Usable) Parts: {this.state.jobSheet.lRUsable}
                <br />
                Left/Right(Usable) Parts:{this.state.jobSheet.lRReplace}
              </div>
              <div>
                Engine Room(Usable) Parts: {this.state.jobSheet.rearUsable}
                <br />
                Engine Room(Replace) Parts:{this.state.jobSheet.rearReplace}
              </div>
              <div>
                Front(Usable) Parts: {this.state.jobSheet.frontUsable}
                <br />
                Front(Replace) Parts:{this.state.jobSheet.frontReplace}
              </div>
              <div>
                Rear(Usable) Parts: {this.state.jobSheet.rearUsable}
                <br />
                Rear(Replace) Parts:{this.state.jobSheet.rearReplace}
              </div>
            </div>
            <Pdf
              targetRef={ref}
              filename="post.pdf"
              x={0.5}
              y={0.5}
              scale={0.8}
            >
              {({ toPdf }) => (
                <div className={styles.reportButton}>
                  <button onClick={toPdf} className="btn btn-info">
                    Report
                  </button>
                </div>
              )}
            </Pdf>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewJobSheet;
