import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class ClaimList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claims: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showUpdate = this.showUpdate.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount")

    axios.get(`http://localhost:8102/rest/claims/getClaims`)
      .then(res => {
        const claimList = res.data;
        this.dispatchClaimListToStore(claimList);
      })
  }
  dispatchClaimListToStore(claimList) {
    this.props.dispatch(this.claimListAction(claimList))
  }
  claimListAction(claimList) {
    return {
      type: "claimList",
      claimList: claimList
    }
  }
  showUpdate(thisClaim) {
    window.event.preventDefault();
    browserHistory.push('UpdateForm/' + thisClaim.emp_id);
    this.setState({ showUpdate: true, selectedClaim: thisClaim })
  }
  handleSubmit(claim) {
    browserHistory.push('UpdateForm');
  }
  render() {
    let showUpdateContent = this.showUpdate;
    let myTr = "";
    const tblHd = {
      fontFamily: "TimesNewRoman"
    }
    if (this.props.claimList) {
      myTr = this.props.claimList.map(function (claim, index) {
        return (
        <tr key={index} style={tblHd}><td>{claim.emp_id}</td><td>{claim.emp_name}</td>
          <td>{claim.claim_number}</td><td>{claim.claim_type}</td>
          <td>{claim.claim_program}</td>
          <td>{claim.start_date}</td>
          <td>{claim.end_date}</td>
          <td><a className="updateTdBut" href="#UpdateForm" onClick={() => showUpdateContent(claim)} >Update</a></td>
        </tr>
        )
      });
    }
    return myTr;
  }
}
const mapStateToProps = state => {
  return { claimList: state.ClaimListReducer.claimObj }
}
export default connect(mapStateToProps)(ClaimList)