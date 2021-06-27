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
        console.log('array');
        console.log(this.props.complain);
        if(this.props.complain === undefined){
            console.log(false);
            available = false;
        }else{
            console.log(this.props.complain.length);
            available = this.props.complain.length;
        }
        if (this.props.complainToggle && available) {
            content = 
                <div className="complain">
                    <Card body inverse color="danger">
                        <CardTitle tag="h5">You Get A Complain!!!!!!</CardTitle>
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
        console.log('id: '+ this.props.complain[0].id);
        console.log(this.props.user);
        deleteComplain({
           id:this.props.complain[0].id,
           userID: this.props.user.id
        }).then((item)=>{
            console.log(item);
            this.props.handleComplainUpdate(item.data);
            this.props.handleComplainToggle();
        })
    }

}
