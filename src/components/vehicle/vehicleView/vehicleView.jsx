import React, { Component } from 'react';
import vehicleService from '../../../Services/vehicleService';
import styles from "./vehicleView.module.css";


class vehicleView extends Component {
    constructor(props){
        super(props)

        this.state = {
            vehicleId: this.props.match.params.id,
            vehicle:{}
        }
    }
    componentDidMount(){
        vehicleService.getVehicleById(this.state.vehicleId).then( res =>{
            this.setState({vehicle: res.data});
        });
    }
        
    render() {
        return (
            <div>
               <br/><br/>
                   <h3 className = "text-center">View Vehicle Details</h3><br/>
                   <div className = {styles.dcard}>
                   <table className = {styles.details}>    
                        <tr>
                           <td>Registration Number :</td>               
                           <td>{this.state.vehicle.registrationNo}</td>
                        </tr>

                        <tr>
                        <td>Name of the owner :</td>
                        <td>{this.state.vehicle.nameOfTheOwner}</td>
                        </tr>

                        <tr>
                        <td>Year of manufacture :</td>
                        <td>{this.state.vehicle.yearOfManufacture}</td>
                        </tr>

                        <tr>
                        <td>Model :</td>
                        <td>{this.state.vehicle.model}</td>
                        </tr>

                        <tr>
                        <td>Chassis Number :</td>
                        <td> {this.state.vehicle.chassisNo}</td>
                        </tr>

                        <tr>
                        <td> Engine Number :</td>
                        <td>  {this.state.vehicle.engineNo}</td>
                        </tr>

                        <tr>
                        <td>Type of fuel :</td>
                        <td>{this.state.vehicle.typeOfFuel}</td>
                        </tr>

                        <tr>
                        <td>Type Of Body :</td>
                        <td>{this.state.vehicle.typeOfBody}</td>
                        </tr>

                        <tr>
                        <td>Cylinder Capacity :</td>
                        <td>{this.state.vehicle.cylinderCapacity}</td>
                        </tr>

                        <tr>
                        <td> Date of registration :</td>
                        <td> {this.state.vehicle.dateOfRegistration}</td>
                        </tr>

                        <tr>
                        <td> Class of vehicle :</td>
                        <td>{this.state.vehicle.classOfVehicle}</td>
                        </tr>

                        <tr>
                        <td>Colour : </td>
                        <td>{this.state.vehicle.colour}</td>
                        </tr>

                        <tr>
                        <td>Seating Capacity :</td>
                        <td>{this.state.vehicle.seatingCapacity}</td>
                        </tr>

                        <tr>
                        <td>Make :</td>
                        <td>{this.state.vehicle.make}</td>
                        </tr>
                     </table>   
                        
                        <div className = {styles.buttons}>
                        <button className = {styles.report}>Report</button>
                        </div>
                   </div>
               
            </div>
        );
    }
}

export default vehicleView;