import React, { Component, Fragment } from 'react';
import logo from "../images/logo-prov-jateng.webp";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Styles
const styles = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
});

class AuthHeader extends Component {
  render() {
    const { classes, title } = this.props;

    return (
      <Fragment>
        <Avatar className={classes.avatar} src={logo} alt="logo-prov-jateng" />
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Fragment>
    );
  }
}
export default withStyles(styles)(AuthHeader); 