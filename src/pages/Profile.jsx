import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

class Profile extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Profil" />
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
        </CardContent>
      </Card>
    );
  }
}
export default Profile; 