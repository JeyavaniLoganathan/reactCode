import React from 'react';
class Claim extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<tr><td>I am a {this.props.answer}!</td></tr>)
  }
}
export default Claim;