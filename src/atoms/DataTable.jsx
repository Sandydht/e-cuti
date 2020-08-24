import React, { Component } from 'react';

// Material UI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Data table
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

class DataTable extends Component {
  render() {
    const { title, isLoading } = this.props;
    return (
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
          fixedHeader: true,
          enableNestedDataAccess: ".",
          rowsPerPageOptions: [5, 10, 15],
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
    );
  }
}

export default DataTable;