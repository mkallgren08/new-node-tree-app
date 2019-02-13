import React, { Component } from 'react';
import "./Nodes.css"
import GrandchildNode from "./GrandchildNode"
import EditNameForm from '../Form/EditNameForm/index';
import { MyModal } from '../Modals';

class ChildNode extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalId: this.props.id
    }
  }

  componentDidMount = () => {
    console.log(this.state.modalId)
  }

  render() {
    //console.log(this.state)
    let grandchildren = true;
    if (this.props.grandchildren.length === 0) {
      grandchildren = false
    }

    return (
      <div className='childWrapper'>
        <div className="childHeader">
          <div className="text" key={this.props.id}>{this.props.name}</div>
          <button className="edit" onClick={this.props.showNameEdit}>EDIT NAME</button>
          <button className="delete" onClick={() => this.props.handleDelete(this.props.id)}>X</button>
        </div>
        <div className="childBody">
          {grandchildren ?
            this.props.grandchildren.map(item => {
              return <GrandchildNode key={item.id} name={item.name} parent={item.parent} value={item.value}></GrandchildNode>
            }) : <div>No grandchildren to render</div>
          }
        </div>
        <MyModal
          show={this.props.showName}
          onHide={this.props.handleModalClose}
        >
          <EditNameForm
            errors={this.props.errorFields}
            handleInputChange={this.props.handleInputChange}
            name={this.props.name}
            newName={this.props.newName}
            handleModalClose={this.props.handleModalClose}
            handleFormSubmit={this.props.handleNameEdit}
            id={this.props.id}
          />
        </MyModal>
      </div>
    )
  }

}

export default ChildNode;