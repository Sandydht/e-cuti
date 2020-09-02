import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React router dom
import { NavLink } from "react-router-dom";

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
      anchorEl: null
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

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
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
          <MenuItem component={NavLink} to="/profil" onClick={this.handleClose} activeClassName={classes.activeLink}>Profil</MenuItem>
          <MenuItem>Keluar</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Account);
