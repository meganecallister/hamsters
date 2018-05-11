import React, { Component } from 'react';
import './Home.css';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            hamsters: []
        }
    }

    componentDidMount() {
        axios.get('/displayHamsters').then(res => {
            this.setState({
                hamsters: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        let hammies = this.state.hamsters.map( (e, i) => {
            return (
                <div key={i} className='eachHamster'>
                    <img src={e.img} alt='hamster pic'/>
                    <p>{e.name}</p>
                </div>
            )
        })

        return (
            <div className='home'>
                <Nav/>
                <h1>Home</h1>
                <div className='hamsterList'>
                    { hammies }
                </div>
                
            </div>
        )
    }    
}

export default Home;