import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './HomePage.css';
import UserCircle from './UserCircle.jsx';
import UserProfile from './UserProfile.jsx';
import {getUsers,getSingleUser} from '../api/users';
import {getroomnotification} from '../api/notifications';
export default class HomePage extends React.Component {
    static propTypes = {
        user: PropTypes.object,
    };
    constructor(props) {
        super(props);

        this.state = {
            notificationNum: 0,
            notifications:[],
            userNum: 0,
            roommates: [],
            complains: [],
            notificationToggle: false,
            complainToggle: false,
            userProfileToggle: false,
            // main_user:[],
            
        };

        this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
        this.handleComplainToggle = this.handleComplainToggle(this);
        this.writeConsole = this.writeConsole.bind(this)
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
                            <Alert color="danger" onClick={this.handleComplainToggle}>
                               {/* TODO */}
                                This is a danger alert — check it out!
                            </Alert>
                        </div>
                        {/* roommates */}
                        <div className="container roommates">
                            
                            {
                                this.state.roommates.map((item, index)=>{
                                    console.log(item);
                                    return(
                                        <UserCircle user={item}/>
                                    )
                                })
                            }
                        </div>
                        {/* profile and write */}
                        <div className="container foot">
                            <span className="profile" onClick={this.writeConsole}>
                                <img class="profileIcon" src="images/user.png" alt=""/>
                            </span>
                            <span className="write">
                                
                            </span>
                        </div>
                        <UserProfile  userProfileToggle={this.state.userProfileToggle} user={this.props.user} />
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

    writeConsole() {
        this.setState((state, props) => {
            return {
                userProfileToggle: !state.userProfileToggle
            }
        })
    }
    handleComplainToggle() {
        this.setState((state, props) => {
            return {
                complainToggle: !state.complainToggle
            }
        })
    }

    async componentDidMount(){
       const res = await getUsers(1);
       const res1 = await getSingleUser(3);
       const notifications = await getroomnotification(1);
    // console.log(this.props.user.data[0].room_id);
    //    const res = await getUsers(this.props.user.data[0].room_id);
    //    const notifications = await getroomnotification(this.props.user.data[0].room_id);
       this.setState({
           roommates: res.data,
           notifications: notifications.data,
           notificationNum: notifications.data.length,
       })
    }


}
