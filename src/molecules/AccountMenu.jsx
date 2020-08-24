import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// Firebase
import firebase from "../api/Firebase";

// Redux
import { connect } from "react-redux";
import { logoutAPI } from "../api/Redux/actions";

// React router dom
import { NavLink } from "react-router-dom";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class AccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotoUrl: "",
      anchorEl: null,
      open: false
    };

    this.auth = firebase.auth();
    this.ref = firebase.firestore().collection("pns");
  }

  handleOpenMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  };

  handleOpenDialog = () => {
    this.setState({
      open: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      open: false
    });
  };

  getFotoUrl = (querySnapshot) => {
    let fotoUrl;
    querySnapshot.forEach(doc => fotoUrl = doc.data().fotoUrl);
    this.setState({
      fotoUrl
    });
  };

  UNSAFE_componentWillMount() {
    this.unsubscribe = this.auth
      .onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          this.ref
            .where("uid", "==", uid)
            .onSnapshot(this.getFotoUrl);
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleLogout = () => {
    const { logoutAPI, history } = this.props;
    logoutAPI()
      .then(() => {
        history.push("/");
      });
  };

  render() {
    const { classes } = this.props;
    const { fotoUrl, anchorEl, open } = this.state;

    return (
      <Fragment>
        <Tooltip title="Profil">
          <IconButton
            size="small"
            onClick={this.handleOpenMenu}
            color="inherit"
          >
            <Avatar className={classes.avatar} src={fotoUrl} />
          </IconButton>
        </Tooltip>

        <Menu
          open={Boolean(anchorEl)}
          keepMounted
          onClose={this.handleCloseMenu}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={this.handleCloseMenu} component={NavLink} to="/profil" activeClassName={classes.activeLink}>Profil</MenuItem>
          <MenuItem onClick={() => {
            this.handleOpenDialog();
            this.handleCloseMenu();
          }}>Keluar</MenuItem>
        </Menu>


        <Dialog
          open={open}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Keluar E-Cuti ?</DialogTitle>
          <DialogActions>
            <Button color="primary" variant="outlined" onClick={this.handleCloseDialog}>Batal</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleLogout}
            >Keluar</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutAPI: () => dispatch(logoutAPI())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AccountMenu)); 