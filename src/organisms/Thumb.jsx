import React, { Component } from 'react';

// Material UI
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

class Thumb extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  };

  render() {
    const { file, className } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return (
        <Avatar src={thumb}
          className={className}
        />
      );
    }

    if (loading) {
      return <CircularProgress />;
    }

    return (
      <Avatar
        src={thumb}
        alt={file.name}
        className={className}
      />
    );
  }
}
export default Thumb;