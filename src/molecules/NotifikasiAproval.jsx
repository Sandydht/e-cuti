import React, { Component, Fragment } from 'react';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Material icons
import NotificationsIcon from '@material-ui/icons/Notifications';

class NotifikasiAproval extends Component {
  render() {
    return (
      <Fragment>
        <Tooltip
          title='Notifikasi'
        >
          <IconButton
            color="inherit"
            aria-label="open account"
          >
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
      </Fragment>
    );
  }
}

export default NotifikasiAproval;
