import React, { Component, Fragment } from 'react';

// React router dom
import {
  NavLink
} from "react-router-dom";

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListSubheader from '@material-ui/core/ListSubheader';

// Icons
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';

// Styles
const styles = (theme) => ({
  activeLink: {
    backgroundColor: "#eeeeee"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class DrawerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      role: "user"
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open
    }));
  };

  render() {
    const { onClick, classes } = this.props;
    const { open, role } = this.state;
    return (
      <List
        aria-labelledby="list"
        subheader={
          <ListSubheader component="div" id="list">
            {role === "admin" ? "Admin Menu" : "User Menu"}
          </ListSubheader>
        }
      >
        <ListItem button onClick={onClick} component={NavLink} to="/beranda" activeClassName={classes.activeLink}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Beranda" />
        </ListItem>

        {
          role === "admin" ? (
            <Fragment>
              <ListItem button onClick={onClick} component={NavLink} to="/data_pns" activeClassName={classes.activeLink}>
                <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                <ListItemText primary="Data PNS" />
              </ListItem>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="Data Cuti" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cuti_tahunan" activeClassName={classes.activeLink}>
                  <ListItemText primary="Cuti Tahunan" />
                </ListItem>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cuti_besar" activeClassName={classes.activeLink}>
                  <ListItemText primary="Cuti Besar" />
                </ListItem>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cuti_sakit" activeClassName={classes.activeLink}>
                  <ListItemText primary="Cuti Sakit" />
                </ListItem>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cuti_bersalin" activeClassName={classes.activeLink}>
                  <ListItemText primary="Cuti Bersalin" />
                </ListItem>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cuti_alasan_penting" activeClassName={classes.activeLink}>
                  <ListItemText primary="Cuti Alasan Penting" />
                </ListItem>
                <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/data_cltn" activeClassName={classes.activeLink}>
                  <ListItemText primary="CLTN" />
                </ListItem>
              </Collapse>
            </Fragment>
          ) : (
              <Fragment>
                <ListItem button onClick={this.handleClick}>
                  <ListItemIcon><HistoryIcon /></ListItemIcon>
                  <ListItemText primary="Riwayat Cuti" />
                  {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cuti_tahunan" activeClassName={classes.activeLink}>
                    <ListItemText primary="Cuti Tahunan" />
                  </ListItem>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cuti_besar" activeClassName={classes.activeLink}>
                    <ListItemText primary="Cuti Besar" />
                  </ListItem>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cuti_sakit" activeClassName={classes.activeLink}>
                    <ListItemText primary="Cuti Sakit" />
                  </ListItem>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cuti_bersalin" activeClassName={classes.activeLink}>
                    <ListItemText primary="Cuti Bersalin" />
                  </ListItem>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cuti_alasan_penting" activeClassName={classes.activeLink}>
                    <ListItemText primary="Cuti Alasan Penting" />
                  </ListItem>
                  <ListItem button onClick={onClick} className={classes.nested} component={NavLink} to="/riwayat_cltn" activeClassName={classes.activeLink}>
                    <ListItemText primary="CLTN" />
                  </ListItem>
                </Collapse>
              </Fragment>
            )
        }

        <ListItem button onClick={onClick} component={NavLink} to="/pengaturan" activeClassName={classes.activeLink}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Pengaturan" />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(DrawerList);