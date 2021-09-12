import React, { Component } from 'react';
import styles from "./JobCardMain.module.css"
class JobCardMain extends Component {
    constructor(props){
        super(props)
    
        this.state={
            
        }
    
   
        this.viewAll=this.viewAll.bind(this);
    }



    viewAll(){
        this.props.history.push('/view_all_Jobcards');
    }


    render() {
        return (
            <div>
            <h2>Job Card</h2>
            <div className={styles.saveButton}>
              <button className="btn btn-secondary" onClick={this.viewAll}>
                View All
              </button>
            </div>
            <div className="container p-3 my-3 bg-dark text-white">
              <form className={styles.form}>
                <div className={styles.input_group}>
                  <label>Job number:</label>
                  <input placeholder="Customer Name" name="firstName" />
                </div>
              
                <div className={styles.input_group}>
                  <label>Vehicle Number:</label>
                  <input placeholder="Vehicle Id" name="lastName" />
                </div>

                <div className={styles.input_group}>
                  <label>Date:</label>
                  <input type="Date" placeholder="Date" name="lastName" />
                </div>
               
                
               
                
              </form>
            </div>


            <div className="container p-3 my-3 bg-dark text-white">
              <form className={styles.form}>
                <div className={styles.input_groups}>
                  <label>Item:</label>
                  <input placeholder="Customer Name" name="firstName" />
                </div>
           
                <div className={styles.input_groups}>
                  <label>Vehicle Id:</label>
                  <input placeholder="Vehicle Id" name="lastName" />
                </div>
                <div className={styles.input_groups}>
                  <label>QTY:</label>
                  <input placeholder="Vehicle Id" name="lastName" />
                </div>
              
                
              </form>
            </div>


          </div>
            
        );
    }

}

export default JobCardMain;