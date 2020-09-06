import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React router dom
import { NavLink } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logout } from "../redux/actions";

// Notistack
import { withSnackbar } from "notistack";

// Styles
const styles = (theme) => ({
  activeLink: {
    backgroundColor: "#eeeeee"
  },
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openDialog: false
    };
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleOpenDialog = () => {
    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false
    });
  };

  handleLogout = () => {
    this.props.logout()
      .then(() => {
        this.props.enqueueSnackbar("Logout berhasil", { variant: "success", preventDuplicate: true });
        this.props.history.push("/");
      })
      .catch(() => this.props.enqueueSnackbar("Logout gagal", { variant: "error", preventDuplicate: true }));
  };

  render() {
    const { classes, match } = this.props;
    const { anchorEl, openDialog } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Tooltip title="Profil">
          <IconButton
            aria-controls="account"
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Menu
          open={open}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem component={NavLink} to={`${match.url}profil`} onClick={this.handleClose} activeClassName={classes.activeLink}>Profil</MenuItem>
          <MenuItem onClick={this.handleOpenDialog}>Keluar</MenuItem>
        </Menu>

        <Dialog
          open={openDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Keluar E-Cuti ?</DialogTitle>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleCloseDialog}
            >
              Batal
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleLogout}
            >
              Keluar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withSnackbar(Account)));
