import React from 'react';

// Material UI
import Typography from '@material-ui/core/Typography';

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © E-Cuti '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
};

export default Footer;