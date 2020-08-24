import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from '@material-ui/core/IconButton';
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from "@material-ui/core/Tooltip";

// Firebase
import firebase from "../api/Firebase";

// React router dom
import { NavLink } from "react-router-dom";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
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
      anchorEl: null
    };
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

  getFotoUrl = (querySnapshot) => {
    let fotoUrl;
    querySnapshot.forEach(doc => fotoUrl = doc.data().fotoUrl);
    this.setState({
      fotoUrl
    });
  };

  UNSAFE_componentWillMount() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          this.unsubscribe = firebase
            .firestore()
            .collection("pns")
            .where("uid", "==", uid)
            .onSnapshot(this.getFotoUrl);
        }
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const { fotoUrl, anchorEl } = this.state;

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
          <MenuItem onClick={this.handleCloseMenu} component={NavLink} to="/profil" activeClassName={classes.activeLink} >Profil</MenuItem>
          <MenuItem onClick={this.handleCloseMenu}>Keluar</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}
export default withStyles(styles)(AccountMenu); 