import React, { Component } from 'react';

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

// Icons
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import InfoIcon from '@material-ui/icons/Info';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      open: false
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open
    }));
  };

  render() {
    const { onClick, classes } = this.props;
    const { open } = this.state;
    return (
      <List>
        <ListItem button onClick={onClick} component={NavLink} to="/beranda" activeClassName={classes.activeLink}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Beranda" />
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <ListItemText primary="Riwayat Cuti" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="Cuti Tahunan" />
          </ListItem>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="Cuti Besar" />
          </ListItem>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="Cuti Sakit" />
          </ListItem>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="Cuti Bersalin" />
          </ListItem>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="Cuti Alasan Penting" />
          </ListItem>
          <ListItem button onClick={onClick} className={classes.nested}>
            <ListItemText primary="CLTN" />
          </ListItem>
        </Collapse>

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
  }
}

export default withStyles(styles)(DrawerList);
