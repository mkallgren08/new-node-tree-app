import axios from "axios";

export default {
  //Gets all nodes
  getNodeData: function () {
    return axios.get("/api/nodes")
  },
  //Get all animals
  getBiodiversity: function () {
    return axios.get("/api/biodiversity")
  },

  // Edits a node with the given id
  editNode: function (id, nodeData) {
    return axios.post("/api/edit/" + id, nodeData);
  },
  // Deletes many entries at once
  deleteMany: function (id) {
    return axios.delete("/api/deleteMany/" + id);
  },
  // Deletes the node with the given id
  deleteNode: function (id) {
    return axios.delete("/api/delete/" + id);
  },
  // Saves a node to the database
  saveNode: function (nodeData) {
    return axios.post("/api/new", nodeData);
  },
  // Saves multiple nodes to the database
  saveNodes: function (nodeData) {
    return axios.post("/api/new/many", nodeData);
  }
};
