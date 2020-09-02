import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// React router dom
import { NavLink } from "react-router-dom";

// Styles
const styles = (theme) => ({
  card: {
    height: theme.spacing(15)
  }
});

class UserHome extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title="User Dashboard" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography>Layanan Pengajuan Cuti</Typography>
              <Divider />
            </Grid>
            <Grid item md={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_tahunan">
                    <Card className={classes.card} style={{ backgroundColor: "#2196f3", color: "#FFFF" }}>
                      <CardHeader title="Cuti Tahunan" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_besar">
                    <Card className={classes.card} style={{ backgroundColor: "#e91e63", color: "#FFFF" }}>
                      <CardHeader title="Cuti Besar" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_sakit">
                    <Card className={classes.card} style={{ backgroundColor: "#4caf50", color: "#FFFF" }} >
                      <CardHeader title="Cuti Sakit" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_bersalin">
                    <Card className={classes.card} style={{ backgroundColor: "#ff9800", color: "#FFFF" }} >
                      <CardHeader title="Cuti Bersalin" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cuti_alasan_penting">
                    <Card className={classes.card} style={{ backgroundColor: "#f44336", color: "#FFFF" }}>
                      <CardHeader title="Cuti Alasan Penting" />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardActionArea component={NavLink} to="/pengajuan_cltn">
                    <Card className={classes.card} style={{ backgroundColor: "#9c27b0", color: "#FFFF" }}>
                      <CardHeader title="CLTN" />
                    </Card>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(UserHome);
