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
      isLoading: true,
      anchorEl: null,
      data: []
    };

    this.__subscribe = false;
  }

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });

    let unreadNotifikasiId = this.state.data
      .filter(notifikasi => !notifikasi.read)
      .map(notifikasi => notifikasi.notifikasiId);

    Axios.post('/readNotifikasiPengajuan', unreadNotifikasiId)
      .then(res => {
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
      })
      .catch(err => console.error(err));
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
              data.filter(notifikasi => notifikasi.read === false).length
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
                data.map((value, index) =>
                  value.aproval ? (
                    <MenuItem
                      key={index}
                      onClick={this.handleClose}
                    >
                      Tidak ada notifikasi
                    </MenuItem>
                  ) : (
                      <div key={index}>
                        <MenuItem
                          onClick={() => {
                            this.handleClose();
                            window.location.replace(`/beranda/${value.cutiId}`);
                          }}
                        >
                          <ListItemText
                            primary={<Typography noWrap>
                              NIP : {value.pengirim}, mengajukan {value.jenisCuti}
                            </Typography>}
                            secondary={value.createdAt}
                          />
                        </MenuItem>
                      </div>
                    )
                )
              )
          }
        </Menu>
      </Fragment>
    );
  }
}

export default NotifikasiPengajuan;