import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { } from '../api/users';
import MainPage from './MainPage.jsx'
import HomePage from './HomePage.jsx'
import Login from './Login.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            isLogged:false,
            user:{},
        }
        this.handleIsLogged = this.handleIsLogged.bind(this);
        this.handleuserdata = this.handleuserdata.bind(this);

    }

    render() {
        return (
            <Router>
                {
                    this.state.isLogged ? 
                    <HomePage 
                        isLogged={this.state.isLogged}
                        user={this.state.user}
                        roommates={this.state.roommates} 
                        handleIsLogged={this.handleIsLogged}/> : 
                    <MainPage 
                        isLogged={this.state.isLogged} 
                        user={this.state.user}
                        handleuserdata={this.handleuserdata}
                        handleIsLogged={this.handleIsLogged}/>
                }
            </Router>
        );
    }

    handleIsLogged(){
        this.setState((state,props)=>{
            return {
                isLogged: !state.isLogged
            }
        })
        console.log("llllll");
    }
    handleuserdata(user){
        this.setState({
            user:user
        },()=>{
            this.handleIsLogged();
        });
    }

}
