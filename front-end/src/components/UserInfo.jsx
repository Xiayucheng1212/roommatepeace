import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Input
} from 'reactstrap';

import PropTypes from 'prop-types';
import './UserInfo.css';
import { uploadImage } from '../api/profileImage';

export default class UserInfo extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        toggle: PropTypes.bool
    };
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            profileUrl: this.props.user.photo,
            profileUrlUpload: this.props.user.photo
        };
        this.fileInput = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.resetProfileUrl = this.resetProfileUrl.bind(this);
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }}>&times;</button>;
    }

    render() {
        var content;
        if (this.props.toggle) {
            content =
                <div >
                <Modal isOpen={this.props.toggle} toggle={() => {this.resetProfileUrl(); this.props.handleClick();}} external={this.externalCloseBtn}>
                <ModalHeader>
                    <CardImg onClick={(() => {
                        if (this.props.user.id === this.props.mainuser.id)
                            this.fileInput.current.click();
                    })} top width="100%" src={this.state.profileUrl} alt="Card image cap"/>
                    {this.props.user.id === this.props.mainuser.id ? (
                        <div>
                            <input type="file" id="profileimage" onChange={this.onFileChange} ref={this.fileInput}/>
                            <Button color="secondary" onClick={this.uploadImage}>Upload</Button>
                        </div>
                    ) : null}
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
                    <Button color="secondary" onClick={() => {this.resetProfileUrl(); this.props.handleClick();}}>Back</Button>
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
    resetProfileUrl() {
        this.setState({
            profileUrl: this.state.profileUrlUpload
        })
    }
    onFileChange = (event) => {
        const image = event.target.files[0];
        // Update the state
        this.setState({
            selectedFile: image,
            profileUrl: URL.createObjectURL(image)
        });
    };

    uploadImage(event) {
        this.setState({
            profileUrlUpload: this.state.profileUrl
        })
        uploadImage(this.props.user, this.state.selectedFile);
    }

    handleClick() {
        
    }
}