import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// React router dom
import { Switch, Route, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Molecules
import BreadCrumbs from "../molecules/BreadCrumbs";

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
  render() {
    const { classes, role } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <BreadCrumbs />
          </Grid>
          <Grid item xs={12} md={12}>
            <Switch>
              <Route
                path="/pengaturan"
                render={() => <div>Pengaturan</div>}
              />
              <Route
                path="/data_cuti/cltn"
                render={() => <div>CLTN</div>}
              />
              <Route
                path="/data_cuti/cuti_alasan_penting"
                render={() => <div>Cuti Alasan Penting</div>}
              />
              <Route
                path="/data_cuti/cuti_bersalin"
                render={() => <div>Cuti Bersalin</div>}
              />
              <Route
                path="/data_cuti/cuti_sakit"
                render={() => <div>Cuti Sakit</div>}
              />
              <Route
                path="/data_cuti/cuti_besar"
                render={() => <div>Cuti Besar</div>}
              />

              <Route
                path="/data_cuti/cuti_tahunan"
                render={() => <div>Cuti Tahunan</div>}
              />

              {
                role === "admin" ? (
                  <Switch>
                    <Route
                      path="/data_pns"
                      render={() => <div>Data PNS</div>}
                    />

                    <Redirect
                      from="/"
                      to="/data_pns"
                    />
                  </Switch>
                ) : (
                    <Switch>
                      <Route
                        path="/beranda"
                        render={() => <div>Beranda</div>}
                      />

                      <Redirect
                        from="/"
                        to="/beranda"
                      />
                    </Switch>
                  )
              }
            </Switch>
          </Grid>
        </Grid>
      </main>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Content)); 