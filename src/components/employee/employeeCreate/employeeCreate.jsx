import React, { Component } from 'react';
import styles from "./employeeCreate.module.css";
import employeeService from "../../../Services/employeeService";

class employeeCreate extends Component {
    constructor(props){
        super(props)

        this.state = {
            employeeId: this.props.match.params.id,
            employeeName: '',
            employeeNIC: '',
            employeeAddress: '',
            employeePhone: '',
            employeeEmail: '',
            employeeJoinDate: '',
            basicSalary: '',
            employeeType: '',
            employeeCategory: ''
        }

        this.changeemployeeNameHandler = this.changeemployeeNameHandler.bind(this);
        this.changeemployeeNICHandler = this.changeemployeeNICHandler.bind(this);
        this.changeemployeeAddressHandler = this.changeemployeeAddressHandler.bind(this);
        this.changeemployeePhoneHandler = this.changeemployeePhoneHandler.bind(this);
        this.changeemployeeEmailHandler = this.changeemployeeEmailHandler.bind(this);
        this.changeemployeeJoinDateHandler = this.changeemployeeJoinDateHandler.bind(this);
        this.changebasicSalaryHandler = this.changebasicSalaryHandler.bind(this);
        this.changeemployeeTypeHandler = this.changeemployeeTypeHandler.bind(this);
        this.changeemployeeCategoryHandler = this.changeemployeeCategoryHandler.bind(this);

        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount(){

        if(this.state.employeeId === '_add'){ //id to employeeId
            return
        }else{
            employeeService.getEmployeeById(this.state.employeeId).then( (res) => {  //id to employeeId
                let employee = res.data;
                this.setState({employeeName: employee.employeeName,
                                employeeNIC: employee.employeeNIC,
                                employeeAddress: employee.employeeAddress,
                                employeePhone: employee.employeePhone,
                                employeeEmail: employee.employeeEmail,
                                employeeJoinDate: employee.employeeJoinDate,
                                basicSalary: employee.basicSalary,
                                employeeType: employee.employeeType,
                                employeeCategory: employee.employeeCategory});
            });
        }
    }



    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {employeeName: this.state.employeeName,
                        employeeNIC: this.state.employeeNIC,
                        employeeAddress: this.state.employeeAddress,
                        employeePhone: this.state.employeePhone,
                        employeeEmail: this.state.employeeEmail,
                        employeeJoinDate: this.state.employeeJoinDate,
                        basicSalary: this.state.basicSalary,
                        employeeType: this.state.employeeType,
                        employeeCategory: this.state.employeeCategory};
        console.log('employee => ' + JSON.stringify(employee));

        
        if(this.state.employeeId === '_add'){//id to employeeId
            employeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employeeDetails');
            });
        }else{
            employeeService.updateEmployee(employee, this.state.employeeId).then( res => {//id to employeeId
                this.props.history.push('/employeeDetails');
            });
        }
    }

    changeemployeeNameHandler = (event) => {
        this.setState({employeeName: event.target.value});//edited
    }

    changeemployeeNICHandler = (event) => {
        this.setState({employeeNIC: event.target.value});//edited
    }
    changeemployeeAddressHandler = (event) => {
        this.setState({employeeAddress: event.target.value});//edited
    }
    changeemployeePhoneHandler = (event) => {
        this.setState({employeePhone: event.target.value});//edited
    }
    changeemployeeEmailHandler = (event) => {
        this.setState({employeeEmail: event.target.value});//edited
    }
    changeemployeeJoinDateHandler = (event) => {
        this.setState({employeeJoinDate: event.target.value});//edited
    }
    changebasicSalaryHandler = (event) => {
        this.setState({basicSalary: event.target.value});//edited
    }
    changeemployeeTypeHandler = (event) => {
        this.setState({employeeType: event.target.value});//edited
    }
    changeemployeeCategoryHandler = (event) => {
        this.setState({employeeCategory: event.target.value});//edited
    }


    cancel(){
        this.props.history.push("/employeeDetails");
    }

    getTitle(){
        if(this.state.employeeId === '_add'){//id to employeeId
            return <h3 className = "text-center">Add Employee</h3>
        }else{
            return <h3 className = "text-center">Update Employee</h3>
        }
    }               //inputs edited
    render() {
        return (
            <div>
             
                    {
                                this.getTitle()
                    }
                         
                        <div className = {styles.vcard}>

                                <form name = "form1">
                                    
                                <div className = {styles.inputs}>
                                        <label>Name</label>
                                        <input type = "text" placeholder = "Enter Full Name" name = "Name" className = "form-control"
                                        value = {this.state.employeeName} onChange = {this.changeemployeeNameHandler}  /> 
                                </div>
                                <div className = {styles.inputs}>
                                        <label>NIC</label>
                                        <input type = "text" placeholder = "Enter NIC" name = "NIC" className = "form-control"
                                        value = {this.state.employeeNIC} onChange = {this.changeemployeeNICHandler}/> 
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Address</label>
                                        <input type = "text" placeholder = "Enter Address" name = "Address" className = "form-control"
                                        value = {this.state.employeeAddress} onChange = {this.changeemployeeAddressHandler}/> 
                                     </div>
                                    <div className = {styles.inputs}>
                                        <label>Phone</label>
                                        <input type = "text" placeholder = "Enter Phone" name = "Phone" className = "form-control"
                                        value = {this.state.employeePhone} onChange = {this.changeemployeePhoneHandler}/> 
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Email</label>
                                        <input type = "text" placeholder = "Enter Email" name = "email1" className = "form-control"
                                        value = {this.state.employeeEmail} onChange = {this.changeemployeeEmailHandler}/> 
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>JoinDate</label>
                                        <input type = "date" placeholder = "Enter Joined Date" name = "JoinDate" className = "form-control"
                                        value = {this.state.employeeJoinDate} onChange = {this.changeemployeeJoinDateHandler}/> 
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>BasicSalary</label>
                                        <input type = "text" placeholder = "Enter Basic Salary" name = "basicSalary" className = "form-control"
                                        value = {this.state.basicSalary} onChange = {this.changebasicSalaryHandler}/> 
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Type</label>
                                        <input type = "text" placeholder = "Enter Type" name = "Type" className = "form-control"
                                        value = {this.state.employeeType} onChange = {this.changeemployeeTypeHandler}/> 
                                        </div>
                                        <div className = {styles.inputs}>
                                        <label>Category</label>
                                        <input type = "text" placeholder = "Enter Category" name = "Category" className = "form-control"
                                        value = {this.state.employeeCategory} onChange = {this.changeemployeeCategoryHandler}/> 
                                         </div>

                                <br/>

                                 
                                    <div className = {styles.buttons}>
                                    <button className = "btn btn-secondary" onClick = {this.saveOrUpdateEmployee}>Save</button>
                                    <div className = {styles.divider}></div>
                                    <button className = "btn btn-secondary" onClick = {this.cancel.bind(this)}>Cancel</button>
                                </div>
                                </form>
                                </div>



          </div>

              

            
        );
    }
}

export default employeeCreate;