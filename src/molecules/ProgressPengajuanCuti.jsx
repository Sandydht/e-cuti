import React, { Component, Fragment } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import { green, red } from '@material-ui/core/colors';
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

// Moment js
import * as moment from 'moment';
import 'moment/locale/id';

// Firebase
import firebase from '../config/firebase';

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

// Styles
const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
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

    this.subscribe = false;
  }

  aproval = (data) => {
    this.setState({
      isLoading: false,
      data
    });
  };

  componentDidMount() {
    this.subscribe = true;
    return firebase
      .firestore()
      .collection('aproval')
      .where('cutiId', '==', this.props.match.params.cutiId)
      .limit(1)
      .onSnapshot((querySnapshot) => {
        let data = {};
        querySnapshot.forEach(doc => {
          data = {
            aprovalId: doc.id,
            cutiId: doc.data().cutiId,
            nipAtasan: doc.data().nipAtasan,
            pertimbangan: doc.data().pertimbangan,
            keterangan: doc.data().keterangan,
            createdAt: doc.data().createdAt
          };
        });

        if (this.subscribe) {
          this.aproval(data);
        }
      }, () => {
        this.setState({
          isLoading: false,
          data: {}
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.cutiId !== prevProps.match.params.cutiId) {
      this.subscribe = true;
      return firebase
        .firestore()
        .collection('aproval')
        .where('cutiId', '==', this.props.match.params.cutiId)
        .limit(1)
        .onSnapshot((querySnapshot) => {
          let data = {};
          querySnapshot.forEach(doc => {
            data = {
              aprovalId: doc.id,
              cutiId: doc.data().cutiId,
              nipAtasan: doc.data().nipAtasan,
              pertimbangan: doc.data().pertimbangan,
              keterangan: doc.data().keterangan,
              createdAt: doc.data().createdAt
            };
          });

          if (this.subscribe) {
            this.aproval(data);
          }
        }, () => {
          this.setState({
            isLoading: false,
            data: {}
          });
        });
    }
  }

  componentWillUnmount() {
    this.subscribe = false;
  }

  render() {
    const { isLoading, data } = this.state;
    moment.locale('id');

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
                  <FormControl component="fieldset" disabled>
                    <FormLabel component="legend">Pertimbangan</FormLabel>
                    <RadioGroup aria-label="pertimbangan" name="pertimbangan">
                      <FormControlLabel
                        checked
                        control={
                          data.pertimbangan === "Disetujui"
                            ? <GreenRadio />
                            : data.pertimbangan === "Tidak Disetujui"
                              ? <RedRadio />
                              : <Radio
                                checked
                                color="default"
                              />}

                        label={data.pertimbangan === "Disetujui"
                          ? "Disetujui"
                          : data.pertimbangan === "Tidak Disetujui"
                            ? "Tidak Disetujui"
                            : "Menunggu"} />
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
                  <TextField
                    label="Tanggal Diperiksa"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={data.createdAt ? moment(data.createdAt).format('L, h:mm') : "-"}
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
