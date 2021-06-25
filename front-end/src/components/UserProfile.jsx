import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

import './UserProfile.css';
import { PropTypes } from 'prop-types';

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

        };

        this.handleColor = this.handleColor.bind(this);
        this.handleSubmit = this.handleSubmit(this);
    }

    render() {
        var content;
        if (this.props.userProfileToggle) {
            content =
                <div className="position-absolute top-50 start-50 translate-middle userProfile">
                    <div className="icon">

                    </div>
                    <div className="setting">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="state">Select</Label>
                                <Input type="select" name="select" id="state">
                                    <option>Sleeping</option>
                                    <option>Not Home</option>
                                    <option>At Home</option>
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
                            <Button>Submit</Button>
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
            var _user = state.user;
            _user.color = e.target.value
            return{
                user: _user
            }
        })
    }
    handleSubmit(){

    }
}
