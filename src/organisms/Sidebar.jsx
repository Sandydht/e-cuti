import React, { Component, Fragment } from 'react';
import logo from "../images/logo-prov-jateng.png";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';

// React router dom
import {
  NavLink
} from "react-router-dom";

// Styles
const drawerWidth = 240;
const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  closeButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRiwayatCuti: false,
      openDataCuti: false
    };
  }

  handleOpenRiwayatCuti = () => {
    this.setState((state) => ({
      openRiwayatCuti: !state.openRiwayatCuti
    }));
  };

  handleOpenDataCuti = () => {
    this.setState((state) => ({
      openDataCuti: !state.openDataCuti
    }));
  };

  render() {
    const { onClick, window, classes, mobileOpen, match, role } = this.props;
    const { openRiwayatCuti, openDataCuti } = this.state;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <aside className={classes.drawer} aria-label="mailbox folders">
        {/* Mobile drawer */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={onClick}
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
                onClick={onClick}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
              <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
              <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>
            </Toolbar>
            <Divider />
            <List
              aria-labelledby="list"
              subheader={
                <ListSubheader component="div" id="list">
                  {role === "admin" ? "Admin Menu" : "User Menu"}
                </ListSubheader>
              }
            >
              <ListItem button onClick={onClick} component={NavLink} to={`${match.url}beranda`} activeClassName={classes.activeLink}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Beranda" />
              </ListItem>

              {
                role === "admin" ? (
                  <Fragment>
                    <ListItem button onClick={onClick} component={NavLink} to={`${match.url}data_pns`} activeClassName={classes.activeLink}>
                      <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                      <ListItemText primary="Data PNS" />
                    </ListItem>
                    <ListItem button onClick={this.handleOpenDataCuti}>
                      <ListItemIcon><AssignmentIcon /></ListItemIcon>
                      <ListItemText primary="Data Cuti" />
                      {openDataCuti ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={openDataCuti} timeout="auto" unmountOnExit>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_tahunan`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Tahunan" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_besar`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Besar" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_sakit`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Sakit" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_bersalin`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Bersalin" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_alasan_penting`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Alasan Penting" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cltn`} activeClassName={classes.activeLink}>
                        <ListItemText primary="CLTN" />
                      </ListItem>
                    </Collapse>
                  </Fragment>
                ) : (
                    <Fragment>
                      <ListItem button onClick={this.handleOpenRiwayatCuti}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="Riwayat Cuti" />
                        {openRiwayatCuti ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openRiwayatCuti} timeout="auto" unmountOnExit>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_tahunan`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Tahunan" />
                        </ListItem>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_besar`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Besar" />
                        </ListItem>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_sakit`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Sakit" />
                        </ListItem>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_bersalin`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Bersalin" />
                        </ListItem>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_alasan_penting`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Alasan Penting" />
                        </ListItem>
                        <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to={`${match.url}riwayat_cltn`} activeClassName={classes.activeLink}>
                          <ListItemText primary="CLTN" />
                        </ListItem>
                      </Collapse>
                    </Fragment>
                  )
              }

              <ListItem button onClick={onClick} component={NavLink} to={`${match.url}pengaturan`} activeClassName={classes.activeLink}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Pengaturan" />
              </ListItem>
            </List>
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
            <List
              aria-labelledby="list"
              subheader={
                <ListSubheader component="div" id="list">
                  {role === "admin" ? "Admin Menu" : "User Menu"}
                </ListSubheader>
              }
            >
              <ListItem button component={NavLink} to={`${match.url}beranda`} activeClassName={classes.activeLink}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Beranda" />
              </ListItem>

              {
                role === "admin" ? (
                  <Fragment>
                    <ListItem button component={NavLink} to={`${match.url}data_pns`} activeClassName={classes.activeLink}>
                      <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                      <ListItemText primary="Data PNS" />
                    </ListItem>
                    <ListItem button onClick={this.handleOpenDataCuti}>
                      <ListItemIcon><AssignmentIcon /></ListItemIcon>
                      <ListItemText primary="Data Cuti" />
                      {openDataCuti ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={openDataCuti} timeout="auto" unmountOnExit>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_tahunan`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Tahunan" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_besar`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Besar" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_sakit`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Sakit" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_bersalin`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Bersalin" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cuti_alasan_penting`} activeClassName={classes.activeLink}>
                        <ListItemText primary="Cuti Alasan Penting" />
                      </ListItem>
                      <ListItem button className={classes.nested} component={NavLink} to={`${match.url}data_cltn`} activeClassName={classes.activeLink}>
                        <ListItemText primary="CLTN" />
                      </ListItem>
                    </Collapse>
                  </Fragment>
                ) : (
                    <Fragment>
                      <ListItem button onClick={this.handleOpenRiwayatCuti}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <ListItemText primary="Riwayat Cuti" />
                        {openRiwayatCuti ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openRiwayatCuti} timeout="auto" unmountOnExit>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_tahunan`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Tahunan" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_besar`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Besar" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_sakit`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Sakit" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_bersalin`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Bersalin" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cuti_alasan_penting`} activeClassName={classes.activeLink}>
                          <ListItemText primary="Cuti Alasan Penting" />
                        </ListItem>
                        <ListItem button className={classes.nested} component={NavLink} to={`${match.url}riwayat_cltn`} activeClassName={classes.activeLink}>
                          <ListItemText primary="CLTN" />
                        </ListItem>
                      </Collapse>
                    </Fragment>
                  )
              }

              <ListItem button component={NavLink} to={`${match.url}pengaturan`} activeClassName={classes.activeLink}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Pengaturan" />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </aside>
    );
  }
}

export default withStyles(styles)(Sidebar);