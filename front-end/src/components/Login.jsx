import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Button, Form, FormGroup, Label, Input
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
                <Form inline onSubmit={this.checkIsLoggin}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.handleEmail} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" onChange={this.handlePassword} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Router>
        );
    }
    handleEmail(e){
        console.log(e);
        console.log("wwwww");
        this.setState({email:e.target.value});
    }
    handlePassword(e){
        this.setState({password:e.target.value});
    }

    checkIsLoggin(){
        console.log(this.state.email,this.state.password);
        if(!this.props.isLogged){
            checkLogin(this.state.email,this.state.password).then(user=>{
                //console.log(user);
                this.setState(()=>this.handleuserdata(user));
            })
        }
    }
    handleuserdata(user){
        // console.log(user);
        this.props.handleuserdata(user);    
    }
}
