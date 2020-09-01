import React, { Component } from 'react';
import PropTypes from "prop-types";
import logo from "../images/logo-prov-jateng.png";

// React router dom
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';

// Pages
import Home from "./Home";
import Info from "./Info";
import Setting from "./Setting";

// Components
import DrawerList from "../components/DrawerList";

// Styles
const drawerWidth = 240;
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    padding: theme.spacing(3),
  },
  footer: {
    padding: theme.spacing(3, 2),
    textAlign: "center",
    marginTop: 'auto'
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class Dashboard extends Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes, window } = this.props;
    const { mobileOpen } = this.state;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
            <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>

            <Tooltip title="Notifikasi">
              <IconButton
                color="inherit"
              >
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Profil">
              <IconButton
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* Mobile drawer */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <CloseIcon />
                </IconButton>
                <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
                <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>
              </Toolbar>
              <Divider />
              <DrawerList onClick={this.handleDrawerToggle} />
            </Drawer>
          </Hidden>

          {/* Desktop drawer */}
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

        <div className={classes.content}>
          <main className={classes.main} >
            <div className={classes.toolbar} />
            <Switch>
              <Route
                path="/informasi"
                component={Info}
              />
              <Route
                path="/pengaturan"
                component={Setting}
              />
              <Route
                path="/beranda"
                component={Home}
              />
              <Redirect
                from="/"
                to="/beranda"
              />
            </Switch>
          </main>
          <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary">
              {'Copyright © E-Cuti '}
              {new Date().getFullYear()}
            </Typography>
          </footer>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  window: PropTypes.func
};

export default withStyles(styles)(Dashboard);