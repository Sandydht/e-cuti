import React, { Component } from 'react';
import clsx from "clsx";

// Material UI
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Data table
import MUIDataTable from "mui-datatables";

// Styles
const styles = (theme) => ({
  greyLine: {
    '& td': { backgroundColor: theme.palette.grey[200] }
  }
});

class DataTable extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          head: {
            backgroundColor: 'black',
            color: "#FFFF"
          },
        }
      },
    });

  render() {
    const { title, isLoading, columns, data } = this.props;
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          title={<Typography variant="h6">
            {title}
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
          </Typography>}
          columns={columns}
          data={data}
          options={{
            responsive: "simple",
            print: false,
            download: false,
            selectableRows: "none",
            searchPlaceholder: "Pencarian",
            tableBodyHeight: "auto",
            tableBodyMaxHeight: "500px",
            fixedHeader: false,
            enableNestedDataAccess: ".",
            rowsPerPageOptions: [5, 10, 15],
            setRowProps: (row, dataIndex, rowIndex) => {
              return {
                className: clsx({
                  [this.props.classes.greyLine]: rowIndex % 2 === 0
                })
              };
            },
            textLabels: {
              body: {
                noMatch: isLoading ? "Sedang memuat..." : "Data tidak ditemukan...",
                toolTip: "Sortir",
              },
              pagination: {
                next: "Halaman selanjutnya",
                previous: "Halaman sebelumnya",
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