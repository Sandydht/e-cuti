import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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

class UserHome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle1">Layanan Pengajuan Cuti</Typography>
            <Divider />
          </Grid>
          {/* End title */}

          {/* Konten */}
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
          {/* End konten */}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(UserHome); 