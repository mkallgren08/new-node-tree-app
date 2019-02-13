import React, { Component } from "react";
import "../Form.css"

class CustomForm extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="childName">
            <strong>Factory Name</strong>
          </label>
          <input
            className={"form-control"}
            id="childName"
            type="text"
            value={this.props.name}
            placeholder="Must begin with a minimum of one letter"
            name="childName"
            onChange={this.props.handleInputChange}
            required
          />
          <label htmlFor="numGrandChildren">
            <strong>Number of Nodes</strong>
          </label>
          <input
            className="form-control"
            id="numGrandChildren"
            type="number"
            value={this.props.number}
            placeholder="Minimum of 1; Maximum of 15"
            name="numGrandChildren"
            onChange={this.props.handleInputChange}
            required
          />
          <label htmlFor="minVal">
            <strong>Min Range Val</strong>
          </label>
          <input
            className="form-control"
            id="minVal"
            type="number"
            value={this.props.minVal}
            placeholder="Any positive integer"
            name="minVal"
            onChange={this.props.handleInputChange}
            required
          />
          <label htmlFor="maxVal">
            <strong>Max Range Val</strong>
          </label>
          <input
            className="form-control"
            id="maxVal"
            type="number"
            value={this.props.maxVal}
            placeholder="Any positive integer greater than the minimum"
            name="maxVal"
            onChange={this.props.handleInputChange}
            required
          />
        </div>
        <div className="pull-right">
          <button onClick={this.props.handleModalClose}>Close</button>
          <button
            onClick={this.props.handleFormSubmit}
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


export default CustomForm
