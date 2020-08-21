import React, { Component } from 'react';

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

// Styles
const styles = (theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
});

class Thumb extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.file) return;

    this.setState({
      loading: true
    }, () => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          loading: false,
          thumb: reader.result
        });
      };
      reader.readAsDataURL(nextProps.file);
    });

  };

  render() {
    const { file, classes } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return <Avatar className={classes.avatar} />;
    }

    if (loading) {
      return <CircularProgress />;
    }

    return (
      <Avatar
        src={thumb}
        alt={file.name}
        className={classes.avatar}
      />
    );
  }
}
export default withStyles(styles)(Thumb);