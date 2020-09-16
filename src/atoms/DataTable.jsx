import React, { Component } from 'react';
import clsx from 'clsx';

// Material UI
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";

// Styles
const styles = (theme) => ({
  GreyLine: {
    '& td': { backgroundColor: theme.palette.grey[200] },
  },
});

class DataTable extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: 'black',
            color: 'white'
          },
        }
      },
    });
  render() {
    const { classes, data, columns, isLoading, title } = this.props;
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={
            <Typography variant="h6">
              {title}
              {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
          }
          data={data}
          columns={columns}
          options={{
            download: false,
            print: false,
            rowsPerPageOptions: [5, 10, 15],
            selectableRows: 'none',
            responsive: 'simple',
            fixedHeader: false,
            tableBodyMaxHeight: '800px',
            setRowProps: (row, dataIndex, rowIndex) => {
              return {
                className: clsx({
                  [classes.GreyLine]: rowIndex % 2 === 0,
                })
              };
            },
            textLabels: {
              body: {
                noMatch: isLoading ? 'Sedang memuat...' : 'Data tidak ditemukan...',
                toolTip: "Sortir",
                columnHeaderTooltip: column => `Sort for ${column.label}`
              },
              pagination: {
                next: "Halaman Selanjutnya",
                previous: "Halaman Sebelumnya",
                rowsPerPage: "Baris per halaman:",
                displayRows: "dari",
              },
              toolbar: {
                search: "Pencarian",
                viewColumns: "Tampilkan Kolom",
                filterTable: "Filter Tabel",
              },
              filter: {
                all: "Semua",
                title: "FILTER",
                reset: "RESET",
              },
              viewColumns: {
                title: "Tampilkan Kolom",
                titleAria: "Tampilkan Kolom",
              }
            }
          }}
        />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(DataTable);
