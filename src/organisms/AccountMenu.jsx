import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// React router dom
import {
  NavLink
} from "react-router-dom";

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
      anchorEl: null
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

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <IconButton
          color="inherit"
          aria-label="open account"
          onClick={this.handleOpenAccountMenu}
        >
          <AccountCircleIcon />
        </IconButton>

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
          <MenuItem onClick={this.handleCloseAccountMenu}>Keluar</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}
export default withStyles(styles)(AccountMenu); 