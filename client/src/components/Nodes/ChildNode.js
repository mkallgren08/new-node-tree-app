import React, { Component } from 'react';
import "./Nodes.css"
import GrandchildNode from "./GrandchildNode"

class ChildNode extends Component {

  state = {
    show: false,
    name: ''
  }

  constructor(props) {
    super(props)
    console.log('Child loaded')
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange = (e) => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = e.target;
    console.log(name, value)
    if (name === 'minVal' || name === 'maxVal' || name === 'numGrandChildren') {
      let nuval = parseInt(value, 10)
      this.setState({
        [name]: nuval
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  show() {
    console.log('show')
    this.setState({ show: true })
  }

  hide = () => {
    this.setState({ show: false })
  }

  render() {
    //console.log(this.state)
    let grandchildren = true;
    if (this.props.grandchildren.length === 0) {
      grandchildren = false
    }

    let show = this.state.show;

    return (
      <div className='childWrapper'>
        <div className="childHeader" value={this.props.numKids}>
          <div className="text" key={this.props.id}>{this.props.name}</div>
          <button className="edit" onClick={() => { this.props.handleNameEdit(this.props.id) }}>EDIT</button>
          <button className="delete" onClick={() => this.props.handleDelete(this.props.id, true)}>X</button>
          {/* <button className="delete" onClick={() => this.props.show}>Show</button> */}
          <button className="show" onClick={() => { show ? show = false : show = true; this.setState({ show: show }) }}>{show ? <span>Hide</span> : <span>Show</span>}</button>
          {show ?
            <input
              className={"form-control"}
              id="childName"
              type="text"
              value={this.props.name}
              placeholder="Must begin with a minimum of one letter"
              name="childName"
              onChange={this.handleInputChange}
              required
            /> : null
          }
        </div>
        <div className="childBody">
          {grandchildren ?
            this.props.grandchildren.map(item => {
              return <GrandchildNode key={item.id} name={item.name} parent={item.parent} value={item.value}></GrandchildNode>
            }) : <div>No grandchildren to render</div>
          }
        </div>
      </div>
    )
  }

}

export default ChildNode;