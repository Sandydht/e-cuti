import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

// Redux
import { connect } from "react-redux";

// React router dom
import {
  NavLink
} from "react-router-dom";

// Styles
const styles = (theme) => ({
  card: {
    height: "150px"
  }
});

class Home extends Component {
  render() {
    const { role, classes } = this.props;

    return (
      <Card>
        <CardHeader
          title={
            <Fragment>
              {role === "admin" ? "Admin" : "User"} Dashboard
            </Fragment>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            {
              role === "admin" &&
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="subtitle1" >Data Pegawai</Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={12}>
                        <CardActionArea component={NavLink} to="/beranda/data_pns">
                          <Card className={classes.card} style={{ backgroundColor: "#9e9e9e", color: "white" }}>
                            <CardHeader title="Data PNS" />
                          </Card>
                        </CardActionArea>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            }

            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1">
                    {
                      role === "admin" ? "Data Pengajuan" : "Layanan Pengajuan Cuti"
                    }
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cuti_tahunan">
                        <Card className={classes.card} style={{ backgroundColor: "#2196f3", color: "white" }}>
                          <CardHeader title="Cuti Tahunan" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cuti_besar">
                        <Card className={classes.card} style={{ backgroundColor: "#e91e63", color: "white" }}>
                          <CardHeader title="Cuti Besar" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cuti_sakit">
                        <Card className={classes.card} style={{ backgroundColor: "#4caf50", color: "white" }}>
                          <CardHeader title="Cuti Sakit" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cuti_bersalin">
                        <Card className={classes.card} style={{ backgroundColor: "#ff9800", color: "white" }}>
                          <CardHeader title="Cuti Bersalin" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cuti_alasan_penting">
                        <Card className={classes.card} style={{ backgroundColor: "#f44336", color: "white" }}>
                          <CardHeader title="Cuti Alasan Penting" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <CardActionArea component={NavLink} to="/beranda/cltn">
                        <Card className={classes.card} style={{ backgroundColor: "#9c27b0", color: "white" }}>
                          <CardHeader title="CLTN" />
                        </Card>
                      </CardActionArea>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Home)); 