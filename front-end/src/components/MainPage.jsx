import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert, Navbar, Nav, NavbarBrand, NavItem, NavLink,Fade
} from 'reactstrap';

import {PropTypes} from 'prop-types';
import './MainPage.css';

import { } from '../api/users';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

export default class MainPage extends React.Component {
    static propTypes = {
        handleIsLogged: PropTypes.func,
        handleuserdata: PropTypes.func,
        isLogged: PropTypes.bool,
        user: PropTypes.object,
    };


    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    render() {
        // const [fadeIn, setFadeIn] = useState(false);
        // const toggle = () => setFadeIn(!fadeIn);
        return (
            <Router>
                <div className="main ">
                    <div className='container'>
                        <Navbar color="light" light expand="md">
                            <NavbarBrand >
                                RoommatePeace
                            </NavbarBrand>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/login" >login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/signUp" >signUp</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                        {this.props.isLogged == false?<img src="images/logo.png" alt="" />:""}
                    </div>
                    <div className="container">
                        <Switch>
                            <Route exact path="/login"
                                //component={Login}
                                render={()=>(
                                    <Login handleuserdata={this.props.handleuserdata} isLogged={this.props.isLogged}/>
                                )}
                            />
                            {/* 完成驗證之後 傳送callback向上更新 */}
                            <Route path="/signUp" 
                                //component={SignUp}
                                render={()=>(
                                    <SignUp handleuserdata={this.props.handleuserdata}/>
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }

}
