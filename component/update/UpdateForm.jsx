import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';

const validClaimNumber = new RegExp("[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}");
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};
function isValidateProgram(value) {
  if (value == "" || value.length > 20) {
    return false;
  }
  return true
}
class UpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUpdate: this.props.showUpdate,
      errors: {
        claimNumber: '',
        claimProgram: ''
      }
    };
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.submitClaim = this.submitClaim.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.params.emp_id) {
      axios.get(`http://localhost:8102/rest/claims/getClaim/${this.props.params.emp_id}`)
        .then(res => {
          const claim = res.data;
          console.log(claim);
          this.setState({ claim });
        })
        .catch(error => {
          this.setState({ claim: null })
          console.log('error', error);
        })
    } else {
      axios.get(`http://localhost:8102/rest/claims/getClaim/001`)
        .then(res => {
          const claim = res.data;
          console.log(claim);
          this.setState({ claim });
        })
        .catch(error => {
          this.setState({ claim: null })
          console.log('error', error);
        })
    }
  }

  cancelUpdate() {
    this.setState({ showUpdate: false });
    browserHistory.push('ViewForm');
  }
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'claim_number':
        errors.claimNumber =
          validClaimNumber.test(value)
            ? ''
            : 'Claim Number is not valid! XXX-XXX-XXX';
        break;
      case 'claim_program':
        errors.claimProgram =
          isValidateProgram(value)
            ? ''
            : 'Maximum length is 20';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }
  submitClaim(e) {

    e.preventDefault();
    let putJson = '';
    let claimObj = {

      emp_id: this.refs['emp_id'].value,
      emp_name: this.refs['emp_name'].value,
      claim_number: this.refs['claim_number'].value,
      claim_type: this.refs['claim_type'].value,
      claim_program: this.refs['claim_program'].value,
      start_date: this.refs['start_date'].value,
      end_date: this.refs['end_date'].value
    };
    for (const field in this.refs) {
      console.log(field);
      putJson += field + ':"' + this.refs[field].value + '"';
      if (field !== 'end_date') {
        putJson += ",";
      }
    }
    putJson += ''
    axios.put('http://localhost:8102/rest/claims/claim/' + this.refs['emp_id'].value, claimObj)
      .then(res => {
        browserHistory.push('ViewForm');
      });
  }

  render() {
    const { errors } = this.state;
    if (this.state.claim) {
      const { id, emp_id, emp_name, claim_number, claim_type, claim_program, start_date, end_date } = this.state.claim;
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
              <Nav.Link href="#Signout" as={Link} to="LoginForm">Signout</Nav.Link>
            </Nav>
          </Navbar>
          <br/>
          <br/>
          <Container className="align-items-center">
            <Form onSubmit={this.submitClaim}>
            <Row className="justify-content-md-center align-items-center"> <p align="center" style={{ fontSize: "large" }}><b>Update Claim Details</b></p></Row>
            <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
                  <input type="hidden" defaultValue={id} name="id" ref="id" />
                  </Col>
                  <Col md="auto">
                  <input type="hidden" defaultValue={emp_id} name="emp_id" ref="emp_id" />
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">                  
                    <Form.Label>Employee Name</Form.Label>
                    </Col>
                    <Col md="auto">
                    <Form.Group>
                    <Form.Control type="text" defaultValue={emp_name} disabled name="emp_name" ref="emp_name" />
                    </Form.Group>
                    </Col>                 
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
              <Form.Label>Claim Number</Form.Label>
              </Col>
              <Col md="auto">
                  <Form.Group>
                    
                    <Form.Control type="text" defaultValue={claim_number} name="claim_number" ref="claim_number" maxLength="11"
                      onChange={this.handleChange} noValidate />
                    {errors.claimNumber.length > 0 &&
                      <span style={{ color: "red" }} className='error'>{errors.claimNumber}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
              <Form.Label>Claim Type</Form.Label>
              </Col>
              <Col md="auto">
                  <Form.Group>
                    
                    <Form.Control as="select" defaultValue={claim_type} ref="claim_type">
                      <option>Submitted</option>
                      <option>Received</option>
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>More Info Required</option>
                      <option>Denied</option>
                      <option>Rejected</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
              <Form.Label>Claim Programs</Form.Label>
              </Col>
              <Col md="auto">
                  <Form.Group>
                   
                    <Form.Control type="text" defaultValue={claim_program} name="claim_program" ref="claim_program" onChange={this.handleChange} noValidate maxLength="20" />
                    {errors.claimProgram.length > 0 &&
                      <span style={{ color: "red" }} className='error'>{errors.claimProgram}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
              <Form.Label>Claim Start Date</Form.Label>
              </Col>
              <Col md="auto">
                  <Form.Group>
                    
                    <Form.Control type="text" defaultValue={start_date} ref="start_date" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">              
              <Col xs lg="2">
              <Form.Label>Claim End Date</Form.Label>
                </Col>
                <Col md="auto">
                  <Form.Group>                    
                    <Form.Control type="text" defaultValue={end_date} ref="end_date" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-md-center align-items-center">
                <Col xs lg="2">
                <Button variant="primary" size="xs" type="submit" active>
                    Update
              </Button>
              </Col>
              <Col md="auto">
                  <Button variant="secondary" size="xs" active onClick={this.cancelUpdate}>
                    Cancel
              </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      );
    }
    return null;
  }
}
export default UpdateForm;

