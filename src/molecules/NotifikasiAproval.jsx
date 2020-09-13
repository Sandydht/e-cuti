import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Badge from '@material-ui/core/Badge';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

class NotifikasiAproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      isLoading: true,
      data: []
    };

    this.__subscribe = false;
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      isLoading: true
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  openNotifikasi = () => {
    this.__subscribe = true;
    const notifikasiId = this.state.data.filter(data => !data.open).map(data => data.notifikasiId);
    Axios.post('/openNotifikasi', notifikasiId);
    Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.dataNotifikasi(res.data.notifikasi);
        }
      });
  };

  dataNotifikasi = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.dataNotifikasi(res.data.notifikasi);
        }
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { anchorEl, isLoading, data } = this.state;
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
            <Badge badgeContent={
              data.filter(data => !data.open).length
            }
              color="secondary"
            >
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
          onEntered={this.openNotifikasi}
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
            isLoading ? (
              <Box p={10}>
                <Grid container justify='center'>
                  <Grid item>
                    <CircularProgress size={30} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
                data.length === 0 ? (
                  <MenuItem
                    onClick={this.handleClose}
                  >
                    Tidak ada notifikasi
                  </MenuItem>
                ) : (
                    data
                      .map((value, index) =>
                        value.aproval ? (
                          <MenuItem
                            key={index}
                            onClick={() => {
                              this.handleClose();
                              if (value.jenisCuti === 'Cuti Tahunan') {
                                window.location.replace(`/riwayat_cuti_tahunan/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Besar') {
                                window.location.replace(`/riwayat_cuti_besar/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Sakit') {
                                window.location.replace(`/riwayat_cuti_sakit/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Bersalin') {
                                window.location.replace(`/riwayat_cuti_bersalin/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Alasan Penting') {
                                window.location.replace(`/riwayat_cuti_alasan_penting/${value.cutiId}`);
                              } else if (value.jenisCuti === 'Cuti Luar Tanggungan Negara') {
                                window.location.replace(`/riwayat_cltn/${value.cutiId}`);
                              }
                            }}
                          >
                            {value.jenisCuti}
                          </MenuItem>
                        ) : (
                            <MenuItem
                              onClick={this.handleClose}
                            >
                              Tidak ada notifikasi
                            </MenuItem>
                          ))
                  )
              )
          }
        </Menu>
      </Fragment>
    );
  }
}

export default NotifikasiAproval;