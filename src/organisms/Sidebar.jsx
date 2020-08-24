import React, { Component } from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

// Atoms
import Logo from "../atoms/Logo";

// Molecules
import DrawerList from "../molecules/DrawerList";

// Styles
const drawerWidth = 240;
const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  closeButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  }
});

class Sidebar extends Component {
  render() {
    const { window, classes, open, onClose } = this.props;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={open}
            onClose={onClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
              <Logo />
            </Toolbar>
            <Divider />
            <DrawerList onClick={onClose} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Divider />
            <DrawerList />
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}
export default withStyles(styles)(Sidebar); 