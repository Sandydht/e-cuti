import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

// Atoms
import Logo from "../atoms/Logo";

// Molecules
import AccountMenu from "../molecules/AccountMenu";

// Styles
const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
});

class Topbar extends Component {

  render() {
    const { classes, onClick } = this.props;
    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Logo />

          <AccountMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Topbar); 