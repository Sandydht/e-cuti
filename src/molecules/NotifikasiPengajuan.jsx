import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Badge from '@material-ui/core/Badge';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Typography } from '@material-ui/core';

class NotifikasiPengajuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      anchorEl: null,
      data: []
    };

    this.__subscribe = false;
  }

  handleOpen = (event) => {
    this.__subscribe = true;
    this.setState({
      anchorEl: event.currentTarget,
      isLoading: true
    });

    let unreadNotifikasiId = this.state.data
      .filter(data => !data.read)
      .map(data => data.notifikasiId);

    Axios.post('/readNotifikasiPengajuan', unreadNotifikasiId)
      .then(() => this.setState({ isLoading: false }))
      .catch(() => this.setState({ isLoading: false }));

    Axios.get("/getNotifikasiPengajuan")
      .then((res) => {
        if (this.__subscribe) {
          this.notifikasiPengajuan(res.data);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          data: []
        });
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
          isLoading: false,
          data: []
        });
      });
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { anchorEl, data, isLoading } = this.state;
    const open = Boolean(anchorEl);
    const needAproval = data.filter(data => !data.aproval);

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
              data.filter(notifikasi => !notifikasi.read).length
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
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress size={30} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
                data.length > 0 ? (
                  needAproval.length > 0 ? (
                    needAproval.map((value, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          this.handleClose();
                          window.location.replace(`/beranda/${value.cutiId}`);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" noWrap>
                              NIP : {value.pengirim}, mengajukan {value.jenisCuti}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" noWrap>
                              {value.createdAt}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    ))
                  ) : (
                      <MenuItem onClick={this.handleClose}>
                        Tidak ada notifikasi
                      </MenuItem>
                    )
                ) : (
                    <MenuItem onClick={this.handleClose}>
                      Tidak ada notifikasi
                    </MenuItem>
                  ))
          }
          {/* {
            isLoading ? (
              <Box p={10}>
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress size={30} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
                data.length > 0 ? (
                  data
                    .filter(data => !data.aproval)
                    .map((value, index) => (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          this.handleClose();
                          window.location.replace(`/beranda/${value.cutiId}`);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" noWrap>
                              NIP : {value.pengirim}, mengajukan {value.jenisCuti}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" noWrap>
                              {value.createdAt}
                            </Typography>
                          }
                        />
                      </MenuItem>
                    ))

                ) : (
                    <div>Tidak ada notifikasi</div>
                  )
              )
          } */}
        </Menu>
      </Fragment>
    );
  }
}

export default NotifikasiPengajuan;