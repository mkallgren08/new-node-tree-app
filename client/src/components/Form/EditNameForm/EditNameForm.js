import React, { Component } from "react";
import "../Form.css"

class EditNameForm extends Component {
  state={
    id:this.props.id
  }

  componentDidMount(){
    console.log(this.state.id)
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="childName">
            <strong>Change Name</strong>
          </label>
          <input
            className={"form-control"}
            id="childName"
            type="text"
            value={this.props.newName}
            placeholder="Must begin with a minimum of one letter"
            name="childName"
            onChange={this.props.handleInputChange}
            required
          />
        </div>
        <div className="pull-right">
          <button onClick={this.props.handleModalClose}>Close</button>
          <button
            onClick={(e)=>this.props.handleFormSubmit(e, this.props.id)}
            type="submit"
            className="btn btn-lg btn-danger"
          >
            Submit
      </button>
        </div>
      </form>
    )
  }
}


export default EditNameForm
