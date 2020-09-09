import React, { Component } from 'react';
import Axios from "axios";

// Material UI
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Icons
import LockOpenIcon from '@material-ui/icons/LockOpen';

// Notistack
import { withSnackbar } from "notistack";

class SendEmailResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false
    };
  }

  handleSendEmailResetPassword = () => {
    this.setState({ buttonLoading: true });
    const { email, enqueueSnackbar } = this.props;
    Axios.post("/sendEmailResetPassword", { email })
      .then(() => {
        this.setState({
          buttonLoading: false
        });
        enqueueSnackbar("Email terkirim", { variant: "success", preventDuplicate: true });
      })
      .catch(() => {
        this.setState({
          buttonLoading: false
        });
        enqueueSnackbar("Email gagal terkirim", { variant: "error", preventDuplicate: true });
      });
  };

  render() {
    const { buttonLoading } = this.state;
    return (
      <Button
        color="default"
        variant="contained"
        startIcon={<LockOpenIcon />}
        fullWidth
        onClick={this.handleSendEmailResetPassword}
      >{buttonLoading ? <CircularProgress size={25} /> : "Kirim Email Reset Kata Sandi"}</Button>
    );
  }
}

export default withSnackbar(SendEmailResetPassword);
