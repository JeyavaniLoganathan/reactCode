import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';

class Contact extends React.Component {
  render() {
    const mystyle = {
      backgroundColor: "black",
      fontFamily: "TimesNewRoman"
    }
    return (
      <div>
        <Navbar style={mystyle} variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home" as={Link} to="DashboardForm">Home</Nav.Link>
            <Nav.Link href="#viewForm" as={Link} to="ViewForm">View Claim Summary</Nav.Link>
            <Navbar.Brand href="#Contact" as={Link} to="Contact">Contact Us</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link href="#Singout" as={Link} to="LoginForm">Signout</Nav.Link>
          </Nav>
        </Navbar>
        <section>
          <br />
          <div style={{ fontFamily: "TimesNewRoman" }}>
            <p> Please Contact US by writing to us in : </p>
            <p> <b>claimQueries@bms.com </b></p>
          </div>
        </section>
      </div>
    );
  }
}
export default Contact;