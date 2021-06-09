import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserCircle.css';
import UserInfo from './UserInfo.jsx';

export default class UserCircle extends React.Component {
    static propTypes = {
        user: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
            
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <Router>
                <div className="circle" onClick={this.handleClick}>
                    {/*  name */}
                    <div className="name">
                        <UserInfo user={this.props.user}/>
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

    handleClick(){
        
    }
}