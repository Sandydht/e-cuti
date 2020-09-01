import React from 'react';

// React router dom
import {
  NavLink
} from "react-router-dom";

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';

// Styles
const useStyles = makeStyles({
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

const DrawerList = ({ onClick }) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem button onClick={onClick} component={NavLink} to="/beranda" activeClassName={classes.activeLink}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItem>
      <ListItem button onClick={onClick}>
        <ListItemIcon><HistoryIcon /></ListItemIcon>
        <ListItemText primary="Riwayat Cuti" />
      </ListItem>
      <ListItem button onClick={onClick} component={NavLink} to="/informasi" activeClassName={classes.activeLink}>
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText primary="Informasi" />
      </ListItem>
      <ListItem button onClick={onClick} component={NavLink} to="/pengaturan" activeClassName={classes.activeLink}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Pengaturan" />
      </ListItem>
    </List>
  );
};
export default DrawerList;