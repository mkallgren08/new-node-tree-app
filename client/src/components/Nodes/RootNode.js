import React from 'react';
import "./Nodes.css"


export const RootNode = (props) => 
  <div id={props.id}>
    <h3>This is the root node</h3>
    {props.children}
  </div>