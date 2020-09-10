import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import DeleteIcon from '@material-ui/icons/Delete';

// Notistack
import { withSnackbar } from "notistack";

class HapusDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoading: false
    };
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

  handleDelete = () => {
    this.setState({ isLoading: true });
    Axios.delete(`/dataPNS/${this.props.id}`)
      .then(() => {
        this.props.history.replace("/data_pns");
        this.props.enqueueSnackbar("Data terhapus", { variant: "success", preventDuplicate: true });
      })
      .catch(() => {
        this.setState({ isLoading: false });
        this.props.enqueueSnackbar("Data gagal dihapus", { variant: "error", preventDuplicate: true });
      });
  };

  render() {
    const { open, isLoading } = this.state;

    return (
      <Fragment>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={this.handleOpen}
          disabled={this.props.disabled}
          fullWidth
        >Hapus</Button>

        <Dialog
          open={open}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Hapus Data PNS ?</DialogTitle>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleClose}
            >Batal</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleDelete}
              disabled={isLoading}
            >{isLoading ? <CircularProgress size={25} /> : "Hapus"}</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withSnackbar(HapusDataPNS);
