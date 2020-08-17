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

class AdminHome extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle1">Kelola Data</Typography>
            <Divider />
          </Grid>
          {/* End title */}

          {/* Konten */}
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <CardActionArea component={NavLink} to="/beranda/data_pns">
                  <Card className={classes.card} style={{ backgroundColor: "#212121", color: "white" }}>
                    <CardHeader title="Data PNS" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item md={6} xs={12}>
                <CardActionArea component={NavLink} to="/beranda/data_cuti">
                  <Card className={classes.card} style={{ backgroundColor: "#9e9e9e", color: "white" }}>
                    <CardHeader title="Data Cuti" />
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
export default withStyles(styles)(AdminHome);  