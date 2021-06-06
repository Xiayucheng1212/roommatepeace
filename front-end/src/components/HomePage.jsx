import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import './HomePage.css';
import UserCircle from './UserCircle.jsx';
import {getUsers,getSingleUser} from '../api/users';

export default class HomePage extends React.Component {
    constructor(props) {


        super(props);

        this.state = {
            notificationNum: 0,
            userNum: 0,
            users: [],
            complains: [],
            notificationToggle: false,
            complainToggle: false,
            main_user:[]
        };

        this.handleNotificationToggle = this.handleNotificationToggle.bind(this);
        this.handleComplainToggle = this.handleComplainToggle(this);
    }

    render() {
        return (
            <Router>
                <div className="main ">
                    {/* notification */}
                    <div className="container">
                        <ButtonDropdown isOpen={this.state.notificationToggle} toggle={this.handleNotificationToggle}>
                            <DropdownToggle caret color="#ffffff">
                                Notifications
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Header</DropdownItem>
                                <DropdownItem disabled>Action</DropdownItem>
                                <DropdownItem>Another Action</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Another Action</DropdownItem>
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
                            this.state.users.map((item, index)=>{
                                console.log(item);
                                return(
                                    <UserCircle user={item}/>
                                )
                            })
                        }
                    </div>
                    {/* profile and write */}
                    <div classname="container profile write">
                        <div classname="profile">
                            {this.state.main_user.photo}
                        </div>
                        <div classname="write">

                        </div>
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
       const res = await getUsers(0);
       const res1 = await getSingleUser(3);
       this.setState({
           users: res.data,
           main_user: res1.data
       })
    //    console.log(res);
        // console.log(res1);
    }


}
