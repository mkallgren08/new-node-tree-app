import axios from "axios";

export default {
  //Gets all nodes
  getNodeData: function(){
    return axios.get("/api/nodes")
  },
  // Edits the name of the node with the given id
  editNodeName: function(nodeData) { 
    return axios.post("/api/editName/" + nodeData.id, nodeData);
  },
  // Deletes entire factory at once
  deleteWhole: function(id) {
    return axios.delete("/api/deleteWhole/" + id);
  },
  // Deletes the grandchild nodes of the child/factory with the given id
  deleteGrandkids: function(nodeData) {
    console.log(nodeData)
    return axios.delete(`/api/delete/${nodeData.id}/${nodeData.minVal}/${nodeData.maxVal}/${nodeData.name}`);
  },
  // Saves a node to the database
  saveNode: function(nodeData) {
    return axios.post("/api/new", nodeData);
  },
  //Holds form editing on all clients except the local client
  holdEdits: function(id, flag){
    return axios.post(`api/hold/${id}`, {val:flag});
  }
};