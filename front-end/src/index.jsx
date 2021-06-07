import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect ,Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App.jsx';

window.onload = function() {

    ReactDOM.render(
        <App/> ,
        document.getElementById('root')
    );
};
