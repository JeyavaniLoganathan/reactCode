import React from 'react';
import Headers from './component/common/Header.jsx';
import Footer from './component/common/Footer.jsx';
class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Headers />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
export default Menu;