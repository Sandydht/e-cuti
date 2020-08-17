import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

// React router dom
import {
  NavLink
} from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logoutAPI } from "../api/Redux/actions";

// Styles
const styles = (theme) => ({
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class AccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openDialog: false
    };
  }

  handleOpenAccountMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleCloseAccountMenu = () => {
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
    const { history, logoutAPI } = this.props;

    logoutAPI()
      .then(() => {
        history.push("/");
      });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, openDialog } = this.state;

    return (
      <Fragment>
        <Dialog
          open={openDialog}
          onClose={this.handleCloseDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Keluar E-Cuti ?</DialogTitle>
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={this.handleCloseDialog}>Batal</Button>
            <Button color="primary" variant="contained" onClick={this.handleLogout}>Keluar</Button>
          </DialogActions>
        </Dialog>


        <Tooltip title="Profil">
          <IconButton
            color="inherit"
            aria-label="open account"
            onClick={this.handleOpenAccountMenu}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Menu
          id="open account"
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleCloseAccountMenu}
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={this.handleCloseAccountMenu} component={NavLink} to="/profil" activeClassName={classes.activeLink}>Profil</MenuItem>
          <MenuItem onClick={() => {
            this.handleCloseAccountMenu();
            this.handleOpenDialog();
          }}>Keluar</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutAPI: () => dispatch(logoutAPI())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AccountMenu)); 