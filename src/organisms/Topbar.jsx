import React from 'react';
import logo from "../images/logo-prov-jateng.png";

// Material UI
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

// Styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Topbar = ({ onClick, children }) => {
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

        <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
        <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;