import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Modal } from "react-bootstrap";
import { /*Col,*/ Row, Container } from "../../components/Grid";
import { RootNode } from "../../components/Nodes";
import ChildNode from "../../components/Nodes/ChildNode";
import CustomForm from "../../components/Form";
import Pusher from 'pusher-js'

const pusher = new Pusher('651f8f2fd68d8e9f1ab0', {
  cluster: 'mt1',
  forceTLS: true
});

class MainPage extends Component {
  // type, name, parent,value
  state = {
    editnodes: [],
    rawnodes: [],
    nodes: [],
    show: false,
    showNameEdit: false,
    showChildEdit: false,
    childName: "",
    numGrandChildren: null,
    minVal: null,
    maxVal: null,
    errorFields: [],
    sampleData: {
      numGrandChildren: 3,
      newName: 'Updatarooney',
      minVal: 22,
      maxVal: 5800,
      nodetype: 'child',
      parent: null,
      name: 'Test Entry',
      value: null
    }
  };



  //==============================================================
  //==============================================================
  // Component Mounting Functions
  //==============================================================

  componentWillMount() {
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalShow = this.handleModalShow.bind(this)
    // this.handleInputChange = this.handleInputChange.bind(this)
  }

  // Initial load of saved items
  componentDidMount() {
    this.channel = pusher.subscribe('nodes');

    this.channel.bind('insert', (data) => { this.pushData(data) });
    this.channel.bind('deleted', (data) => { this.loadNodeData() })
    this.channel.bind('reparse', () => { this.loadNodeData() })
    this.loadNodeData();
  };

  // =============================================================
  //  Pusher Data Read/Write Functions
  // ============================================================= 

  // Function to take newly inserted data and push it to the rawnodes in the state
  pushData = (data) => {
    // * Logs out the data returned from the Pusher trigger on the server
    //console.log(typeof data); console.log(data)
    this.setState(prevState => ({ rawnodes: prevState.rawnodes.concat(data) }), () => {
      // * Check the state of the rawnodes obj in the state
      console.log(this.state.rawnodes)
    })
  }

  // Small helper function for the remove and update functions
  check = (item, id) => {
    let pass = true;
    if (item._id === id || item.parent === id) {
      pass = false
    }
    return pass
  }


  // !!!!!!DO I EVEN NEED THIS HERE!!!!!!!!!
  // Function to take deleted data and remove it from the rawnodes object in the state
  removeData = (data) => {
    let rawnodes = this.state.rawnodes;

    let exraw = rawnodes.filter(el => this.check(el, data._id))
    console.log(data)
    console.log(exraw)
    // this.setState(prevState=>({
    //     editnodes:prevState.editnodes.concat(data._id)
    //   }),()=>{
    //     console.log(this.state.editnodes)
    //   })
    // this.setState(prevState => ({
    //   rawnodes: prevState.tasks.filter(el => this.check(el, id))
    // },()=>{
    //   console.log(this.state.rawnodes)
    // }));
  }


  // =============================================================
  //  DB Read/Write Functions
  // =============================================================
  loadNodeData = () => {
    API.getNodeData()
      .then(
        res => {
          // console.log("test data: " + JSON.stringify(res.data, null, 2))
          this.setState({ rawnodes: res.data }, () => {
            this.parseNodes(this.state.rawnodes);
          })
        })
      .catch(err => console.log(err));
  };

  postNodes = (nodes, grandkids) => {
    console.log(nodes)
    API.saveNode({ nodes: nodes, newCycle: grandkids })
      .then(res => {
        console.log(res)
        if (grandkids) {
          this.generateGrndchld(res.data._id)
        } else {
          //console.log(this.state.rawnodes)
          // this.loadNodeData()
        }
      })
      .catch(err => console.log(err))
  }

