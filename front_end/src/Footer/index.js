import React, { useState } from 'react';
import {
  CardFooter
} from 'reactstrap';
import './styles.css'

const Footer = (props) => {
  return (
     <div className="footer">
      <CardFooter>&copy; {(new Date()).getFullYear()} Market Zhupani. All Rights Reserved.</CardFooter>
    </div>
  );
}

export default Footer;