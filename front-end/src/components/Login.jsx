import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Alert
} from 'reactstrap';

import './Login.css';
import {PropTypes} from 'prop-types';
import {checkLogin} from '../api/islog.js';

export default class Login extends React.Component {
    static propTypes = {
        handleuserdata: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            isLogged:props.isLogged,
            password:NaN,
            email: NaN
        };

        this.checkIsLoggin = this.checkIsLoggin.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    render() {
        return (
            <Router>
                <div className="main ">
                    hello login
                </div>
                <button onClick={this.handleEmail}>Email</button>
                <button onClick={this.handlePassword}>Password</button>
                <button onClick={this.checkIsLoggin}>send login</button>
            </Router>
        );
    }
    async handleEmail(e){
        console.log(e);
        this.setState({email:'123123@gmail.com'});
    }
    async handlePassword(e){
        this.setState({password:'qwer'});
    }

    checkIsLoggin(){
        console.log(this.email,this.password);
        if(!this.props.isLogged){
            checkLogin("123123@gmail.com","qwer").then(user=>{
                console.log(user);
                this.setState(()=>this.handleuserdata(user));
            })
        }
    }
    handleuserdata(user){
        console.log(user);
        this.props.handleuserdata(user);    
    }
}
