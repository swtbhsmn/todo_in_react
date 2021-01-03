import React from "react";
import { TextField, Button, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TaskTable from "./task_data";
import ModalTask from './modal';
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      employees: [],
      task_completed: [],
      openModal: false
    }

    this.onChangeHandler.bind(this.onChangeHandler);
    this.onEmployeeAdd.bind(this.onEmployeeAdd);
    this.onDeleteItem.bind(this.onDeleteItem);
    this.onEditItem.bind(this.onEditItem);

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
    completedTask.push(employees[key]);
    let updateList = employees.filter(item => item.employeeId !== key);

    this.setState({
      employees: updateList,
      task_completed: completedTask
    });


  }

  onEditItem = (id, value) => {

    const employees = [...this.state.employees];

    const update_index = employees.findIndex(item => item.employeeId === id);
    employees[update_index].employeeName = value;
    this.setState({ employees: employees })
  }

  render() {
    return (
      <div >
        <ModalTask open={this.state.openModal} />
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

export default Task;