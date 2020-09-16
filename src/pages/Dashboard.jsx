import React, { Component } from 'react';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';

// Organisms
import Topbar from '../organisms/Topbar';
import Sidebar from '../organisms/Sidebar';
import Main from '../organisms/Main';
import Footer from '../organisms/Footer';

// Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'auto'
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto'
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const { classes, ...rest } = this.props;
    const { mobileOpen } = this.state;

    return (
      <div className={classes.root}>
        <Topbar onClick={this.handleDrawerToggle} {...rest} />
        <Sidebar open={mobileOpen} onClose={this.handleDrawerToggle} />
        <div className={classes.main}>
          <Main />
          <footer className={classes.footer}>
            <Footer />
          </footer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
