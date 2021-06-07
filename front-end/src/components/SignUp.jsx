import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import './SignUp.css';

import {} from '../api/users';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };

      
    }

    render() {
        return (
            <Router>
                <div className="main ">
                    {/* TODO: signUp form */}
                    hello signUp
                </div>
            </Router>
        );
    }


}
