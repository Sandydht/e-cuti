import React, { Component } from 'react';

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

class Aproval extends Component {
  render() {
    return (
      <Card>
        <CardHeader title="Detail Cuti" />
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
            label="Jenis Cuti"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Alasan Cuti"
            InputProps={{
              readOnly: true,
            }}
          />
          <Box mt={2} mb={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tanggal Mulai"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="s/d Tanggal"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <TextField
            label="Alamat Selama Cuti"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </CardContent>
      </Card>
    );
  }
}

export default Aproval;
