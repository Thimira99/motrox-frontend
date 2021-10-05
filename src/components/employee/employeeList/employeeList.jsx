import React, { Component } from 'react';
import styles from "./employeeList.module.css";
import employeeService from "../../../Services/employeeService";

class employeeList extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
      
    }

    deleteEmployee(id){
        employeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.employeeId !== id)});
        });                                         //id to employeeId
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        employeeService.getEmployees().then((res) => {
            this.setState({employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Employee List</h2>

                
             
                    <button className = "btn btn-primary" onClick={this.addEmployee}>Add employee</button>

                    
                    <br/>  <br/>

                <div className = "row">
                <table className = "table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>  
                            <th>Phone</th>
                           
                            <th>Type</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.employees.map(
                                employee => 
                                <tr key = {employee.employeeId}>
                                    <td className = {styles.aligning}>{employee.employeeName}</td>
                                   
                                    <td className = {styles.aligning}>{employee.employeePhone}</td>
                                    
                                    <td className = {styles.aligning}>{employee.employeeType}</td>
                                    <td className = {styles.aligning}>{employee.employeeCategory}</td>
                                    <td className = {styles.actions}>
                                       
                                        <button onClick ={ () => this.editEmployee(employee.employeeId)} className = "btn btn-info btn-sm">Update</button>&emsp;
                                        <button onClick ={ () => this.viewEmployee(employee.employeeId)} className = "btn btn-warning btn-sm">View</button>&emsp;
                                        <button onClick ={ () => this.deleteEmployee(employee.employeeId)} className = "btn btn-danger btn-sm">Delete</button>&emsp;
                                      
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }
}

export default employeeList;