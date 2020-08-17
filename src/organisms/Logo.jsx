import React, { Component, Fragment } from 'react';
import logo from "../images/logo-prov-jateng.webp";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";

// Styles
const styles = (theme) => ({
  logo: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
});

class Logo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Avatar alt="logo-prov-jateng" src={logo} className={classes.logo} />
        <Typography variant="h6" noWrap className={classes.title}>
          E-Cuti
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(Logo); 