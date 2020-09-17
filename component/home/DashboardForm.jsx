import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';

class DashboardForm extends React.Component {
  render() {
    const mystyle = {
      backgroundColor: "black",
      fontFamily: "TimesNewRoman"
    }
    return (
      <div>
        <Navbar style={mystyle} variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand href="#home" as={Link} to="DashboardForm">Home</Navbar.Brand>
            <Nav.Link href="#viewForm" as={Link} to="ViewForm">View Claim Summary</Nav.Link>
            <Nav.Link href="#contact" as={Link} to="Contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#Singout" as={Link} to="LoginForm">Signout</Nav.Link>
          </Nav>
        </Navbar>
        <section>
          <div style={{ fontFamily: "TimesNewRoman" }}>
            <br />
            <p> <b> Welcome to Bank Management System</b></p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </section>
      </div>
    );
  }
}
export default DashboardForm;

