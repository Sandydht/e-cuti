import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

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

class DrawerList extends Component {
  render() {
    const { classes, onClick } = this.props;

    return (
      <Fragment>
        <Divider />
        <List>
          <ListItem button onClick={onClick} component={NavLink} to="/beranda" activeClassName={classes.activeLink}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Beranda" />
          </ListItem>
          <ListItem button onClick={onClick} component={NavLink} to="/pengaturan" activeClassName={classes.activeLink}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Pengaturan" />
          </ListItem>
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DrawerList); 