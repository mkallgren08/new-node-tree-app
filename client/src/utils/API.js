import axios from "axios";

export default {
  //Gets all nodes
  getNodeData: function(){
    return axios.get("/api/nodes")
  },
  //Get all animals
  getBiodiversity: function(){
    return axios.get("/api/biodiversity")
  },

  // Edits a node with the given id
  editNodeName: function(nodeData) { 
    return axios.post("/api/editName/" + nodeData.id, nodeData);
  },
  // Deletes entire factory at once
  deleteWhole: function(id) {
    return axios.delete("/api/deleteWhole/" + id);
  },
  // Deletes the grandchild nodes of the child/factory with the given id
  deleteGrandkids: function(id) {
    return axios.delete("/api/delete/" + id);
  },
  // Saves a node to the database
  saveNode: function(nodeData) {
    return axios.post("/api/new", nodeData);
  }
};
