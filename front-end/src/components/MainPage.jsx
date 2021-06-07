import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import {PropTypes} from 'prop-types';
import './MainPage.css';

import { } from '../api/users';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

export default class MainPage extends React.Component {
    static propTypes = {
        handleIsLogged: PropTypes.func,
        isLogged: PropTypes.bool
    };


    constructor(props) {
        super(props);

        this.state = {
            user_id: 0,
            room_id: 0,
        };


    }

    render() {
        return (
            <Router>
                <div className="main ">

                    <button onClick={this.props.handleIsLogged}>hiiiiiiiii</button>
                    <Link to="/login" >login</Link>
                    <Link to="/signUp">signUp</Link>

                    <div className="container">
                        <Switch>
                            <Route
                                exact
                                path="/login"
                                component={Login}
                            />
                            {/* 完成驗證之後 傳送callback向上更新 */}
                            <Route path="/signUp" component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }




}
