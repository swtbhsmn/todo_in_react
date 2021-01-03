import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, IconButton, TextField, Modal, Button,FormControlLabel } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = (theme) => ({
  paper: {
    position: 'absolute',
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  }
});

class TaskTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: props.employees_list,
      edit_modal: false,
      edit_name: "",
      employee_id: ""
    }

    this.onToggleButtonEdit.bind(this.onToggleButtonEdit);
    this.onSaveButton.bind(this.onSaveButton);
    this.onChangeHandler.bind(this.onChangeHandler);
    this.onCloseModal.bind(this.onCloseModal);
  }

  onToggleButtonEdit = (id, name) => {
    this.setState({ edit_modal: true, edit_name: name, employee_id: id });
  }

  onCloseModal = () => {
    this.setState({ edit_modal: false })
  }
  onSaveButton = () => {
    this.props.onEdit(this.state.employee_id, this.state.edit_name);
    this.setState({ edit_modal: false });
  }

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { classes } = this.props;
    const EditModal = (props) => {
      return (

        <Modal
          open={this.state.edit_modal}
          className="modal-center"
          onClose={this.onCloseModal}
        >
          <div className={classes.paper}>
            <TextField
              label="Edit Employee Name"
              name="edit_name"
              value={this.state.edit_name}
              onChange={this.onChangeHandler}
              autoComplete="off" 
              spellCheck="false" 
              autoFocus
            />
            <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={this.onSaveButton}
            >
              Save
           </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<CloseIcon />}
              onClick={this.onCloseModal}
            >
              Cancle
      </Button>
            </div>
            
          </div>


        </Modal>
      )
    }

    if(this.props.employees_list.length===0){
      return(
       <>
         <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Your Task Is Empty Please Add It.</TableCell>
                
  
                </TableRow>
              </TableHead>
              </Table>
              </TableContainer>
       </>
      )
    }
    else{
      return (
        <>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Task Id</TableCell>
                  <TableCell align="center">Task Name</TableCell>
                  <TableCell align="center">Task Edit</TableCell>
                  <TableCell align="center">Task Delete</TableCell>
                  <TableCell align="center">Mark as Complete</TableCell>
                </TableRow>
              </TableHead>
  
           
              <TableBody >
                {this.props.employees_list.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell align="center">{item.employeeId} </TableCell>
                    <TableCell align="center">
  
                      {item.employeeName}
  
                    </TableCell>
                    <TableCell align="center">
  
                      <IconButton onClick={() => this.onToggleButtonEdit(item.employeeId, item.employeeName)}>
  
                        <EditIcon />
  
                      </IconButton>
  
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => this.props.click(item.employeeId)}> <DeleteOutlineIcon /></IconButton>
                    </TableCell>
                    <TableCell align="center">
                    <FormControlLabel
                            control={<Checkbox color="primary" />}
                            onClick={() => this.props.clickMark(1,item.employeeId)}
                        />
                        </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div >
            <EditModal />
          </div>
  
        </>
      );
    }
  
  }
}
export default withStyles(useStyles)(TaskTable)