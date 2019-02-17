import React, { Component } from 'react';
import "./Nodes.css"

class GrandchildNode extends Component {
  state = {

  };

  render() {

    return (
      <div className='grandchildWrapper'>
        {this.props.show?<div className="gcSpacerBlockLeft inline"></div>:null}
        <div className='pipeBracket gcPipe inline'>

        </div>
        <div className='grandchildContentWrapper inline'>
          <div className="grandchildHeader">
            {/* <div className="text">{this.props.name}</div> */}
            <div className="gcValue">{this.props.value}</div>
          </div>
        </div>
        {!this.props.show?<div className="gcSpacerBlockRight inline"></div>:null}
      </div>

    )
  }
}

export default GrandchildNode;