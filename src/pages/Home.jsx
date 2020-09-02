import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

// Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// Styles
const styles = (theme) => ({
  card: {
    height: theme.spacing(15)
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "admin"
    };
  }

  render() {
    const { classes } = this.props;
    const { role } = this.state;
    const markup = role === "admin" ? (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Button color="primary" variant="contained" startIcon={<PersonAddIcon />}>Tambah Data PNS</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          Data table
        </Grid>
      </Grid>
    ) : (
        <Card>
          <CardHeader title="Layanan Pengajuan Cuti" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#2196f3", color: "#FFFF" }}>
                    <CardHeader title="Cuti Tahunan" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#e91e63", color: "#FFFF" }}>
                    <CardHeader title="Cuti Besar" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#4caf50", color: "#FFFF" }}>
                    <CardHeader title="Cuti Sakit" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#ff9800", color: "#FFFF" }}>
                    <CardHeader title="Cuti Bersalin" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#f44336", color: "#FFFF" }}>
                    <CardHeader title="Cuti Alasan Penting" />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardActionArea>
                  <Card className={classes.card} style={{ backgroundColor: "#9c27b0", color: "#FFFF" }}>
                    <CardHeader title="CLTN" />
                  </Card>
                </CardActionArea>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );

    return (
      <Fragment>
        {markup}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);
