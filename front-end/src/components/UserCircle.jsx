import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserCircle.css';
import UserInfo from './UserInfo.jsx';
const pi = Math.PI*2;
export default class UserCircle extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        index: PropTypes.number,
        userNum: PropTypes.number
    };
    constructor(props) {
        super(props);

        this.state = {
            userInfoToggle: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <Router> 
                <div className={this.state.mouseEnterClass ? "circle-big" : "circle"} onClick={this.handleClick}
                    style={{
                        backgroundColor: this.props.user.color,
                        left:document.body.clientWidth/2-80+Math.cos((90-360*this.props.index/this.props.userNum)*pi/360)*100,
                        top:document.body.clientHeight/2-80+Math.sin((90-360*this.props.index/this.props.userNum)*pi/360)*100
                    }}>
                    <div className="name">
                        <h4> {this.props.user.name} </h4>
                    </div>
                    <UserInfo user={this.props.user} mainuser={this.props.mainuser} 
                        toggle={this.state.userInfoToggle} handleClick={this.handleClick} />
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
        this.setState((state, props) => {
            return {
                userInfoToggle: !state.userInfoToggle
            }
        })
    }
}