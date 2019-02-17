import React, { Component } from 'react';
import "./Nodes.css";
import GrandchildNode from "./GrandchildNode";
import API from "../../utils/API";
import Pusher from 'pusher-js'
import ClassNames from "classnames";

const pusher = new Pusher('651f8f2fd68d8e9f1ab0', {
  cluster: 'mt1',
  forceTLS: true
});

class ChildNode extends Component {
  state = {
    show: false,
    hold: false,
    prime: false,
    name: this.props.name,
    minVal: this.props.minVal,
    maxVal: this.props.maxVal,
  }

  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    // * Set up the hold/release triggers for this component
    this.channel = pusher.subscribe('nodes');
    this.channel.bind('hold', (data) => {
      if (this.props.id === data && !this.state.prime) {
        console.log(`A hold has been placed on ${data}`)
        this.setState({ hold: true, show: false }, () => console.log(this.state.hold))
      }
    });
    this.channel.bind('release', (data) => {
      if (data === this.props.id) {
        console.log(`${data} has been released from/for editing`)
        this.setState({ hold: false, prime: false })
      }
    });
    // * Checks if this factory currently has holds on it
    this.checkHolds(this.props.id)

    // * This will release any holds on this component's id in the event
    // * the browser/window/tab is closed before the edit form is closed
    // * This is not a perfect fix - the hold will be released regardless
    // * of whether or not a user cancels the page exit. I've researched
    // * on whether or not you can bind events to the leave and cancel
    // * buttons, but that seems to be a dead end - browsers don't want 
    // * to allow people to be potentially trapped indefinitely on the page,
    // * so this is the best solution I can think of at the present time.
    window.addEventListener("beforeunload", (e) => {
      console.log('Navigation type value, client X value, and client Y value: ')
      let dataPacket = {
        navigationType: e.currentTarget.performance.navigation.type
      }
      console.log(e.currentTarget.performance.navigation.type)
      if (window.event){
        console.log(window.event.clientX, window.event.clientY)
        dataPacket.clientX = window.event.clientX
        dataPacket.clientY = window.event.clientY
        if (window.event.clientX < 40 && window.event.clientY < 0) {
          // Back Button
        } else {
          // Refresh Button
        }
      }

      API.logData(dataPacket)
      let releaseEdits = '';
      // Checks another user is 
      if (e.currentTarget.performance.navigation.type !== 1 || this.state.prime){
        releaseEdits = this.releaseHolds(this.props.id);
      } 
      (e || window.event).returnValue = releaseEdits; //Gecko + IE
      return releaseEdits;                            //Webkit, Safari, Chrome
    });
  }
  // *Helper function for the 'beforeunload' event to trigger a hold release quickly
  releaseHolds = (id) => { API.holdEdits(id, false).then(res => console.log(res)) };

  // *Helper function for checking if this child currently has a hold on it
  checkHolds = (id) => { API.checkHolds(id).then(res => console.log(res.data)) }

  handleInputChange = (e) => {
    // Destructure the name and value properties off of event.target and update the appropriate state
    const { name, value } = e.target;
    console.log("Child's Input")
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

  holdForm = (id, flag) => {
    if (flag === 'Release') {
      API.holdEdits(id, false).then(
        res => { console.log(res) }
      )
    } else {
      this.setState({ prime: flag ? true : false }, () => {
        API.holdEdits(id, flag).then(
          res => {
            console.log(res)
            // this.setState({hold: !flag})
          }
        )
      })
    }
  }

  submitEdits = () => {
    // * Validates that the basic factory criteria are met 
    let errors = [], proceed = false
    let firstLetter = parseInt(this.state.name.slice(0, 1), 10)
    //console.log(this.state.name.length, firstLetter, isNaN(firstLetter))
    console.log(this.state.minVal, this.state.maxVal)
    // * Name Field Error message
    if (this.state.name.length === 0 || firstLetter) { errors.push(`* Name Field: Please make sure that the Name field is not blank and that the new Name begins with a letter`) };
    // * Min Value Field Error message
    if (!this.state.minVal || this.state.minVal < 1) { errors.push(`* Minimum Value Field: Please make sure that you have entered an integer value greater than 0. If you would like to leave the Minimum Value unchanged from its original state, please manually enter ${this.props.minVal}.`) };
    // * Max Value Field Error message
    if (!this.state.maxVal || (this.state.minVal && this.state.maxVal < this.state.minVal)) {
      errors.push(`* Maximum Value Field: \n- If you edited the Minimum Value, please make sure that you have entered an integer value greater than the new Minimum Value of ${this.state.minVal}. Otherwise select an integer greater than ${this.props.minVal}. \n- If you would like to leave the Maximum Value unchanged from its original state, please manually enter ${this.props.maxVal}.`);
    }
    // * Sends error alert or allows function to proceed
    if (errors.length > 0) {
      let message = "\n"
      errors.forEach(val => { message += `${val}\n--------------------------------------\n` })
      alert(`You have errors in one or more of the following fields: ${message}`)
    } else { proceed = true }
    // * If the 'proceed' flag is truthy, the type of edit will be identified and the data
    // * will be passed back to Main.js for processing with the API (needs access to the 
    // * generateGrndchldn method)
    if (proceed) {
      let newData = {
        id: this.props.id,
        name: this.state.name,
        minVal: this.state.minVal,
        maxVal: this.state.maxVal,
        editType: '',
        numGrandChildren: this.props.numKids,
      }
      // * Checks if all fields have been edited, indicates a full factory edit 
      console.log(this.props.name, this.props.minVal, this.props.maxVal)
      if (newData.name !== this.props.name) { newData.editType += 'name' }
      if (newData.minVal !== this.props.minVal) { newData.editType += 'range' }
      if (newData.maxVal !== this.props.maxVal) { newData.editType += 'range' };
      if (newData.editType === 'namerange' || newData.editType === 'namerangerange') {
        newData.editType = 'both'
      }
      console.log(newData)
      // console.log(newData.editType)
      this.props.handleNodeEdit(newData)
      this.setState({ show: false })
      // * Note, the holdForm route requires both params to be not null, so a dummy string for
      // * the id param has to be passed in
      this.holdForm(this.props.id, 'Release')
    } else { console.log('There was an error; please fix before proceeding') }
  };

  render() {
    //console.log(this.state)
    let grandchildren = true;
    if (this.props.grandchildren.length === 0) {
      grandchildren = false
    }

    let show = this.state.show;
    //let disabledState = this.state.hold?'disabled':''
    var opts = {};
    if (this.state.hold) {
      opts['disabled'] = 'disabled'
    }

    // console.log(!this.state.hold)
    let multiClasses = {
      deleteBtn: ClassNames("deleteBtn", "inline", "btn"),
      editBtn: ClassNames("editBtn", "inline", "btn"),
      factName: ClassNames("factName inline")
    }

    return (
      <div className='childWrapper'>
        <div className="childHeader" value={this.props.numKids}>
          <div className="headerTitle">
            <div className='factName' key={this.props.id}>{this.props.name}</div>
            {this.state.hold ?
              <span>* Another user is currently editing this factory; editing is currently disabled </span>
              : null}
          </div>
          <div className="headerContent">
            <button className={multiClasses.editBtn}
              onClick={() => {
                show ? show = false : show = true; this.setState({ show: show }, () => {
                  this.holdForm(this.props.id, this.state.show)
                })
              }}
              disabled={this.state.hold}
            >
              {show ? <span>Close Editing Panel</span> : <span>Edit This Factory</span>}
            </button>

            {show ?
              <div className="editForm">
                <label htmlFor="childData.name">
                  <strong>NEW Factory Name</strong>
                </label>
                <input
                  className={"form-control"}
                  type="text"
                  value={this.state.name}
                  placeholder="Must begin with a minimum of one letter"
                  name="name"
                  onChange={this.handleInputChange}
                  required
                />
                <label htmlFor="minVal">
                  <strong>NEW Min Range Val</strong>
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={this.state.minVal}
                  placeholder="Any positive integer"
                  name="minVal"
                  onChange={this.handleInputChange}
                  required
                />
                <label htmlFor="maxVal">
                  <strong>NEW Max Range Val</strong>
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={this.state.maxVal}
                  placeholder="Any positive integer greater than the minimum"
                  name="maxVal"
                  onChange={this.handleInputChange}
                  required
                />
                <button
                  onClick={this.submitEdits}
                  type="submit"
                  className="btn btn-lg btn-danger"
                >
                  Submit
                </button>
                <button
                  className={multiClasses.deleteBtn}
                  onClick={() => {
                    // this.holdForm(this.props.id, 'Release')
                    this.props.handleDelete(this.props.id, true)
                  }}
                >X Delete Factory</button>
              </div>

              : null
            }
          </div>
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

};
export default ChildNode;