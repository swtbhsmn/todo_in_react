import React from "react";
import { TextField, Button, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskTable from "./task_data";
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { Typography ,Link,Box} from "@material-ui/core";
const useStyles = (theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #FFF',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
});

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      employees: [],
      task_completed: [],
      open: false
    }

    this.onChangeHandler.bind(this.onChangeHandler);
    this.onEmployeeAdd.bind(this.onEmployeeAdd);
    this.onDeleteItem.bind(this.onDeleteItem);
    this.onEditItem.bind(this.onEditItem);
    this.handleOpen.bind(this.handleOpen);
    this.handleClose.bind(this.handleClose);


  }

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  onEmployeeAdd = () => {
   
    const { employee ,employees} = this.state;
    if(employees.length===0){
      this.setState({
        task_completed:[]
      })
    }
    if (employee !== '') {
      const userInput = {

        employeeId: this.state.employees.length+1,

        employeeName: employee
      };

      const employees = [...this.state.employees];
      employees.push(userInput);

      this.setState({
        employee: "",
        employees,

      });
    }

  }

  onDeleteItem = (key) => {
   
    let employees = [...this.state.employees];
    let completedTask = [...this.state.task_completed];
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    let time_format = `${h}:${m}:${s}`;
    let update_index = employees.findIndex(item => item.employeeId === key);

    let task_update = {
      task_id:this.state.employees[update_index].employeeId,
      task_name:this.state.employees[update_index].employeeName,
      time_completed:time_format,
    }

    completedTask.push(task_update);

    let updateList = employees.filter(item => item.employeeId !== key);

    this.setState({
      employees: updateList,
      task_completed: completedTask
    }, () => {
      if (this.state.employees.length === 0) {

        this.handleOpen();
      
      }
    });



  }

  onEditItem = (id, value) => {

    const employees = [...this.state.employees];

    const update_index = employees.findIndex(item => item.employeeId === id);
    employees[update_index].employeeName = value;
    this.setState({ employees: employees })
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false,task_completed:[] })
  };

  render() {
    const { classes } = this.props;

    const Footer=()=>{
    
        return (
            <Typography variant="body2" color="textPrimary" align="center">
                {'Copyright © '}
                <Link color="primary" href="https://www.linkedin.com/in/swetabhsuman/">
                    SwetabhSuman
          </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
   
    }
    const body = (
      <div className={classes.paper}>
        <h2 id="simple-modal-title" style={{ color: "#32a848" }}>Successfully Task Completed!</h2>

      <table>
        <tbody>
          <tr>
          <th style={{padding:10}}>Task Id</th>
            <th style={{padding:10}}>Task Name</th>
            <th style={{padding:10}}>Task End Time</th>
            <th style={{padding:10}}>Task Completed</th>
          </tr>
          {this.state.task_completed.map((item, key) => {
          return (
            <tr key={key} >
              <td className="text-center"> {item.task_id}</td>
              <td className="text-center"> {item.task_name}</td>
              <td className="text-center"> {item.time_completed}</td>
              <td className="text-center"> <i className="material-icons" style={{ color: "#32a848" }}>done</i></td>
               
            </tr>
          );
        })}
        </tbody>
      </table>

       

      </div>
    );
    return (
      <div >
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal-body"
        >
          {body}
        </Modal>
        <div className="taskDetails">
          <div className="active">
            <p>Active Task</p>
            <p>{this.state.employees.length}</p>
          </div>
          <div className="completed"><p>Completed Task</p>
            <p>  {this.state.task_completed.length}</p>
          </div>

        </div>
        <div className="container-employee">

          <TextField id="filled-basic"
            onChange={this.onChangeHandler}
            label="Add Task"
            name="employee"
            variant="standard"
            value={this.state.employee}
            autoFocus />
          <Button onClick={this.onEmployeeAdd} color="primary"><AddIcon /></Button>
        </div>
        <div className="table-container">
          <Container maxWidth="md" >

            < TaskTable employees_list={this.state.employees} click={this.onDeleteItem} onEdit={this.onEditItem} />


          </Container>
        </div>
      
        <Box mt={5} className="footer">
                        <Footer />
        </Box>
      </div>
    );
  }
}

export default withStyles(useStyles)(Task);