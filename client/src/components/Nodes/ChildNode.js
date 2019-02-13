import React, { Component } from 'react';
import "./Nodes.css"
import GrandchildNode from "./GrandchildNode"

class ChildNode extends Component {

  
  render() {
    //console.log(this.state)
    let grandchildren = true;
    if (this.props.grandchildren.length===0){
      grandchildren=false
    }

    return (
      <div className='childWrapper'>
        <div className="childHeader">
          <div className="text" key={this.props.id}>{this.props.name}</div>
          <button className="edit" onClick={()=>{this.props.handleNameEdit(this.props.id)}}>EDIT</button>
          <button className="delete" onClick={() => this.props.handleDelete(this.props.id)}>X</button>
        </div>
        <div className="childBody">
          { grandchildren?
            this.props.grandchildren.map(item=>{
              return <GrandchildNode key={item.id} name={item.name} parent={item.parent} value={item.value}></GrandchildNode>
            }) : <div>No grandchildren to render</div>
          }
        </div>
      </div>
    )
  }

}

export default ChildNode;