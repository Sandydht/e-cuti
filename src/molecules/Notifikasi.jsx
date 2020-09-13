import React, { Component, Fragment } from 'react';

// Material UI
import Badge from '@material-ui/core/Badge';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

class Notifikasi extends Component {
  render() {
    return (
      <Fragment>
        <Tooltip title="Notifikasi" >
          <IconButton
            aria-controls="notifikasi"
            aria-haspopup="true"
            color="inherit"
          >
            <Badge
              badgeContent={1}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Fragment>
    );
  }
}

export default Notifikasi;
