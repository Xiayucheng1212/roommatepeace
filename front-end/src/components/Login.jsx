import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Button, Form, FormGroup, Label, Input,Fade
} from 'reactstrap';

import './Login.css';
import {PropTypes} from 'prop-types';
import {checkLogin} from '../api/islog.js';

export default class Login extends React.Component {
    static propTypes = {
        handleuserdata: PropTypes.func,
        isLogged: PropTypes.bool,
    };
    constructor(props) {
        super(props);

        this.state = {
            isLogged:props.isLogged,
            password:NaN,
            email: NaN,
            isWrong:false
        };

        this.checkIsLoggin = this.checkIsLoggin.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    render() {
        return (
            <Router>
                <div className="Login">
                    <h2>Login</h2>
                <Form  className="form" inline onSubmit={this.checkIsLoggin}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.handleEmail} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" onChange={this.handlePassword} />
                    </FormGroup>
                    <Button>{this.state.isWrong?"Wrong!Login Again!":"Submit"}</Button>
                </Form>
                </div>
            </Router>
        );
    }
    handleEmail(e){
        // console.log(e);
        // console.log("wwwww");
        this.setState({
            isWrong:false,
            email:e.target.value});
    }
    handlePassword(e){
        this.setState({
            isWrong:false,
            password:e.target.value});
    }

    checkIsLoggin(event){
        event.preventDefault();

        if(!this.props.isLogged){
            checkLogin(this.state.email,this.state.password).then(user=>{

                if(user.data.length == 0){
                    this.setState({isWrong:true});
                    return ;
                }
                window.history.back();
                this.setState({
                    isWrong:false
                },()=>this.handleuserdata(user));
            })
        }
        // history.back();
    }
    handleuserdata(user){
        // console.log(user);
        this.props.handleuserdata(user.data[0]);    
    }
}
