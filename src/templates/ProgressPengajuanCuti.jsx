import React, { Component, Fragment } from 'react';
import Axios from "axios";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { green } from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

// Styles
const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Pertimbangan</FormLabel>
                    <RadioGroup aria-label="pertimbangan" name="pertimbangan">
                      <FormControlLabel
                        checked
                        control={
                          data.pertimbangan === "Disetujui"
                            ? <GreenRadio />
                            : data.pertimbangan === "Tidak Disetujui"
                              ? <Radio
                                checked
                              />
                              : <Radio
                                checked
                                color="default"
                              />}
                        label={data.pertimbangan === "Disetujui" ? "Disetujui" : data.pertimbangan === "Tidak Disetujui" ? "Tidak Disetujui" : "Menunggu"} />
                    </RadioGroup>
                  </FormControl>
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
