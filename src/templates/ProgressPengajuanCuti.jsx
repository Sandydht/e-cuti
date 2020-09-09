import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

class ProgressPengajuanCuti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true
    };

    this.__subscribe = false;
  }

  aproval = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.__subscribe = true;

    Axios.get(`/progressPengajuanCuti/${this.props.match.params.cutiId}`)
      .then(res => {
        if (this.__subscribe) this.aproval(res.data);
      })
      .catch(() => this.setState({ isLoading: false, data: {} }));
  }

  componentWillUnmount() {
    this.__subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <Card>
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
                <CardHeader title="Progress Pengajuan Cuti" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Status Persetujuan"
                    value={data.pertimbangan ? data.pertimbangan : "Menunggu"}
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Keterangan"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={data.keterangan ? data.keterangan : "Menunggu"}
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </CardContent>
              </Fragment>
            )
        }
      </Card>
    );
  }
}

export default ProgressPengajuanCuti;
