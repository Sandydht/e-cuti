import React, { Component } from 'react';

// React router dom
import { NavLink } from "react-router-dom";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class DetailPNS extends Component {
  render() {
    const { match } = this.props;
    return (
      <Card>
        <CardHeader title="Detail PNS" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="NIP"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Nama"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Golongan"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Unit Kerja"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Nomor Telepon"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Status Registrasi"
            InputProps={{
              readOnly: true,
            }}
          />

          <Box mt={2}>
            <Grid container spacing={2} justify="flex-end">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >Hapus</Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  component={NavLink}
                  to={`${match.url}/edit`}
                >Edit</Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default DetailPNS;
