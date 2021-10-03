import React, { Component } from 'react';
import vehicleService from '../../../Services/vehicleService';
import styles from "./vehicleList.module.css";

class vehicleList extends Component {
    constructor(props){
        super(props)

        this.state = {
            vehicles: []
        }
        this.addVehicle = this.addVehicle.bind(this);
        this.editVehicle = this.editVehicle.bind(this);
        this.deleteVehicle = this.deleteVehicle.bind(this);
     
    }
    
    deleteVehicle(id){
        //rest api
        vehicleService.deleteVehicle(id).then( res => {
            this.setState({vehicles: this.state.vehicles.filter(vehicle => vehicle.vehicleId !== id)});
        });
    }
 
    viewVehicle(id){
        this.props.history.push(`/view-vehicle/${id}`);
    }

    editVehicle(id){
        this.props.history.push(`/add-vehicle/${id}`);
    }

    componentDidMount(){
        vehicleService.getVehicles().then((res) => {
            this.setState({vehicles :res.data});
        });

    }

    addVehicle() {
        this.props.history.push('/add-vehicle/_add');
        
        
    }
    render() {
        return (
            <div><br/>
                <h2 className= "text-center">Vehicle List</h2>
                    <br/>
                    <button className = "btn btn-primary" onClick = {this.addVehicle}>Add Vehicle</button><br/><br/>
                
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                      
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Name of the owner</th>
                                <th>Year of Manufacture</th>
                                <th>Model</th>
                                <th>Actions</th>                                
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.vehicles.map(
                                    vehicle =>
                                    <tr key = {vehicle.vehicleId}>
                                        <td className = {styles.aligning}>{vehicle.registrationNo}</td>
                                        <td className = {styles.aligning}>{vehicle.nameOfTheOwner}</td>
                                        <td className = {styles.aligning}>{vehicle.yearOfManufacture}</td>   
                                        <td className = {styles.aligning}>{vehicle.model}</td>   
                                        <td className = {styles.actions}>
                                            <div>
                                            <button onClick = { () => this.editVehicle(vehicle.vehicleId)} className = {styles.addUpdate} >Update</button>
                                            <button  onClick = { () => this.viewVehicle(vehicle.vehicleId)} className = {styles.view} >View</button>
                                            <button  onClick = { () => this.deleteVehicle(vehicle.vehicleId)} className = {styles.delete} >Delete</button>
                                            </div>
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

export default vehicleList;