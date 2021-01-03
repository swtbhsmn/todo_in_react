import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core'



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

class TaskModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };
 
   
    render() {
        const { classes } = this.props;




        const body = (
            <div className={classes.paper}>
                <h2 id="simple-modal-title">TaskBar</h2>
                <p id="simple-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

            </div>
        );
       if(this.props.open===true){
        return (
            <div>
                <Button onClick={this.handleOpen}>Open</Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="modal-body"
                >
                    {body}
                </Modal>
            </div>
        );
       }
       else{
           return <div style={{display:"none"}}></div>
       }


    }






}

export default withStyles(useStyles)(TaskModal);