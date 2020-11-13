import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SaveIcon from '@material-ui/icons/Save';



export default class EnployeeTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle_button_edit: false,
      text_field_active: true,
    }
    this.onToggleButtonEdit.bind(this.onToggleButtonEdit);
  }

  onToggleButtonEdit = () => {
    this.setState({ toggle_button_edit: !this.state.toggle_button_edit, text_field_active: !this.state.text_field_active })
  }
  render() {
    const RenderTextField = (props) => {
      return (
        <TextField id="filled-basic"

          label=""
          name="employee"
          variant="standard"
          value={props.item}
          autoFocus
        />
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table style={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee Id</TableCell>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.employees_list.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">{item.employeeId} </TableCell>
                <TableCell align="center"> {this.state.text_field_active ? item.employeeName : <RenderTextField item={item.employeeName} />}   </TableCell>
                <TableCell align="center">
                  <IconButton onClick={this.onToggleButtonEdit}>
                    {this.state.toggle_button_edit ? <SaveIcon /> : <EditIcon />}

                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => this.props.click(item.employeeId)}> <DeleteOutlineIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
