import React from 'react';
import "./Nodes.css"


export const RootNode = (props) => 
  <div id={props.id}>
    <h3 className='rootNodeTitle'>Root Node</h3>
    {props.children}
  </div>