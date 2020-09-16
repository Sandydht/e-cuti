import React from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © E-Cuti '}{new Date().getFullYear()}{'.'}
    </Typography>
  );
};

export default Footer;