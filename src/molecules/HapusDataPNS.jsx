import React, { Component, Fragment } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// Material icons
import DeleteIcon from '@material-ui/icons/Delete';

// Firebase
import firebase from '../config/firebase';

// Notistack
import { withSnackbar } from 'notistack';

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
    return firebase
      .firestore()
      .collection('pns')
      .doc(this.props.match.params.pnsId)
      .delete()
      .then(() => {
        this.setState({ isLoading: false });
        this.props.enqueueSnackbar('Data terhapus', { variant: 'success', preventDuplicate: true, });
        this.props.history.replace('/data_pns');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
        this.props.enqueueSnackbar('Data gagal dihapus', { variant: 'error', preventDuplicate: true, });
      });
  };

  render() {
    const { open, isLoading } = this.state;

    return (
      <Fragment>
        <Button
          color='secondary'
          variant='contained'
          fullWidth
          startIcon={<DeleteIcon />}
          disabled={this.props.disabled}
          onClick={this.handleOpen}
        >Hapus</Button>

        <Dialog
          open={open}
          fullWidth
          maxWidth='xs'
          scroll='body'
        >
          <DialogTitle>Hapus Data PNS ?</DialogTitle>
          <DialogActions>
            <Button
              color='primary'
              variant='outlined'
              onClick={this.handleClose}
            >Batal</Button>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleDelete}
              disabled={isLoading}
            >{isLoading ? <CircularProgress size={25} /> : 'Hapus'}</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withSnackbar(HapusDataPNS);
