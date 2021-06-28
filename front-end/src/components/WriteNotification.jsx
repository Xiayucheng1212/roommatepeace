import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert, Form, FormGroup,Label,Input, Button
} from 'reactstrap';
import {createNotification} from "../api/notifications.js";

import './WriteNotification.css';
import { PropTypes } from 'prop-types';

export default class WriteNotification extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        writeNotificationToggle: PropTypes.bool,
        handleWriteNotificationToggle: PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            notification:"",
        };
        
        

        this.handleNotification = this.handleNotification.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    render() {
        var content;
        if (this.props.writeNotificationToggle) {
            content =
                <div className="position-absolute top-50 start-50 translate-middle writeNotification" style={{backgroundColor:this.props.user.color}}>
                    <div className="icon">
                    </div>
                    <div>
                        <Alert color="secondary" >Write A Noification</Alert>
                    </div>
                    <div className="close" onClick={this.props.handleWriteNotificationToggle}>
                    </div>
                    <div className="setting" >
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                {/* <Label for="exampleName" className="mr-sm-2">Write a notification</Label> */}
                                <Input type="text" name="notification" id="noti" placeholder="Write a notification..." onChange={this.handleNotification} />
                            </FormGroup>
                            <Button outline color="info">Submit</Button>
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
    handleNotification(e){
        this.setState({notification:e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        createNotification({
            room_id:this.props.user.room_id,
            text: this.state.notification
        }).then((cpl)=>{
            this.props.handleWriteNotificationToggle();
        })
    }

}
