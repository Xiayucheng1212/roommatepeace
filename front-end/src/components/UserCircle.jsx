import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserCircle.css';
import UserInfo from './UserInfo.jsx';
const position=[[0,0],[1,0.5],[0,1],[-1,0.5]];
const pi = Math.PI*2;
export default class UserCircle extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        index: PropTypes.number,
        userNum:PropTypes.number
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
                <div className="circle" onClick={this.handleClick} 
                    style={{
                        backgroundColor: this.props.user.color,
                        left:230+Math.cos((90-360*this.props.index/this.props.userNum)*pi/360)*120,
                        top:500+Math.sin((90-360*this.props.index/this.props.userNum)*pi/360)*120
                        // left:220+180*position[this.props.index][0],
                        // top:300+180*position[this.props.index][1]
                    }}>
                    {/*  name */}
                    <div className="name">
                        <UserInfo user={this.props.user} mainuser={this.props.mainuser}/>
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