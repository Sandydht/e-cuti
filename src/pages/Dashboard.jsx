import React, { Component } from 'react';
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

// Organisms
import Topbar from "../organisms/Topbar";
import Sidebar from "../organisms/Sidebar";
import Main from "../organisms/Main";
import Footer from "../organisms/Footer";

// Molecules
import Account from "../molecules/Account";
import NotifikasiAproval from "../molecules/NotifikasiAproval";
import NotifikasiPengajuan from "../molecules/NotifikasiPengajuan";

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: "100vh",
    overflow: 'auto',
  },
  footer: {
    padding: theme.spacing(5, 3),
    textAlign: "center",
    marginTop: 'auto'
  },
  activeLink: {
    backgroundColor: "#eeeeee"
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      role: "admin"
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes, role, ...rest } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        {/* Topbar */}
        <Topbar onClick={this.handleDrawerToggle} {...rest}>
          {
            role === "admin" ? <NotifikasiPengajuan /> : <NotifikasiAproval />
          }
          <Account {...rest} />
        </Topbar>

        {/* Sidebar */}
        <Sidebar
          {...rest}
          mobileOpen={mobileOpen}
          onClick={this.handleDrawerToggle}
          role={role}
        />

        {/* Main */}
        <div className={classes.content}>
          {/* Content */}
          <Main
            {...rest}
            role={role}
          />

          {/* Footer */}
          <Footer className={classes.footer} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  window: PropTypes.func
};

const mapStateToProps = ({ session }) => ({
  role: session.user.role
});

export default connect(mapStateToProps, null)(withStyles(styles)(Dashboard));