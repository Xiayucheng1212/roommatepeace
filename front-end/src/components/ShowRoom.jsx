import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';
import {PropTypes} from 'prop-types';
import './ShowRoom.css';
import UserCircle from './UserCircle.jsx';
import {getUsers,getSingleUser} from '../api/users';
import {getroomnotification} from '../api/notifications';
export default class ShowRoom extends React.Component {
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
            // main_user:[],
            
        };

        this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
        this.handleComplainToggle = this.handleComplainToggle(this);
    }

    render() {
        return (
            <Router>
                <div>hello</div>
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
                        <span className="profile">
                            {this.props.user.photo}
                        </span>
                        <span className="write">
                            
                        </span>
                    </div>
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

    handleComplainToggle() {
        this.setState((state, props) => {
            return {
                complainToggle: !state.complainToggle
            }
        })
    }

    async componentDidMount(){
        console.log(this.props.user.room_id);
        console.log("eeeeeee");
        const res = await getUsers(this.props.user.room_id);
        //    const res1 = await getSingleUser(3);
        const notifications = await getroomnotification(this.props.user.room_id);
            this.setState({
            roommates: res.data,
            notifications: notifications.data,
            notificationNum: notifications.data.length,
        })
    }


}
