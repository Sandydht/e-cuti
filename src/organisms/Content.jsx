import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// React router dom
import { Switch, Route, Redirect } from "react-router-dom";

// Styles
const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto"
  },
});

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            Breadcrumbs
          </Grid>
          <Grid item xs={12} md={12}>
            <Switch>

              {
                this.state.role === "admin" ? (
                  <Route
                    exact
                    path="/admin"
                    render={() => <div>Admin</div>}
                  />
                ) : (
                    <Route
                      exact
                      path="/user"
                      render={() => <div>User</div>}
                    />
                  )
              }

              {
                this.state.role === "admin" ? (
                  <Redirect
                    to="/admin"
                  />
                ) : (
                    <Redirect
                      to="/user"
                    />
                  )
              }

              <Route
                path="*"
                render={() => <div>Halaman tidak ditemukan</div>}
              />
            </Switch>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withStyles(styles)(Content); 