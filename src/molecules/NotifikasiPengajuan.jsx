import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Badge from '@material-ui/core/Badge';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// React router dom
import { NavLink } from "react-router-dom";

class NotifikasiPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      data: [],
      isLoading: true
    };

    this.__subscribe = false;
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  notifikasiPengajuan = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/getNotifikasiPengajuan")
      .then((res) => {
        if (this.__subscribe) {
          this.notifikasiPengajuan(res.data);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { anchorEl, data } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Tooltip title="Notifikasi">
          <IconButton
            aria-controls="notifikasi"
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleOpen}
          >
            <Badge badgeContent={data.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          open={open}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {
            data.map((value, index) => (
              <Fragment>
                <MenuItem
                  onClick={this.handleClose}
                  key={index}
                  component={NavLink}
                  to={`/beranda/${value.cutiId}`}
                >
                  {value.cutiId}
                </MenuItem>
                <Divider />
              </Fragment>
            ))
          }
        </Menu>
      </Fragment>
    );
  }
}

export default NotifikasiPengajuan;