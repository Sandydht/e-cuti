import React from 'react';
import logo from '../images/logo-prov-jateng.png';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Material icons
import CloseIcon from '@material-ui/icons/Close';

// Molecules
import DrawerList from '../molecules/DrawerList';

// Styles
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  closeButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
}));

const Sidebar = ({ window, open, onClose, drawer }) => {
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={onClose}
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
              aria-label="close drawer"
              edge="start"
              onClick={onClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <Avatar className={classes.avatar} src={logo} />
            <Typography variant="h6" noWrap>E-Cuti</Typography>
          </Toolbar>
          <Divider />
          <DrawerList onClick={onClose} />
        </Drawer>
      </Hidden>
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
          <DrawerList />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
