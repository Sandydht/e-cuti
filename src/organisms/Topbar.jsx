import React from 'react';
import logo from '../images/logo-prov-jateng.png';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Material icons
import MenuIcon from '@material-ui/icons/Menu';

// Molecules
import AccountMenu from '../molecules/AccountMenu';
import NotifikasiAproval from '../molecules/NotifikasiAproval';
import NotifikasiPengajuan from '../molecules/NotifikasiPengajuan';

// Redux
import { connect } from 'react-redux';

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

const Topbar = ({ onClick, role, ...rest }) => {
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

        {
          role === 'admin' ? <NotifikasiPengajuan /> : <NotifikasiAproval />
        }
        <AccountMenu {...rest} />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps)(Topbar);