import React, { Component } from 'react';
import vehicleService from '../../../Services/vehicleService';
import styles from "./vehicleCreate.module.css";

class vehicleCreate extends Component {
    constructor(props){
        super(props)
            this.state = {
                
                vehicleId:this.props.match.params.id,
                registrationNo: '',
                nameOfTheOwner: '',
                yearOfManufacture: '',
                model: '',
                chassisNo: '',
                engineNo: '',
                typeOfFuel: '',
                typeOfBody: '',
                cylinderCapacity: '',
                dateOfRegistration: '',
                classOfVehicle: '',
                colour: '',
                seatingCapacity:'',
                make:''
            }
            
            this.changeregistrationNoHandler = this.changeregistrationNoHandler.bind(this);
            this.changenameOfTheOwnerHandler = this.changenameOfTheOwnerHandler.bind(this);
            this.changeyearOfManufactureHandler = this.changeyearOfManufactureHandler.bind(this);
            this.changemodelHandler = this.changemodelHandler.bind(this);
            this.changechassisNoHandler = this.changechassisNoHandler.bind(this);
            this.changeengineNoHandler = this.changeengineNoHandler.bind(this);
            this.changetypeOfBodyHandler = this.changetypeOfBodyHandler.bind(this);
            this.changetypeOfFuelHandler = this.changetypeOfFuelHandler.bind(this);
            this.changecylinderCapacityHandler = this.changecylinderCapacityHandler.bind(this);
            this.changedateOfRegistrationHandler = this.changedateOfRegistrationHandler.bind(this);
            this.changeclassOfVehicleHandler = this.changeclassOfVehicleHandler.bind(this);
            this.changecolourHandler = this.changecolourHandler.bind(this);
            this.changeseatingCapacityHandler = this.changeseatingCapacityHandler.bind(this);
            this.changemakeHandler = this.changemakeHandler.bind(this);
            this.saveOrUpdateVehicle = this.saveOrUpdateVehicle.bind(this);
    }

    
    componentDidMount(){
        
        if(this.state.vehicleId === '_add'){
            return
        }else{

       
            vehicleService.getVehicleById(this.state.vehicleId).then((res) => {
                let vehicle = res.data;
                this.setState({registrationNo:vehicle.registrationNo,
                nameOfTheOwner:vehicle.nameOfTheOwner,
                yearOfManufacture:vehicle.yearOfManufacture,
                model:vehicle.model,
                chassisNo:vehicle.chassisNo,
                engineNo:vehicle.engineNo,
                typeOfFuel:vehicle.typeOfFuel,
                typeOfBody:vehicle.typeOfBody,
                cylinderCapacity:vehicle.cylinderCapacity,
                dateOfRegistration:vehicle.dateOfRegistration,
                classOfVehicle:vehicle.classOfVehicle,
                colour:vehicle.colour,
                seatingCapacity:vehicle.seatingCapacity,
                make:vehicle.make,
                
            });
            });

        }
    }
    
    changeregistrationNoHandler = (event) => {
        this.setState({registrationNo: event.target.value});
    }

    changenameOfTheOwnerHandler = (event) => {
        this.setState({nameOfTheOwner: event.target.value});
    }

    changeyearOfManufactureHandler = (event) => {
        this.setState({yearOfManufacture: event.target.value});
    }

    changemodelHandler = (event) => {
        this.setState({model: event.target.value});
    }

    changechassisNoHandler = (event) => {
        this.setState({chassisNo: event.target.value});
    }

    changeengineNoHandler = (event) => {
        this.setState({engineNo: event.target.value});
    }

    changetypeOfBodyHandler = (event) => {
        this.setState({typeOfBody: event.target.value});
    }

    changetypeOfFuelHandler = (event) => {
        this.setState({typeOfFuel: event.target.value});
    }

    changecylinderCapacityHandler = (event) => {
        this.setState({cylinderCapacity: event.target.value});
    }

    changedateOfRegistrationHandler = (event) => {
        this.setState({dateOfRegistration: event.target.value});
    }
    
    changeclassOfVehicleHandler = (event) => {
        this.setState({classOfVehicle: event.target.value});
    }

    changeseatingCapacityHandler = (event) => {
        this.setState({seatingCapacity: event.target.value});
    }

    changemakeHandler = (event) => {
        this.setState({make: event.target.value});
    }

    changecolourHandler = (event) => {
        this.setState({colour: event.target.value});
    }
    
    

