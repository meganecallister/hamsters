import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // eaters: [],
            // sleepers: [],
            user_id: props.match.params.id,
            hamData: []
        }
    }




// // React Router match object
// <Link to=`/profile/${this.state.user_id}`>
// <Route path='/profile/:id' component={Profile}>


// // within Profile component
// props.match.params.id



    componentDidMount() {
        console.log(this.state.user_id)

        axios.get(`/api/hamData/${this.state.user_id}`)
        .then(res => {
            this.setState({
                hamData: res.data
            })
        })
        


        // axios.get('/hamstersThatEat').then(res => {
        //     this.setState({
        //         eaters: res.data
        //     })
        // }).catch(err => {
        //     console.log(err);
        // });
    
        // axios.get('/hamstersThatSleep').then(res => {
        //     this.setState({
        //         sleepers: res.data
        //     })
        // }).catch(err => {
        //     console.log(err);
        // });
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
        // let eaterHams = this.state.eaters.map((e, i) => {
        //     return (
        //         <div key={i}>
        //             <p>{e.name}</p>
        //         </div>
        //     )
        // })
        // let sleeperHams = this.state.sleepers.map((e, i) => {
        //     return (
        //         <div key={i}>
        //             <p>{e.name}</p>
        //         </div>
        //     )
        // })

        return (
            <div className='profile'>
                <Nav/>
                <div className='profile-page'>

                <h1>Profile of {this.state.user_id}!</h1>
                {hamsterData}
                {/* <div className='eatOrSleep'> */}
                
                {/* <h1>Eat/Sleep Preferences</h1>

                <p>Hamsters that like to eat</p>
                {eaterHams}

                <hr/>

                <p>Hamsters that like to sleep</p>
                {sleeperHams} */}
                {/* </div> */}
                </div>
            </div>
        )
    }
}

export default Profile;