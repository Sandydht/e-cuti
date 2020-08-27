import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardActionArea from "@material-ui/core/CardActionArea";

// Redux
import { connect } from "react-redux";

// React router dom
import { NavLink } from "react-router-dom";

// Styles
const styles = (theme) => ({
  card: {
    height: theme.spacing(15)
  }
});

class Home extends Component {
  render() {
    const { classes, role } = this.props;
    return (
      role === "admin" ? (
        <div>Admin Home</div>
      ) : (
          <Card>
            <CardHeader title="Layanan Pengajuan Cuti" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_tahunan">
                    <Card className={classes.card} style={{ backgroundColor: "#2196f3", color: "#FFFF" }}>
                      <CardHeader title="Cuti Tahunan" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_besar">
                    <Card className={classes.card} style={{ backgroundColor: "#e91e63", color: "#FFFF" }}>
                      <CardHeader title="Cuti Besar" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_sakit">
                    <Card className={classes.card} style={{ backgroundColor: "#4caf50", color: "#FFFF" }}>
                      <CardHeader title="Cuti Sakit" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_bersalin">
                    <Card className={classes.card} style={{ backgroundColor: "#ff9800", color: "#FFFF" }}>
                      <CardHeader title="Cuti Bersalin" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_alasan_penting">
                    <Card className={classes.card} style={{ backgroundColor: "#f44336", color: "#FFFF" }}>
                      <CardHeader title="Cuti Alasan Penting" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item md={4} xs={12}>
                  <CardActionArea component={NavLink} to="/pengajuan_cltn">
                    <Card className={classes.card} style={{ backgroundColor: "#9c27b0", color: "#FFFF" }}>
                      <CardHeader title="CLTN" />
                    </Card>
                  </CardActionArea>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
    );
  }
}
const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Home)); 