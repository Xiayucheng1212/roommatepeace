import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { } from '../api/users';
import MainPage from './MainPage.jsx'
import HomePage from './HomePage.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            isLogged:false,
            
        }
        this.handleIsLogged = this.handleIsLogged.bind(this);
    }

    render() {
        return (
            <Router>
                {
                    this.state.isLogged ? <HomePage isLogged={this.state.isLogged} handleIsLogged={this.handleIsLogged}/> : <MainPage isLogged={this.state.isLogged} handleIsLogged={this.handleIsLogged}/>
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
    }

}
