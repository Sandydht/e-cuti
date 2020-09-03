import React, { Component } from 'react';
import clsx from "clsx";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI data table
import MUIDataTable from "mui-datatables";

// Styles
const styles = (theme) => ({
  greyLine: {
    '& td': { backgroundColor: theme.palette.grey[200] },
  },
});

class DataTable extends Component {
  render() {
    const { data, columns, classes, isLoading, title } = this.props;
    return (
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
          enableNestedDataAccess: ".",
          tableBodyHeight: "100%",
          tableBodyMaxHeight: "800px",
          rowsPerPageOptions: [5, 10, 15],
          selectableRows: "none",
          responsive: "simple",
          download: false,
          print: false,
          fixedHeader: false,
          rowHover: false,
          setRowProps: (row, dataIndex, rowIndex) => {
            return {
              className: clsx({
                [classes.greyLine]: rowIndex % 2 === 0
              }),
            };
          },
          textLabels: {
            body: {
              noMatch: isLoading ? "Sedang memuat..." : "Data tidak ditemukan..."
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
    );
  }
}

export default withStyles(styles)(DataTable);
