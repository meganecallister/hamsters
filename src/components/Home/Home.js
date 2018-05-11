import React, { Component } from 'react';
import './Home.css';
import Nav from '../Nav/Nav';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            hamsters: [],
            favs: [],
            food: '',
            hobby: ''
        }
        this.deleteHamster = this.deleteHamster.bind(this);
    }

    componentDidMount() {
        axios.get('/displayHamsters').then(res => {
            this.setState({
                hamsters: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    viewFavs(id) {
        axios.get(`/displayFavs/${id}`).then(res => {
            this.setState({
                favs: res.data
            })
        }).catch(err => {
            console.log(err);
        });        
    }
    updateFood(e) {
        this.setState({food: e.target.value});
    }
    updateHobby(e) {
        this.setState({hobby: e.target.value})
    }
    deleteHamster(id) {
        axios.delete(`/deleteHamster/${id}`).then((res) => {
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
                    <div onClick={() => this.viewFavs(e.id)}>
                        <img src={e.img} alt='hamster pic'/>
                    </div>
                    <p>{e.name}</p>
                    <input onChange={ e => this.updateFood( e.target.value ) } type='text' placeholder='food'/>
                    <input onChange={ e => this.updateHobby( e.target.value ) } type='text' placeholder='hobby'/>
                    <button>Edit</button>
                    <button onClick={() => this.deleteHamster(e.id)}>Delete</button>
                </div>
            )
        let favs = this.state.favs.map( (e, i) => {
            return (
                <div key={i} className='eachFav'>


                </div>
            )
        })
        })

        return (
            <div className='home'>
                <Nav/>
                <h1>Home</h1>
                <div className='hamsterList'>
                    { hammies }
                    {this.state.favs}
                    
                </div>
                
            </div>
        )
    }    
}

export default Home;