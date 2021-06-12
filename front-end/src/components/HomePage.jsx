import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './HomePage.css';
import CreateRoom from "./CreateRoom.jsx";
import ShowRoom from "./ShowRoom.jsx";
export default class HomePage extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        handleuserdata:PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleUserRoom = this.handleUserRoom.bind(this);
    }

    render() {
        var UserProfilePath = {
            pathname:'/userProfile',
            state:{
                message: "hello worllllllllld"
            }
        }
        return (
            <Router>
                <div>hello</div>
                {/* <ShowRoom user={this.props.user}/> */}
                {
                    this.props.user.room_id == 0 ? 
                    <CreateRoom 
                        user={this.props.user}
                        handleuserdata={this.props.handleuserdata}/> : 
                    <ShowRoom 
                        user={this.props.user}/>
                }
            </Router>
        );
    }

    
    handleUserRoom(){
        this.setState((state,props)=>{
            console.log("oOOOOOOO");
            // return {
                
            // }
        })
    }

}
