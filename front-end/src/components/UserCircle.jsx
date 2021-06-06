import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserCircle.css';

export default class UserCircle extends React.Component {
    static propTypes = {
        user: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
            
        };

        
    }

    render() {
        return (
            <Router>
                <div className="circle">
                    {/*  name */}
                    <div className="name">
                        <Alert color="danger">
                           {/* TODO */}
                            {this.props.user.user_name}
                        </Alert>
                    </div>
                    {/*  state */}
                    <div className="state">
                        <Alert color="danger">
                           {/* TODO */}
                           {this.props.user.state}
                        </Alert>
                    </div>
                </div>
            </Router>
        );
    }

}