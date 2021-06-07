import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import './Login.css';

import {} from '../api/users';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };

      
    }

    render() {
        return (
            <Router>
                <div className="main ">
                    hello login
                </div>
            </Router>
        );
    }


}
