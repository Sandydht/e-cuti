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
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';

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
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get('/dataUser')
      .then(res => {
        if (this.__subscribe) {
          this.setState({
            isLoading: false,
            data: res.data.notifikasi
          });
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
              data.filter(data => !data.read).length
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
                              <Typography noWrap>
                                NIP : {value.pengirim}, mengajukan {value.jenisCuti}
                              </Typography>
                            }
                            secondary={
                              <Typography variant='caption' noWrap>
                                {value.createdAt}
                              </Typography>
                            }
                          />
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