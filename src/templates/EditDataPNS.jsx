import React, { Component, Fragment } from 'react';

// Atoms
import FormEditDataPNS from "../atoms/FormEditDataPNS";

class EditDataPNS extends Component {
  render() {
    const { ...rest } = this.props;

    return (
      <Fragment>
        <FormEditDataPNS {...rest} />
      </Fragment>
    );
  }
}
export default EditDataPNS; 