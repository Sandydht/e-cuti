import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// Material icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React router dom
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../config/redux/actions';

// Styles
const styles = (theme) => ({
  activeLink: {
    backgroundColor: '#e0e0e0'
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

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = (event) => {
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
      .then(() => this.props.history.push('/'));
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, openDialog } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Tooltip
          title='Profil'
        >
          <IconButton
            color="inherit"
            aria-label="open account"
            onClick={this.handleOpen}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Menu
          open={open}
          onClose={this.handleClose}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={this.handleClose} component={NavLink} to='/profil' activeClassName={classes.activeLink}>Profil</MenuItem>
          <MenuItem onClick={() => {
            this.handleClose();
            this.handleOpenDialog();
          }}>Keluar</MenuItem>
        </Menu>

        <Dialog
          open={openDialog}
          fullWidth
          maxWidth='xs'
        >
          <DialogTitle>Keluar E-Cuti ?</DialogTitle>
          <DialogActions>
            <Button
              color='primary'
              variant='outlined'
              onClick={this.handleCloseDialog}
            >Batal</Button>
            <Button
              color='primary'
              variant='contained'
              onClick={this.handleLogout}
            >Keluar</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AccountMenu));
