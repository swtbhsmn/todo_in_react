import React from "react";
import {TextField,Button,Container,Grid} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import  EnployeeTable from "./employees_data";
class Employee extends React.Component{
    constructor(props){
        super(props);
        this.state={
            employee:"",
            employees:[]
        }

        this.onChangeHandler.bind(this.onChangeHandler);
        this.onEmployeeAdd.bind(this.onEmployeeAdd);
        this.onDeleteItem.bind(this.onDeleteItem);
    }

    onChangeHandler=(event)=>{
        event.preventDefault();
        this.setState({[event.target.name]:event.target.value});
    }

    onEmployeeAdd=()=>{
        const{employee}= this.state;

        if(employee !== '' ){ 
            const userInput = { 
    
              employeeId :  this.state.employees.length +1, 
        
              employeeName : employee
            }; 
        
            const employees= [...this.state.employees]; 
            employees.push(userInput); 
        
         
            this.setState({ 
              employee:"",
              employees
            
            }); 
          } 
   
    }

     onDeleteItem=(key)=>{ 
       
         const employees = [...this.state.employees]; 
         const updateList = employees.filter(item => item.employeeId !== key);
         console.log(updateList);
         this.setState({ 
           employees:updateList, 
         }); 
      
      } 
      
    render(){
        return(
            <div >
                <div className="container-employee">
                <TextField id="filled-basic" 
                            onChange={this.onChangeHandler} 
                            label="Add Employee" 
                            name="employee" 
                            variant="standard"       
                            value={this.state.employee}
                            autoFocus/>
                <Button onClick={this.onEmployeeAdd} color="primary"><AddIcon/></Button>
                </div>
                <div>
                                <Container maxWidth="md">
                               
                                          < EnployeeTable employees_list={this.state.employees} click={this.onDeleteItem}/>
                                  
                                
                                </Container>
                </div>
            </div>
        );
    }
}

export default Employee;