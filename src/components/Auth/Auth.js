import React from 'react';
import './Auth.css';

export default function Auth() {
    return (
        <div className='auth'>
            <h1>Auth</h1>
            <a href={process.env.REACT_APP_LOGIN}>
                <button>Login</button>
            </a>
        </div>
    )
}