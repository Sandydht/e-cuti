import React from 'react';

// React router dom
import { NavLink } from "react-router-dom";

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';

const DrawerList = ({ onClick }) => {
  return (
    <List>
      <ListItem button onClick={onClick} component={NavLink} to="/">
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItem>
      <ListItem button onClick={onClick} component={NavLink} to="/riwayat_cuti">
        <ListItemIcon><HistoryIcon /></ListItemIcon>
        <ListItemText primary="Riwayat Cuti" />
      </ListItem>
      <ListItem button onClick={onClick} component={NavLink} to="/informasi">
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText primary="Informasi" />
      </ListItem>
      <ListItem button onClick={onClick} component={NavLink} to="/pengaturan">
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Pengaturan" />
      </ListItem>
    </List>
  );
};
export default DrawerList;