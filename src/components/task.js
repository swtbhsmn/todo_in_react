import React from "react";
import { TextField, Button, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskTable from "./task_data";
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
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
    const { employee } = this.state;

    if (employee !== '') {
      const userInput = {

        employeeId: this.state.employees.length + 1,

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
    this.setState({openModal:true});
    let employees = [...this.state.employees];
    let completedTask = [...this.state.task_completed];
    completedTask.push(employees[key-1]);
    let updateList = employees.filter(item => item.employeeId !== key);

    this.setState({
      employees: updateList,
      task_completed: completedTask
    },()=>{
      if(this.state.employees.length===0){
      
        this.handleOpen();    }
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
    this.setState({ open: false })
};

  render() {
    const {classes} =this.props;
    const body = (
      <div className={classes.paper}>
          <h2 id="simple-modal-title">TaskBar</h2>
          <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>

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
            <p>ActiveTask</p>
            <p>{this.state.employees.length}</p>
          </div>
          <div className="completed"><p>CompletedTask</p>
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
        <div>
          <Container maxWidth="md">

            < TaskTable employees_list={this.state.employees} click={this.onDeleteItem} onEdit={this.onEditItem} />


          </Container>
        </div>

      </div>
    );
  }
}

export default withStyles(useStyles)(Task);