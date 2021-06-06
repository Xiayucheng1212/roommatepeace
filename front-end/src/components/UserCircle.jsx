import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {

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
                    {this.props.user.name}
                </div>
            </Router>
        );
    }

}