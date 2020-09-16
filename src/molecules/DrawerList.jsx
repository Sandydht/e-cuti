import React from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

// Redux
import { connect } from 'react-redux';

// React router dom
import { NavLink } from 'react-router-dom';

// Styles
const useStyles = makeStyles((theme) => ({
  activeLink: {
    backgroundColor: '#e0e0e0'
  }
}));

const DrawerList = ({ onClick, role }) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem button component={NavLink} to='/beranda' onClick={onClick} activeClassName={classes.activeLink}>
        <ListItemIcon><HomeIcon /> </ListItemIcon>
        <ListItemText primary='Beranda' />
      </ListItem>
      <ListItem button component={NavLink} to='/pengaturan' onClick={onClick} activeClassName={classes.activeLink}>
        <ListItemIcon><SettingsIcon /> </ListItemIcon>
        <ListItemText primary='Pengaturan' />
      </ListItem>
    </List>
  );
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(DrawerList);
