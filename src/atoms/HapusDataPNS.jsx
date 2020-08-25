import React, { Component, Fragment } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

// Firebase 
import firebase from "../api/Firebase";

class HapusDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      open: false
    };

    this.ref = firebase.firestore().collection("pns");
    this.storage = firebase.storage().ref("fotoPNS");
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleDeleteData = () => {
    this.setState({
      isLoading: true
    });
  };

  render() {
    const { isLoading, open } = this.state;

    return (
      <Fragment>
        <Button
          startIcon={<DeleteIcon />}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={this.handleOpen}
        >
          Hapus</Button>

        <Dialog
          open={open}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Hapus Data PNS ?</DialogTitle>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleClose}
            >
              Batal
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDeleteData}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={25} /> : "Hapus"}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
export default HapusDataPNS; 