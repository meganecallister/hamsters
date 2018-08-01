import React, { Component } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.match.params.id,
            hamData: []
        }
    }

    componentDidMount() {
        console.log(this.state.user_id)

        axios.get(`/api/hamData/${this.state.user_id}`)
        .then(res => {
            this.setState({
                hamData: res.data
            })
        })
    }

    render() {
        let hamsterData = this.state.hamData.map((e, i) => {
            return (
                <div key={i}>
                    <p>{e.name}</p>
                    <img src={e.img} alt='hamster pic'/>
                </div>
            )
        })

        return (
            <div className='profile'>

                <Nav/>

                <div className='profile-page'>
                    <h1>Profile of {this.state.user_id}!</h1>
                    {hamsterData}
                </div>

            </div>
        )    
    }
}

export default Profile;