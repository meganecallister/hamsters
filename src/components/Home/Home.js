import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { isNullOrUndefined } from 'util';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hamsters: [],
            favs: [],
            hobby: '',
            hamName: '',
            info: []
        }
        this.handleUpdate = this.handleUpdate.bind(this);
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

    updateHobby(e) {
        this.setState({hobby: e})
    }
  
    updateName(e) {
        this.setState({hamName: e})
    }

    handleUpdate( id ) {
        console.log(this.state.hobby)
        console.log(id);
        const body = {
            hobby: this.state.hobby
        }
        axios.put(`/updateHobby/${id}`, body)
        .then( res => {
            this.setState({
                favs: res.data
            })
            console.log(res.data);
        })
        
        this.setState({
            hobby: ''
        })
    }
    lookUpHamster(name) {  
        console.log(name)
        axios.get(`/api/info?name=${name}`)
        .then( res => {
            this.setState({
                info: res.data
            })
            console.log('res.data => ', res.data)
        })
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

    //===========================//

    openModal = ( id ) => {
        document.getElementById('favsModal').style.display = 'block';
        axios.get(`/displayFavs/${id}`).then(res => {
            this.setState({
                favs: res.data
            })
        })
    }

    closeModal = () => {
        document.getElementById('favsModal').style.display = 'none';
    }

    //===========================//

    render() {
        let hammies = this.state.hamsters.map( (e, i) => {
            return (
                <div key={i} className='eachHamster'>
                    <div onClick={() => this.openModal(e.id)}>
                        <img src={e.img} alt='hamster pic'/>
                    </div>

                    <Link to={`/profile/${e.id}`}><p>{e.name}</p></Link>
                    
                    <input onChange={ e => this.updateHobby( e.target.value ) } type='text' placeholder='Hobby'/>
                    <button onClick={() => this.handleUpdate(e.id)}>Edit</button>
                    <button onClick={() => this.deleteHamster(e.id)}>Delete</button>
                </div>
            )
        });

        let favorites = this.state.favs.map( (e, i) => {
            return (
                <div key={i} className='eachFav'>   
                    <h6>Food: {e.food}</h6>
                    <h6>Hobby: {e.hobby}</h6>
                </div>                   
            )    
        });
        
        let info = this.state.info.map( (e, i) => {
            return (
                <div key={i}>
                    <p>{e.food}</p>
                    <p>{e.hobby}</p>
                </div>
            )
        })

        return (
            <div className='home'>
                <Nav/>
                <h1>Home</h1>

                <p>Look up hamster info for... </p>
                <input onChange={ e => this.updateName( e.target.value ) } type='text' placeholder='Hamster Name'/>
                <button onClick={() => this.lookUpHamster(this.state.hamName)}>Go!</button>
                {info}

                <div className='hamsterList'>
                    { hammies }
                    
                    <div id="favsModal" style={{display: 'none'}}>
                        <div className='modal-content'>
                            <p>{favorites}</p>
                        </div>
                    </div> 

                </div>
                
            </div>
        )
    }    
}

export default Home;