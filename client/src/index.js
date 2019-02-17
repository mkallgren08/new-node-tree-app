// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {makeMainRoutes} from "./routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faAngleDoubleLeft,faAngleDoubleRight,faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo,faAngleDoubleLeft,faAngleDoubleRight,faInfoCircle)

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root'));

