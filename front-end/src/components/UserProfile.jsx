import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert
} from 'reactstrap';

import './UserProfile.css';
import {PropTypes} from 'prop-types';

export default class UserProfile extends React.Component {
    static propTypes = {
        user:PropTypes.object,
        location: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <Router>
                <div className="position-absolute top-50 start-50 translate-middle userProfile">
                    hello userProfile
                </div>
            </Router>
        );
    }
}