    saveOrUpdateVehicle = (e) => {
        e.preventDefault();
        let vehicle = {registrationNo: this.state.registrationNo,
            nameOfTheOwner:this.state.nameOfTheOwner,
            yearOfManufacture:this.state.yearOfManufacture,
            model:this.state.model,
            chassisNo:this.state.chassisNo,
            engineNo:this.state.engineNo,
            typeOfFuel:this.state.typeOfFuel,
            typeOfBody:this.state.typeOfBody,
            cylinderCapacity:this.state.cylinderCapacity,
            dateOfRegistration:this.state.dateOfRegistration,
            classOfVehicle:this.state.classOfVehicle,
            colour:this.state.colour,
            seatingCapacity:this.state.seatingCapacity,
            make:this.state.make};
        console.log('vehicle =>' + JSON.stringify(vehicle));

        
        if(this.state.vehicleId === '_add'){
            vehicleService.createVehicles(vehicle).then(res => {
                this.props.history.push('/vehicleDetails');
            });
        }else{
            vehicleService.updateVehicle(vehicle, this.state.vehicleId).then((res) => {
                this.props.history.push('/vehicleDetails');
            });
           
        }
        
    }
    cancel(){
        this.props.history.push('/vehicleDetails');
    }

    
    getTitle(){
        if(this.state.vehicleId === '_add'){
            return <h3 className = "text-center">Add Vehicle</h3>
        }else{
            return <h3 className = "text-center">Update Vehicle</h3>
        }
    }
    render() {
        return (
                        <div>              
                            {
                                this.getTitle()
                            }
                        <br/>
                            <div className = {styles.vcard}>
                                <form>
                                    <div className = {styles.inputs}>
                                        <label>Registration Number</label>
                                        <input type = "text" placeholder = "Registration Number" name = "registrationNo" className = "form-control" value = {this.state.registrationNo} onChange = {this.changeregistrationNoHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Name of the owner</label>
                                        <input  type = "text" placeholder = "Name of the owner" name = "nameOfTheOwner" className = "form-control" value = {this.state.nameOfTheOwner} onChange = {this.changenameOfTheOwnerHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Year of manufature</label>
                                        <input  type = "text" placeholder = "Year of manufacture" name = "yearOfManufature" className = "form-control" value = {this.state.yearOfManufacture} onChange = {this.changeyearOfManufactureHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Model</label>
                                        <input  type = "text" placeholder = "Model" name = "model" className = "form-control" value = {this.state.model} onChange = {this.changemodelHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Chassis Number</label>
                                        <input type = "text"  placeholder = "Chassis Number" name = "chassisNo" className = "form-control" value = {this.state.chassisNo} onChange = {this.changechassisNoHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Engine Number</label>
                                        <input  type = "text" placeholder = "Engine Number" name = "engineNo" className = "form-control" value = {this.state.engineNo} onChange = {this.changeengineNoHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Type of fuel</label>
                                        <input  type = "text" placeholder = "Type of fuel" name = "typeOfFuel" className = "form-control" value = {this.state.typeOfFuel} onChange = {this.changetypeOfFuelHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Type of body</label>
                                        <input  type = "text" placeholder = "Type of body" name = "typeOfBody" className = "form-control" value = {this.state.typeOfBody} onChange = {this.changetypeOfBodyHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Cylinder Capacity</label>
                                        <input  type = "text" placeholder = "Cylinder Capacity" name = "cylinderCapacity" className = "form-control" value = {this.state.cylinderCapacity} onChange = {this.changecylinderCapacityHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Date of registration</label>
                                        <input  type = "date" placeholder = "Date of registration" name = "dateOfRegistration" className = "form-control" value = {this.state.dateOfRegistration} onChange = {this.changedateOfRegistrationHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Class of vehicle</label>
                                        <input  type = "text" placeholder = "Class of vehicle" name = "classOfVehicle" className = "form-control" value = {this.state.classOfVehicle} onChange = {this.changeclassOfVehicleHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Colour</label>
                                        <input type = "text"  placeholder = "Colour" name = "colour" className = "form-control" value = {this.state.colour} onChange = {this.changecolourHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Seating Capacity</label>
                                        <input  type = "text" placeholder = "Seating Capacity" name = "seatingCapacity" className = "form-control" value = {this.state.seatingCapacity} onChange = {this.changeseatingCapacityHandler}/>
                                    </div>
                                    <div className = {styles.inputs}>
                                        <label>Make</label>
                                        <input  type = "text" placeholder = "Make" name = "make" className = "form-control" value = {this.state.make} onChange = {this.changemakeHandler}/>
                                    </div>

                                    <br/><br/>
                                    <div class = {styles.buttons}>                                   
                                    <button className = "btn btn-secondary" onClick={this.saveOrUpdateVehicle}>Save  </button>
                                    <div class = {styles.divider}></div>
                                    <button className = "btn btn-secondary" onClick={this.cancel.bind(this)}>Cancel</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
        );
    }
}

export default vehicleCreate;