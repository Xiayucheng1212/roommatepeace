import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import { } from '../api/users';
import MainPage from './MainPage.jsx'
import HomePage from './HomePage.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogged: false,
            user: {},
        }
        this.handleIsLogged = this.handleIsLogged.bind(this);
        this.handleuserdata = this.handleuserdata.bind(this);

    }

    render() {
        // var homePagePath={
        //     pathname:'/homePage',
        //     state:{
        //         isLogged: this.state.isLogged,
        //         user: this.state.user,
        //         roommates: this.state.roommates,
        //         handleIsLogged: this.handleIsLogged
        //     }
        // }
        return (
            <Router>
                {
                    this.state.isLogged ? 
                    <HomePage 
                        isLogged={this.state.isLogged}
                        user={this.state.user}
                        roommates={this.state.roommates} 
                        handleuserdata={this.handleuserdata}
                        handleIsLogged={this.handleIsLogged}/> : 
                    <MainPage 
                        isLogged={this.state.isLogged} 
                        user={this.state.user}
                        handleuserdata={this.handleuserdata}
                        handleIsLogged={this.handleIsLogged}/>
                }


                {/* <Route exact path="/">
                    {this.state.isLogged ? <Redirect to="/homePage" /> :  <Redirect to="/mainPage" /> }
                </Route>
                <Route exact path={homePagePath} component={HomePage}></Route>
                <Route exact path="/mainPage" component={MainPage}></Route> */}
            </Router>
        );
    }

    handleIsLogged() {
        this.setState((state, props) => {
            return {
                isLogged: !state.isLogged
            }
        })
    }
    handleuserdata(user) {
        this.setState({
            user:user
        },()=>{
            if(this.state.isLogged==false) this.handleIsLogged();
        });
    }

}
