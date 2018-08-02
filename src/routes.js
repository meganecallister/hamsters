import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Auth from './components/Auth/Auth';

export default function() {
    return (
        <Switch>
            <Route exact path='/' component={Auth}/>
            <Route path='/home' component={Home}/>
            <Route path='/profile/:id' component={Profile}/>
        </Switch>
    )
}