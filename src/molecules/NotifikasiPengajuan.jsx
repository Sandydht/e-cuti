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
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

// Moment js
import * as moment from 'moment';
import 'moment/locale/id';

class NotifikasiPengajuan extends Component {
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
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          data: []
        });
      });
  };

  readNotifikasi = async (data) => {
    this.__subscribe = true;
    const notifikasiId = data.notifikasiId;
    await Axios.post('/readNotifikasi', { notifikasiId })
      .then(() => window.location.replace(`/beranda/${data.cutiId}`));
    await Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.dataNotifikasi(res.data.notifikasi);
        }
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          data: []
        });
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
    const { anchorEl, isLoading, data } = this.state;
    const open = Boolean(anchorEl);

    moment.locale('id');

    return (
      <Fragment>
        <Tooltip title="Notifikasi">
          <IconButton
            aria-controls="notifikasi"
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleOpen}
          >
            <Badge badgeContent={data.filter(data => data.open === false).length}
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
                data.length > 0 ? (
                  data.filter(data => !data.aproval).length > 0 ? (
                    data
                      .filter(data => !data.aproval)
                      .map((value) => (
                        <MenuItem
                          key={value.notifikasiId}
                          onClick={() => {
                            this.handleClose();
                            this.readNotifikasi(value);
                          }}
                        >
                          <Badge
                            color="secondary"
                            variant='dot'
                            badgeContent={value.read ? 0 : 1}
                          >
                            <ListItemText
                              primary={
                                <Fragment>
                                  <Typography noWrap>
                                    NIP : {value.pengirim}
                                  </Typography>
                                  <Typography
                                    noWrap
                                  >
                                    Mengajukan {value.jenisCuti}
                                  </Typography>
                                </Fragment>
                              }
                              secondary={
                                <Typography
                                  component='span'
                                  variant="body2"
                                  noWrap
                                >
                                  {moment(value.createdAt).fromNow()}
                                </Typography>
                              }
                            />
                          </Badge>
                        </MenuItem>
                      ))
                  ) : (
                      <MenuItem
                        onClick={this.handleClose}
                      >
                        Tidak ada notifikasi
                      </MenuItem>
                    )
                ) : (
                    <MenuItem
                      onClick={this.handleClose}
                    >
                      Tidak ada notifikasi
                    </MenuItem>
                  )
              )
          }
        </Menu>
      </Fragment >
    );
  }
}

export default NotifikasiPengajuan;