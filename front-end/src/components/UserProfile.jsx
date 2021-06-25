import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

import './UserProfile.css';
import { PropTypes } from 'prop-types';
import {updateUser} from '../api/users.js';
import './UserProfile.css';
export default class UserProfile extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        location: PropTypes.object,
        userProfileToggle: PropTypes.bool,
        handleuserdata: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            userX: this.props.user
        };

        this.handleColor = this.handleColor.bind(this);
        this.handleChageState = this.handleChageState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        var content;
        if (this.props.userProfileToggle) {
            content =
                <div className="position-absolute top-50 start-50 translate-middle userProfile">
                    <div>
                        <Alert color="info">Change</Alert>
                    </div>
                    <div className="icon">

                    </div>
                    <div className="setting">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="state">State</Label>
                                <Input type="select" name="select" id="state" onChange={this.handleChageState}>
                                    <option>at home</option>
                                    <option>not home</option>
                                    <option>sleeping</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="color">Color</Label>
                                <Input
                                    type="color"
                                    name="color"
                                    id="color"
                                    placeholder="color placeholder"
                                    onChange={this.handleColor}
                                />
                            </FormGroup>
                            <Button outline color="primary">Submit</Button>
                        </Form>
                    </div>
                </div>;
        } else {
            content = '';
        }

        return (
            <div>
                {content}
            </div>
        );

    }

    handleColor(e){
        this.setState((state,prop)=>{
            var _user = state.userX;
            _user.color = e.target.value
            return{
                userX: _user
            }
        })
    }
    handleChageState(e){
        this.setState((state,prop)=>{
            var _user = state.userX;
            _user.state = e.target.value
            return{
                userX: _user
            }
        },console.log(this.state.userX));
    }
    handleSubmit(){
        updateUser(this.state.userX).then(user=>{
            this.props.handleuserdata(user.data);
        })
    }
}
