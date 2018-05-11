import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
    render () {
        return (
            <div className='nav'>
                <h1>Hamsters</h1>
                <Link to='/home'><button>Home</button></Link>
                <Link to='/profile'><button>Profile</button></Link>
                <Link to='/'><button>Log out</button></Link>
            </div>
        )
    }
}

export default Nav;