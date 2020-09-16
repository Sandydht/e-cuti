import React, { Component } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Material icons
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';

// Organisms
import Topbar from '../organisms/Topbar';
import Sidebar from '../organisms/Sidebar';
import Main from '../organisms/Main';

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes } = this.props;
    const { mobileOpen } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <Topbar onClick={this.handleDrawerToggle} />
        <Sidebar open={mobileOpen} onClose={this.handleDrawerToggle} drawer={drawer} />
        <Main />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
