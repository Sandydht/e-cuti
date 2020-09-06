import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };

    this.__subscribe = false;
  }

  dataProfile = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;
    Axios.get("/dataUser")
      .then((res) => {
        if (this.__subscribe) {
          this.dataProfile(res.data);
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
    const { data, isLoading } = this.state;

    return (
      <Card>
        <CardHeader title="Profil" />
        <Divider />
        <CardContent>
          {
            isLoading ? (
              <Box p={10}>
                <Grid container justify="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              </Box>
            ) : (
                <Fragment>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="NIP"
                    value={data.nip}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="NIK"
                    value={data.nik}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Nama"
                    value={data.nama}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Golongan"
                    value={data.golongan}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Unit Kerja"
                    value={data.unitKerja}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Nomor Telepon"
                    value={data.noTelp}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Fragment>
              )
          }
        </CardContent>
      </Card>
    );
  }
}
export default Profile; 