import React, { Component, Fragment } from 'react';
import logo from "../images/logo-prov-jateng.webp";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';

// Styles
const styles = (theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  }
});

class Logo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Avatar className={classes.avatar} src={logo} alt="logo-prov-jateng" />
        <Typography variant="h6" noWrap className={classes.title}>E-Cuti</Typography>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Logo); 