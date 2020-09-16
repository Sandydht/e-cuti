import React from 'react';
import logo from '../images/logo-prov-jateng.png';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

// Material icons
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

// Molecules
import AccountMenu from '../molecules/AccountMenu';

// Styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1
  }
}));

const Topbar = ({ onClick, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Avatar className={classes.avatar} src={logo} />
        <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>

        <Tooltip
          title='Notifikasi'
        >
          <IconButton
            color="inherit"
            aria-label="open account"
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>

        <AccountMenu {...rest} />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;