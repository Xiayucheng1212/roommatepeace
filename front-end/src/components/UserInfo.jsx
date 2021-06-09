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
        user: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.handleClick = this.handleClick.bind(this);
        const closeBtn = <button className="close" onClick={this.handleClick}>&times;</button>;
    }

    render() {
        return (
            <Router>
                <div >
                <Button color="danger" onClick={this.handleClick}>{this.props.user.user_name}</Button>
                <Modal isOpen={this.state.modal} toggle={this.handleClick}>
                <ModalHeader toggle={this.handleClick} close={this.closeBtn}>
                    <CardImg top width="100%" src={this.props.user.photo} alt="Card image cap" />
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
                    <Button color="primary" onClick={this.handleClick}>change</Button>{' '}
                    <Button color="secondary" onClick={this.handleClick}>Cancel</Button>
                </ModalFooter>
                </Modal>
                </div>
            </Router>
        );
    }

    handleClick() {
        this.setState((state, props) => {
            return {
                modal: !state.modal
            }
        })
    }
}