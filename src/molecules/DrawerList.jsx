import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from "@material-ui/core/Collapse";
import AssignmentIcon from '@material-ui/icons/Assignment';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

// Redux
import { connect } from "react-redux";

// React router dom
import { NavLink } from "react-router-dom";


// Styles
const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class DrawerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState((state) => ({
      open: !state.open
    }));
  };

  render() {
    const { onClick, role, classes } = this.props;
    const { open } = this.state;

    return (
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">{role === "admin" ? "Admin Menu" : "User Menu"}</ListSubheader>
        }
      >
        <ListItem button onClick={onClick} component={NavLink} to="/beranda" activeClassName={classes.activeLink} >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Beranda" />
        </ListItem>
        {
          role === "admin" ? (
            <Fragment>
              <ListItem button onClick={onClick} component={NavLink} to="/data_pns" activeClassName={classes.activeLink} >
                <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                <ListItemText primary="Data PNS" />
              </ListItem>
              <ListItem button onClick={onClick} component={NavLink} to="/data_cuti" activeClassName={classes.activeLink} >
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Data Cuti" />
              </ListItem>
            </Fragment>
          ) : (
              <Fragment>
                <ListItem button onClick={this.handleOpen}>
                  <ListItemIcon><HistoryIcon /></ListItemIcon>
                  <ListItemText primary="Riwayat Cuti" />
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti_tahunan" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Tahunan" />
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti_besar" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Besar" />
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti_sakit" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Sakit" />
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti_bersalin" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Bersalin" />
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti_alasan_penting" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Alasan Penting" />
                    </ListItem>
                  </List>
                  <List component="div" disablePadding>
                    <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cltn" className={classes.nested} activeClassName={classes.activeLink}>
                      <ListItemText primary="CLTN" />
                    </ListItem>
                  </List>
                </Collapse>
              </Fragment>
            )
        }
        <ListItem button onClick={onClick} component={NavLink} to="/pengaturan" activeClassName={classes.activeLink} >
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Pengaturan" />
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(DrawerList)); 