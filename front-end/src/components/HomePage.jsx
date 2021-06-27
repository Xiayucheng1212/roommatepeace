import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert, Navbar, Nav, NavbarBrand, NavItem, NavLink
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './HomePage.css';
import { getRoomname } from '../api/room';
import CreateRoom from "./CreateRoom.jsx";
import ShowRoom from "./ShowRoom.jsx";
export default class HomePage extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        handleuserdata:PropTypes.func,
        handleIsLogged:PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            room_name:""
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
                <div className='container'>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand>
                            <div style={{fontWeight:'bolder'}}>
                                {this.state.room_name == ""?"RoommatePeace":this.state.room_name} &nbsp;&nbsp;
                                {this.props.user.room_id?this.props.user.room_id:""}
                            </div>
                        </NavbarBrand>
                        
                        <Nav navbar>
                            <NavItem>
                                <NavLink>Hello {this.props.user.name}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.handleIsLogged}>signOut</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                {
                    this.props.user.room_id == 0 ? 
                    <CreateRoom 
                        user={this.props.user}
                        handleuserdata={this.props.handleuserdata}/> : 
                    <ShowRoom 
                        user={this.props.user}
                        handleuserdata={this.props.handleuserdata}/>
                }
            </Router>
        );
    }
    async componentDidMount(){
        if(this.props.user.room_id == 0) return;
        const res = await getRoomname(this.props.user.room_id);
        console.log(res);
        this.setState({
            room_name:res.data.name
        })
    }
    
    handleUserRoom(){
        this.setState((state,props)=>{
            // return {
                
            // }
        })
    }

}
