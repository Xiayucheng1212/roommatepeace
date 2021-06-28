import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Button,Card, CardTitle, CardText
} from 'reactstrap';

import './Complain.css';
import { PropTypes } from 'prop-types';
import {updateUser} from '../api/users.js';
import {deleteComplain} from '../api/complains.js';
export default class Complain extends React.Component {
    static propTypes = {
        handleComplainToggle: PropTypes.func,
        complainToggle: PropTypes.bool,
        complain: PropTypes.array,
        handleComplainUpdate: PropTypes.func,
        user: PropTypes.object
    };
    constructor(props) {
        super(props);

        this.state = {
            
        };
        this.deleteComplain = this.deleteComplain.bind(this);
    }

    render() {
        var content;
        let available;
        if(this.props.complain === undefined){
            available = false;
        }else{
            available = this.props.complain.length;
        }
        if (this.props.complainToggle && available) {
            content = 
                <div className="complain">
                    <Card body inverse color="danger">
                        <CardTitle tag="h5">You Get A Complaint!!!!!!</CardTitle>
                        <CardText>
                            {this.props.complain[0].expect}
                        </CardText>
                        <Button color="secondary" onClick={this.deleteComplain}>Got It!</Button>
                    </Card>
                </div>;
        } else {
            content = '';
        }

        return (
            <div>
                {this.props.complainToggle}
                {content}
            </div>
        );

    }
    deleteComplain(e){
        // e.preventDefault();
        deleteComplain({
           id:this.props.complain[0].id,
           userID: this.props.user.id
        }).then((item)=>{
            this.props.handleComplainUpdate(item.data);
            this.props.handleComplainToggle();
        })
    }

}
