import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,Button,
    Alert
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './ShowRoom.css';
import UserCircle from './UserCircle.jsx';
import UserProfile from './UserProfile.jsx';
import WriteComplain from './WriteComplain.jsx';
import WriteNotification from './WriteNotification.jsx';
import Complain from './Complain.jsx';
import {getUsers,getSingleUser} from '../api/users';
import {getroomnotification} from '../api/notifications';
import {getcomplain} from '../api/complains';
export default class ShowRoom extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        handleuserdata: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            notificationNum: 0,
            complainNum:0,
            notifications:[],
            userNum: 1,
            roommates: [],
            complains: [],
            notificationToggle: false,
            userProfileToggle: false,
            complainToggle: false,
            writeComplainToggle: false,
            writeNotificationToggle: false
            // main_user:[],
            
        };

        this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
        this.handleComplainToggle = this.handleComplainToggle.bind(this);
        this.handleUserProfileToggle = this.handleUserProfileToggle.bind(this);
        this.handleWriteComplainToggle = this.handleWriteComplainToggle.bind(this);
        this.handleWriteNotificationToggle = this.handleWriteNotificationToggle.bind(this);
    }

    render() {
        var UserProfilePath = {
            pathname:'/userProfile',
            state:{
                message: "hello worllllllllld"
            }
        }
        var complain = {

        }
        return (
            <Router>
                <div className="main ">
                    {/* notification */}
                    <div className="container">
                        <ButtonDropdown isOpen={this.state.notificationToggle} toggle={this.handleNotificationToggle}>
                            <DropdownToggle caret color="#ffffff">
                            
                               {
                                   this.state.notificationNum > 0 &&
                                   this.state.notifications[0].text
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    this.state.notificationNum >= 1 &&
                                    this.state.notifications.map((item,index)=>{
                                        if(index >= 1){
                                            return (<DropdownItem>{item.text}</DropdownItem>)
                                        }
                                    })
                                }
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    {/*  complain */}
                    <div className="container">
                        {/* TODO */}
                        <Alert color={this.state.complainNum!=0?"danger":"success"} onClick={this.handleComplainToggle}>
                            {
                                (this.state.complainNum != 0)?"This is a danger alert — check it out!":"Have a nice day!"
                            }
                        </Alert>
                        
                    </div>
                    {/* roommates */}
                    <div className="container roommates">
                        {
                            this.state.roommates.map((item, index)=>{
                                console.log(this.state.userNum);
                                console.log("ppp");
                                return(
                                    <UserCircle user={item} index={index+1} 
                                        userNum={this.state.userNum} mainuser={this.props.user}/>
                                )
                            })
                        }
                        <UserCircle user={this.props.user} index={0}
                                        userNum={this.state.userNum} mainuser={this.props.user}/>
                    </div>
                    {/* profile and write */}
                    <div className="container foot">
                        
                        <span className="write" onClick={this.handleWriteComplainToggle} style={{backgroundColor:this.props.user.color}}>
                            <img class="profileIcon" src="images/pencil.png" alt="" />
                            <div className="word">Complain</div>
                        </span>
                        <span className="profile" onClick={this.handleUserProfileToggle} style={{backgroundColor:this.props.user.color}}>
                            <img class="profileIcon" src="images/user.png" alt="" />
                            <div className="word">Profile</div>
                        </span>
                        <span className="write" onClick={this.handleWriteNotificationToggle} style={{backgroundColor:this.props.user.color}}> 
                            <img class="profileIcon" src="images/notification.png" alt="" />
                            <div className="word">Notification</div>
                        </span>
                    </div>
                    <UserProfile handleUserProfileToggle={this.handleUserProfileToggle} userProfileToggle={this.state.userProfileToggle}  user={this.props.user} handleuserdata={this.props.handleuserdata} />
                    <WriteComplain handleWriteComplainToggle={this.handleWriteComplainToggle} writeComplainToggle={this.state.writeComplainToggle} user={this.props.user} roommates={this.state.roommates} />
                    <WriteNotification handleWriteNotificationToggle={this.handleWriteNotificationToggle} writeNotificationToggle={this.state.writeNotificationToggle} user={this.props.user} />
                    <Complain handleComplainToggle={this.handleComplainToggle} complainToggle={this.state.complainToggle} complain={this.state.complain} />
                </div>
            </Router>
        );
    }

    handleNotificationToggle() {
        this.setState((state, props) => {
            return {
                notificationToggle: !state.notificationToggle
            }
        })
    }
    handleWriteNotificationToggle() {
        console.log("lll");
        this.setState((state, props) => {
            return {
                writeNotificationToggle: !state.writeNotificationToggle
            }
        })
    }

    handleComplainToggle() {
        console.log("OOOO");
        if(this.state.complainNum == 0) return ;
        this.setState((state, props) => {
            return {
                complainToggle: !state.complainToggle
            }
        })
    }

    handleUserProfileToggle(){
        console.log(1123123);
        this.setState((state, props) => {
            return {
                userProfileToggle: !state.userProfileToggle
            }
        })
    }
    handleWriteComplainToggle() {
        this.setState((state, props) => {
            return {
                writeComplainToggle: !state.writeComplainToggle
            }
        })
    }

    async componentDidMount(){
        const res = await getUsers(this.props.user.room_id);
        //    const res1 = await getSingleUser(3);
        const notifications = await getroomnotification(this.props.user.room_id);
        const complain = await getcomplain(this.props.user.id);
        // console.log(complain);
        const roommates = res.data.filter((item)=>{
            if(item.id != this.props.user.id){
                return true;
            }
        })
        // console.log(roommates);
        this.setState({
            roommates: roommates,
            notifications: notifications.data,
            notificationNum: notifications.data.length,
            complain: complain.data,
            complainNum :complain.data.length,
            userNum: roommates.length+1
        })
        // console.log(this.state.userNum);
    }
}
