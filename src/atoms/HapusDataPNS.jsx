import React, { Component, Fragment } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

// Notistack
import { withSnackbar } from "notistack";

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
    const { id, history, enqueueSnackbar } = this.props;

    this.setState({
      isLoading: true
    });

    this.ref
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const fotoUrl = doc.data().fotoUrl;
          if (doc.data().fotoUrl) {
            this.ref
              .doc(id)
              .delete()
              .then(() => {
                this.storage
                  .child(id)
                  .delete()
                  .then(() => {
                    this.setState({
                      isLoading: false
                    });
                    enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
                    history.replace("/data_pns");
                  });
              })
              .catch(() => {
                this.setState({
                  buttonLoading: false
                });
                enqueueSnackbar("Data gagal dihapus", { variant: "error" });
              });

          } else {
            this.ref
              .doc(id)
              .delete()
              .then(() => {
                enqueueSnackbar("Data berhasil dihapus", { variant: "success" });
                history.replace("/data_pns");
              })
              .catch(() => {
                this.setState({
                  buttonLoading: false
                });
                enqueueSnackbar("Data gagal dihapus", { variant: "error" });
              });
          }
        }
      });
  };

  render() {
    const { disabled } = this.props;
    const { isLoading, open } = this.state;

    return (
      <Fragment>
        <Button
          startIcon={<DeleteIcon />}
          color="secondary"
          variant="contained"
          fullWidth
          onClick={this.handleOpen}
          disabled={disabled}
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
export default withSnackbar(HapusDataPNS); 