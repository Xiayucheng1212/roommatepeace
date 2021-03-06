import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Alert
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserCircle.css';
import UserInfo from './UserInfo.jsx';
const pi = Math.PI * 2;
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
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <Router>
                <div className={`${this.state.mouseEnterClass ? "circle-big" : "circle"} ${this.props.user.state == "not home" ? "not-at-home" : "at-home"}`}
                    onClick={this.handleOpen}
                    style={{
                        backgroundColor: this.props.user.color,
                        left:/*document.body.clientWidth*/this.state.width / 2 - 100 + Math.cos((90 - 360 * this.props.index / this.props.userNum) * pi / 360) * 100 + 8,
                        top:/*document.body.clientHeight*/this.state.height / 2 - 60 + Math.sin((90 - 360 * this.props.index / this.props.userNum) * pi / 360) * 100
                    }}>
                    <div className="userInfo">
                        <div className="name">
                        {this.props.user.user_name != undefined ? this.props.user.user_name : this.props.user.name}
                        </div>
                        <div className="state">
                            
                                {this.props.user.state}
                            
                        </div>
                    </div>
                    <UserInfo user={this.props.user} mainuser={this.props.mainuser}
                        toggle={this.state.userInfoToggle} handleClick={this.handleClick} />

                </div>
            </Router>
        );
    }
    async componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    async componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    handleOpen() {
        this.setState((state, props) => {
            return {
                userInfoToggle: true
            }
        })
    }
    handleClick() {
        this.setState((state, props) => {
            return {
                userInfoToggle: !state.userInfoToggle
            }
        })
    }
}