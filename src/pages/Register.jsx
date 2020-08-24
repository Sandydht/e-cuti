import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

// React router dom
import { NavLink } from "react-router-dom";

// Organisms
import AuthHeader from "../organisms/AuthHeader";
import AuthFooter from "../organisms/AuthFooter";

// Molecules
import FormRegister from "../molecules/FormRegister";

// Styles
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
});

class Register extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <AuthHeader title="Registrasi Akun" />
          <FormRegister />
          <AuthFooter
            right={<Link variant="body2" component={NavLink} to="/login"> Silahkan masuk</Link>}
          />
        </div>
        <Box mt={8} mb={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            Copyright © E-Cuti {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Register); 