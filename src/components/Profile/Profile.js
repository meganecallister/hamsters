import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';

class Profile extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <h1>Profile</h1>
            </div>
        )
    }
}

export default Profile;