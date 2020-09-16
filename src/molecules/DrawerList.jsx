import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';

// Material icons
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import HistoryIcon from '@material-ui/icons/History';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Redux
import { connect } from 'react-redux';

// React router dom
import { NavLink } from 'react-router-dom';

// Styles
const styles = (theme) => ({
  activeLink: {
    backgroundColor: '#e0e0e0'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class DrawerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRiwayatCuti: false
    };
  }

  handleClickRiwayatCuti = () => {
    this.setState((state) => ({
      openRiwayatCuti: !state.openRiwayatCuti
    }));
  };

  render() {
    const { classes, onClick, role } = this.props;
    const { openRiwayatCuti } = this.state;

    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {
              role === 'admin' ? 'Admin Menu' : 'User Menu'
            }
          </ListSubheader>
        }
      >
        <ListItem button component={NavLink} to='/beranda' onClick={onClick} activeClassName={classes.activeLink}>
          <ListItemIcon><HomeIcon /> </ListItemIcon>
          <ListItemText primary='Beranda' />
        </ListItem>
        {
          role === 'admin' ? (
            <div>Admin menu</div>
          ) : (
              <Fragment>
                <ListItem button onClick={this.handleClickRiwayatCuti}>
                  <ListItemIcon><HistoryIcon /> </ListItemIcon>
                  <ListItemText primary='Riwayat Cuti' />
                  {openRiwayatCuti ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={openRiwayatCuti} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cuti_tahunan' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Tahunan" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cuti_besar' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Besar" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cuti_sakit' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Sakit" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cuti_bersalin' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Bersalin" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cap' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="Cuti Alasan Penting" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={NavLink} to='/riwayat_cltn' onClick={onClick} activeClassName={classes.activeLink}>
                      <ListItemText primary="CLTN" />
                    </ListItem>
                  </List>
                </Collapse>
              </Fragment>
            )
        }
        <ListItem button component={NavLink} to='/pengaturan' onClick={onClick} activeClassName={classes.activeLink}>
          <ListItemIcon><SettingsIcon /> </ListItemIcon>
          <ListItemText primary='Pengaturan' />
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(withStyles(styles)(DrawerList));
