import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

// Organisms
import Logo from "../organisms/Logo";
import AccountMenu from "../organisms/AccountMenu";

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
  }
});

class Topbar extends Component {
  render() {
    const { classes, onClick, ...rest } = this.props;
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

          {/* Account menu */}
          <AccountMenu {...rest} />
          {/* End account menu */}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Topbar); 