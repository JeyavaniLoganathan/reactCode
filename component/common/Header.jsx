import React from 'react';
import { Navbar } from 'react-bootstrap';

class Headers extends React.Component {
   render() {
      const mystyle = {
         fontWeight: "bold"
      };
      return (
         <Navbar bg="info" expand="lg">
            <Navbar.Brand href="#home" style={mystyle}>BANK MANAGEMENT SYSTEM</Navbar.Brand>
         </Navbar>
      );
   }
}
export default Headers;   
