import React from 'react';
class Footer extends React.Component {
  render() {
    const mystyle = {
      fontWeight: "bold",
      padding: "5px",
      position: "fixed",
      left: "0",
      bottom: "0",
      width: "100%",
      backgroundColor: "black",
      color: "white",
      textAlign: "center"
    };
    return (
      <div style={mystyle}>
        <p align="right">&copy; {new Date().getFullYear()} Copyright:BankManagement</p>
      </div>
    );
  }
}
export default Footer;