  // * Deletes entire factory (child node and grand children)
  deleteWhole = (id) => {
    console.log(`Started the deletion process on id ${id}`)
    API.deleteWhole(id)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  changeNode = (newData) => {
    let id = newData.id
    // newData = {newName:----, minVal:...., maxVal.....}
    console.log(`Started the editing process on id ${id} to change the name to ${newData.name}`)
    
    if(newData.editType==='name'){
      API.editNodeName(newData).then(
        res => {
          console.log(res);
          res => {
            console.log(res);
            this.setState({ childName: '' }, () => {
              this.loadNodeData();
            })
          }
        }
      )
    }
    
    API.editNodeName(newData).then(
      res => {
        console.log(res);
        res => {
          console.log(res);
          this.setState({ childName: '' }, () => {
            // this.loadNodeData();
          })
        }
      }
    )
  }

  changeNodeChildren = (id) => {
    console.log(`Started the deletion process on id ${id}`)
    API.deleteMany(id).then(res => {
      console.log(res)
      this.generateGrndchld(id)
    })
  }
  // =============================================================
  //  Data Manipulation Functions
  // =============================================================
  // * Builds a new child node to seed the root node
  sendNode = () => {
    //this.postNodes(this.state.sampleData)
    console.log('sending node')
    let newNode = {
      nodetype: 'child',
      parent: null,
      name: this.state.childName,
      value: null
    }
    this.postNodes(newNode, true)
  }

  // * Builds an array of grandchildren nodes 
  generateGrndchld = (id, parent) => {
    // console.log(id)
    let x = this.state.numGrandChildren
    let min = this.state.minVal
    let max = this.state.maxVal
    let grandkids = [];
    console.log(x, min, max)
    let generateVal = (min, max) => {
      min = parseInt(min, 10)
      max = parseInt(max, 10)
      let res = Math.floor(Math.random() * max) + min
      console.log(res)
      return res
    }

    for (let i = 0; i < x; i++) {
      let grandkid = {
        nodetype: 'grandchild',
        parent: id,
        value: generateVal(min, max),
        name: null,
        minVal: null,
        maxVal: null
      };
      grandkids.push(grandkid);
    }
    console.log(grandkids)
    this.postNodes(grandkids, false)
  }

  // * Removes deleted nodes from rawnode state
  removeNodes = (id, whole) => {
    // * If whole is truthy, it will remove nodes with either _id -or- parent equal to 
    // * id parameter (for factory deletion), else it will remove nodes with parent 
    // * equal to id (for factory range updates)
    if (whole) {
      let newraw = this.state.rawnodes.filter((node) => {
        let pass = true;
        if (node._id === id || node.parent === id) {pass=false}
        return pass
      })
      console.log(newraw)
      this.setState({
        rawnodes:newraw
      }, () => {
        this.deleteWhole(id)
      })
    } else {

    }
  }

  parseNodes = (data) => {
    let newnodes = [];
    console.log(data)
    data.forEach((item, index) => {
      if (item.nodetype === "child") {
        let child = {
          name: item.name,
          parent: 'rootNode',
          id: item._id,
          grandchildren: [],
          minVal: item.minVal,
          maxVal: item.maxVal,
        }
        data.forEach((sub, ind) => {
          // sets a range limit on incdeces to speed up processing in large datasets
          if (ind >= index - 20 && ind <= index + 20) {
            if (sub.nodetype === "grandchild" && child.id === sub.parent) {
              console.log("We found a grandchild!")
              let grandchild = {
                name: sub.name,
                parent: sub.parent,
                id: sub._id,
                value: sub.value
              }
              child.grandchildren.push(grandchild)
              // data.splice(ind,1)
            }
          }
        })
        newnodes.push(child)
      }
    })

    this.setState({ nodes: newnodes, show: false, showNameEdit: false, showChildEdit: false })
  }

  // =============================================================
  //  Form, Input, and Modal Manipulation Functions
  // =============================================================
  handleModalClose(e) {
    this.setState({
      show: false,
      showNameEdit: false,
      showChildEdit: false,
      childName: "",
      numGrandChildren: null,
      minVal: null,
      maxVal: null
    })
  }

  handleModalShow() {
    this.setState({ show: true });
  }

  // handle form input
  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    // console.log(name, value, typeof value)
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
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Submission heard")
    let count = 0;
    let errorFields = [];
    console.log(count, errorFields)
    if (this.state.childName.length > 0 && isNaN(this.state.childName)) {
      count++;
    } else { errorFields.push('Factory Name') }
    if (this.state.numGrandChildren > 0 && this.state.numGrandChildren < 16) {
      count++;
    } else { errorFields.push('Number of Nodes') }
    if (this.state.minVal > 0 && !isNaN(this.state.minVal)) {
      count++;
    } else { errorFields.push('Min Range Val') }
    if (this.state.maxVal > 0 && this.state.maxVal > this.state.minVal && !isNaN(this.state.maxVal)) {
      count++;
    } else { errorFields.push('Max Range Val') }
    console.log(count, errorFields)
    if (count === 4) {
      let newNode = {
        nodetype: 'child',
        parent: null,
        name: this.state.childName,
        value: null,
        minVal: this.state.minVal,
        maxVal: this.state.maxVal
      }
      this.postNodes(newNode, true);
    } else {
      let message = "\n"
      errorFields.forEach(val => {
        message += `* ${val}\n`
      })
      alert(`You have errors in one or more of the following fields: ${message}`)
    }

  }

  // Handles factory Name edits and form validation
  handleNodeEdit = (data) => {
    console.log(data)
    // e.preventDefault();
    // console.log(data.id)
    // let count = 0;
    // let errorFields = this.state.errorFields
    // if (this.state.childName.length > 0 && isNaN(this.state.childName)) {
    //   count++;
    // } else { errorFields.push('Factory Name') }
    // if (count === 1) {
    //   this.changeNode(data.id, this.state.childName)
    // } else {
    //   let message = "\n"
    //   errorFields.forEach(val => {
    //     message += `* ${val}\n`
    //   })
    //   alert(`You have errors in one or more of the following fields: ${message}`)
    // }
  }
  // This is the function that renders the page in the client's window.
  render() {

    let children = false;
    if (this.state.nodes.length > 0) {
      children = true;
    }

    return (
      <Container fluid>
        {/* <Row>
          <Nav2 user={this.state.profile} auth={this.props.auth} />
        </Row> */}
        <Row>
          <Jumbotron>
            <h1> Hello! Time to get Coding! </h1>
          </Jumbotron>
        </Row>
        <Row>
          <button className="primary" onClick={this.handleModalShow}>New Factory</button>
          {/* <button className="primary" onClick={this.sendNode}>Send Sample Data</button> */}
          <Modal show={this.state.show} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CustomForm
                errors={this.state.errorFields}
                handleInputChange={this.handleInputChange}
                name={this.state.childName}
                number={this.state.numChildren}
                minVal={this.state.minValue}
                maxVal={this.state.maxValue}
                handleModalClose={this.handleModalClose}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </Row>
        <Row>

          <RootNode id="rootNode">
            {children ?
              this.state.nodes.map(item => {
                return (<ChildNode
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  grandchildren={item.grandchildren}
                  parent={item.parent}
                  handleDelete={this.removeNodes}
                  handleNodeEdit={this.changeNode}
                  numKids={item.grandchildren.length}
                  minVal={item.minVal}
                  maxVal={item.maxVal}
                >
                </ChildNode>
                )
              }) : <h4>No Children to Display</h4>
            }
          </RootNode>
        </Row>
      </Container >
    );
  }
}

export default MainPage;
