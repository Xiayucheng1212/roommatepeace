import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './HomePage.css';
import {createRoom} from "../api/room.js"
import {updateUserRoom} from "../api/users.js"
export default class CreateRoom extends React.Component{
    static propTypes = {
        user: PropTypes.object,
        handleuserdata:PropTypes.func,
    };
    constructor(props){
        super(props);
        this.state = {
            room_id:0,
            name:""
        }
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleEnterRoom = this.handleEnterRoom.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.handleRoomid =  this.handleRoomid.bind(this);
    }

    render(){
        return (
            <Router>
                <div className="form">
                    <div className="CreateRoom">
                        <h2>CreateRoom</h2>
                        <InputGroup>
                            <Input type="text" name="name" onChange={this.handleRoomName}/>
                            <InputGroupAddon addonType="append"><Button  color="secondary" onClick={this.handleCreateRoom}>Create</Button></InputGroupAddon>
                        </InputGroup>
                    </div>
                    <br/>
                    <div className="EnterRoom">
                        <h2>EnterRoom</h2>
                        <InputGroup>
                            <Input type="number" name="room_id" onChange={this.handleRoomid}/>
                            <InputGroupAddon addonType="append"><Button color="secondary" onClick={this.handleEnterRoom}>Enter</Button></InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
            </Router>
        );
    }
    handleRoomName(e){
        this.setState({name:e.target.value});
    }
    handleRoomid(e){
        this.setState({room_id:e.target.value});
    }
    handleEnterRoom(){
        updateUserRoom(this.props.user.id,this.state.room_id).then(user=>{
            // console.log(user);
            // console.log("ppppp");
            this.props.handleuserdata(user.data);
        })
    }
    handleCreateRoom(event){
        // console.log(this.props.name,this.props.email,this.props.password,this.props.color,this.props.reminder);
        event.preventDefault();
        createRoom(this.state.name).then(room=>{
            // window.history.back();            
            this.setState({
                room_id: room.data.id
            },()=>{
                // console.log(this.state.room_id);
                // console.log("fuckk");
                // console.log(this.props.user.data[0].id);
                // event.preventDefault()
                updateUserRoom(this.props.user.id,room.data.id).then(user=>{
                    // console.log(user);
                    // console.log("ppppp");
                    this.props.handleuserdata(user.data);
                })
            });
        })
    }
}