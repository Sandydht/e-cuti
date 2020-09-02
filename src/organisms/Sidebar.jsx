import React from 'react';
import logo from "../images/logo-prov-jateng.png";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Molecules
import DrawerList from "../molecules/DrawerList";

// Styles
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  closeButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
}));

const Sidebar = ({ onClick, open, window }) => {
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <aside className={classes.drawer} aria-label="mailbox folders">
      {/* Mobile drawer */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={onClick}
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
              aria-label="open drawer"
              edge="start"
              onClick={onClick}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
            <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>
          </Toolbar>
          <Divider />
          <DrawerList onClick={onClick} />
        </Drawer>
      </Hidden>

      {/* Desktop drawer */}
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
    </aside>
  );
};

export default Sidebar;
