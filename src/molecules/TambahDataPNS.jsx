import React, { Component, Fragment } from 'react';

// Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// Atoms
import FormTambahDataPNS from "../atoms/FormTambahDataPNS";

class TambahDataPNS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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

  render() {
    const { open } = this.state;

    return (
      <Fragment>
        <Button startIcon={<PersonAddIcon />} color="primary" variant="contained" onClick={this.handleOpen}>Tambah Data PNS</Button>

        <Dialog
          open={open}
          fullWidth
          maxWidth="xs"
          scroll="body"
        >
          <DialogTitle>Tambah Data PNS</DialogTitle>
          <DialogContent>
            <FormTambahDataPNS onClick={this.handleClose} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default TambahDataPNS;