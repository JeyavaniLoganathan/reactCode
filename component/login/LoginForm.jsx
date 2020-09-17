import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      userName: null,
      password: null,
      invalidUser: false,
      errors: {
        userName: '', password: ''
      },
      user: '',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'userName':
        errors.userName =
          value.length < 5
            ? 'User Name must be 5 characters long!'
            : '';
        break;
      case 'password':
        errors.password =
          value.length < 5
            ? 'Password must be 5 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    })
  }

  handleSubmit(event) {
    window.event.preventDefault();
    axios.get(`http://localhost:8102/rest/user`)
      .then(res => {
        let validUser = false;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].userName === this.refs['userName'].value
            && res.data[i].password === this.refs['password'].value) {
            validUser = true;
          }
        }
        if (validUser) {
          this.dispatchLoggedUsernameStore(this.refs['userName'].value);
          browserHistory.push('DashboardForm');

        } else {
          this.setState({ invalidUser: true });
        }
      }).catch(error => { this.setState({ invalidUser: true }) })

  }

  dispatchLoggedUsernameStore(loggedUsername) {
    this.props.dispatch(this.loginAction(loggedUsername))
  }

  loginAction(loggedUser) {
    return {
      type: 'login',
      loggedUsername: loggedUser
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>                
        <br />
        
        
        <Container>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Row className="justify-content-md-center align-items-center">
              <p align="center">        
              {(this.state.invalidUser) && 
                (<Alert key='error-message' variant='warning'>UserName & Password shouldn't be empty</Alert>)
              }
              </p>
              </Row>
             <Row className="justify-content-md-center align-items-center"> <p align="center" style={{ fontSize: "large" }}><b>WELCOME</b></p></Row>
            <Row className="justify-content-md-center align-items-center">
              
              <Col xs lg="1">
                <Form.Label>Username</Form.Label>
              </Col>
              <Col md="auto">
                <Form.Group controlId="formBasicUsername">
                  <Form.Control type="text" name="userName" placeholder="Username" ref="userName" onChange={this.handleChange} noValidate />
                  {(errors.userName.length > 0) &&
                    (<Alert key='error-message' variant='danger'>User Name should be minimum of 5 characters</Alert>)
                  }
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center align-items-center">
              <Col xs lg="1">
                <Form.Label>Password</Form.Label>
              </Col>
              <Col md="auto">
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" name="password" placeholder="Password" ref="password" onChange={this.handleChange} noValidate />                 
                </Form.Group></Col>
            </Row>
            <Row className="justify-content-md-center align-items-center">
              <Col md="auto">
                <Button variant="primary" onClick={this.handleSubmit.bind(this)} size="xs" active>
                  Login
            </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('App state', state);
  return { loggedUsername: state.loggedUsername }
}

export default connect(mapStateToProps)(LoginForm)
