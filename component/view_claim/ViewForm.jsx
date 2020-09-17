import React from 'react';
import Table from 'react-bootstrap/Table'
import ClaimList from './ClaimList.jsx'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';

class ViewForm extends React.Component {
  render() {
    const mystyle = {
      backgroundColor: "black",
      fontFamily: "TimesNewRoman"
    }
    const tblHd = {
      fontFamily: "TimesNewRoman"
    }
    return (
      <div>
        <Navbar style={mystyle} variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="#home" as={Link} to="DashboardForm">Home</Nav.Link>
            <Navbar.Brand href="#viewForm" style={mystyle} as={Link} to="ViewForm">View Claim Summary</Navbar.Brand>
            <Nav.Link href="#contact" as={Link} to="Contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#Singout" as={Link} to="LoginForm">Signout</Nav.Link>
          </Nav>
        </Navbar>
        <section>
          <Table striped bordered hover size="sm" responsive="sm" >
            <thead style={tblHd}>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Claim Number</th>
                <th>Claim Type</th>
                <th>Claim Programs</th>
                <th>Claim Start Date</th>
                <th>Claim End Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <ClaimList />
            </tbody>
          </Table>
        </section>
      </div>
    );
  }
}
export default ViewForm;

