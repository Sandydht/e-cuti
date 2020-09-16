import React from 'react';

// Material UI
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

// React router dom
import { NavLink } from 'react-router-dom';

// Styles
const useStyles = makeStyles((theme) => ({
  card: {
    height: theme.spacing(15)
  }
}));

const UserHome = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title='Layanan Pengajuan Cuti' />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cuti_tahunan'>
              <Card className={classes.card} style={{ backgroundColor: '#2196f3', color: '#ffff' }}>
                <CardHeader title='Cuti Tahunan' />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cuti_besar'>
              <Card className={classes.card} style={{ backgroundColor: '#e91e63', color: '#ffff' }}>
                <CardHeader title='Cuti Besar' />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cuti_sakit'>
              <Card className={classes.card} style={{ backgroundColor: '#4caf50', color: '#ffff' }}>
                <CardHeader title='Cuti Sakit' />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cuti_bersalin'>
              <Card className={classes.card} style={{ backgroundColor: '#ff9800', color: '#ffff' }}>
                <CardHeader title='Cuti Bersalin' />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cap'>
              <Card className={classes.card} style={{ backgroundColor: '#f44336', color: '#ffff' }}>
                <CardHeader title='Cuti Alasan Penting' />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardActionArea component={NavLink} to='/pengajuan_cltn'>
              <Card className={classes.card} style={{ backgroundColor: '#9c27b0', color: '#ffff' }}>
                <CardHeader title='CLTN' />
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserHome;
