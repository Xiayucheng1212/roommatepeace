import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import './SignUp.css';
import {PropTypes} from 'prop-types';
import {createUser} from '../api/users';

export default class SignUp extends React.Component {
    static propTypes = {
        handleuserdata: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            name:"",
            email:"",
            password:"",
            color:"",
            reminder:false,
            // history:props.history
        };

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleReminder = this.handleReminder.bind(this);
    }

    render() {
        return (
            <Router>
                <div className="Login">
                    <h2>Sign Up</h2>
                    <Form  classname="form" inline onSubmit={this.handleSignUp} action="../">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleName" className="mr-sm-2">Username</Label>
                            <Input type="text" name="name" id="exampleName" placeholder="Name" onChange={this.handleName} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" onChange={this.handleEmail} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="mr-sm-2">Password</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" onChange={this.handlePassword} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleColor">Color</Label>
                            <Input
                            type="color"
                            name="color"
                            id="exampleColor"
                            placeholder="color placeholder"
                            onChange={this.handleColor}
                            />
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="exampleReminder">Select Reminder</Label>
                            <Input type="select" name="reminder" id="exampleReminder" onChange={this.handleReminder}>
                            <option>Yes</option>
                            <option>No</option>
                            </Input>
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="examplePhoto">Photo</Label>
                            <Input type="file" name="photo" id="examplePhoto" />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </div>
            </Router>
        );
    }
    handleName(e){
        // console.log(e.target.value);
        // console.log("wwwww");
        this.setState({name:e.target.value});
    }
    handleEmail(e){
        // console.log(e.target.value);
        // console.log("wwwww");
        this.setState({email:e.target.value});
    }
    handlePassword(e){
        // console.log(e.target.value);
        // console.log("wwwww");
        this.setState({password:e.target.value});
    }
    handleColor(e){
        // console.log(e.target.value);
        // console.log("wwwww");
        this.setState({color:e.target.value});
    }
    handleReminder(e){
        //console.log(e.target.value);
        // console.log("wwwww");
        this.setState({reminder:(e.target.value == "Yes")});
    }
    handleSignUp(event){
        //console.log(this.state.name,this.state.email,this.state.password,this.state.color,this.state.reminder);
        event.preventDefault();
        createUser(this.state.name,this.state.email,this.state.password,this.state.color,this.state.reminder).then(user=>{
            console.log("success");
            window.history.back();
            this.setState({
                // history: history.back()
            },()=>{
                console.log(history,user)
                // event.preventDefault()
                this.handleuserdata(user);
            });
        });
    }
    handleuserdata(user){
        //console.log(user);
        this.props.handleuserdata(user.data);    
    }

}
