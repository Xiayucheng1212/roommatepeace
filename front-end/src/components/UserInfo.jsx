import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserInfo.css';

export default class UserInfo extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        toggle: PropTypes.bool
    };
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleClick = this.handleClick.bind(this);
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }}>&times;</button>;
    }

    render() {
        var content;
        if (this.props.toggle) {
            content =
                <div >
                <Modal isOpen={this.props.toggle} toggle={this.props.handleClick} external={this.externalCloseBtn}>
                <ModalHeader>
                    <CardImg top width="100%" src=/*{this.props.user.photo}*/"images/user.png" alt="Card image cap" />
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                        <CardTitle tag="h5">{this.props.user.user_name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.user.email}</CardSubtitle>
                        <CardText>{this.props.user.expect}</CardText>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={this.handleClick}>change</Button>{' '} */}
                    <Button color="secondary" onClick={this.props.handleClick}>Back</Button>
                </ModalFooter>
                </Modal>
                </div>
        } else {
            content = '';
        }

        return (
            <div>
                {content}
            </div>
        );
    }

    handleClick() {
        
    }
}