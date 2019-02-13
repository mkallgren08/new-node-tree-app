import React, { Component } from 'react';
import "./Nodes.css"

class GrandchildNode extends Component {
  state = {
    
  };

  render () {

    return (
      <div className='grandchildWrapper'>
      <div className="grandchildHeader">
        <div className="text">{this.props.name}</div>
        <div className="gcValue">{this.props.value}</div>
        <div className="delete">-</div>
      </div>
      <div className="grandchildBody">

      </div>
    </div>
    )
  }
}

export default GrandchildNode;