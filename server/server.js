require ('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT
} = process.env;

const app = express();
app.use(bodyParser.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');
    db.find_user([profile.id]).then( userResult => {
        if(!userResult[0]) {
            db.create_user([
                profile.id
            ]).then( createdUser => {
                db.create_favs([
                    createdUser[0].id
            ])
            console.log(createdUser);
            return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResult[0].id)
        }
    })
}))

passport.serializeUser((id, done) => {
    done(null, id);
})
passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then( loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

app.use( express.static( `${__dirname}/../build` ) );

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))

app.get('/auth/nope', function(req, res) {
    if(req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Please log in!')
    }
})

app.get('/displayHamsters', (req, res) => {
    const db = req.app.get('db');
    db.view_users([req.user.id]).then((hamsters) => {
        res.status(200).send(hamsters);
    })
})

// This should pass off request level middleware

function checkAdmin(req, res, next) {
    if (req.user.admin) {
        next();
    } else {
        res.send(401).send('Oh no you did not!');
    }
}

app.delete('/deleteHamster/:id', checkAdmin, (req, res) => {
    const db = req.app.get('db');
    db.delete_user([req.params.id])
    .then((newUserList) => {
        res.send(newUserList);
    })
})

app.get('/displayFavs/:id', (req, res) => {
    const db = req.app.get('db');
    db.view_favs([req.user.id, req.params.id])
    .then((favs) => {
        res.status(200).send(favs);
    })
})

app.put('/updateHobby/:id', (req, res) => {
    // console.log('req.params.id => ', req.params.id)
    // console.log('req.body.hobby => ', req.body.hobby)
    const db = req.app.get('db');
        db.update_hobby([req.body.hobby, req.params.id])
        .then((newHobby) => {
            res.send(newHobby);
    })
})

app.get('/api/info', (req, res) => {
    const db = req.app.get('db');
    db.view_info([req.query.name])
    .then((info) => {
        res.status(200).send(info);
    })
})

app.get('/api/hamData/:id', (req, res) => {
    console.log('req.params.id => ', req.params.id)
    const db = req.app.get('db');
    db.find_ham_data([req.params.id])
    .then((hamData) => {
        res.status(200).send(hamData);
        console.log(hamData)
    })
})



// // server
// app.get('/api/user')
// req.queries.username

// app.get('/hamstersThatEat', (req, res) => {
//     const db = req.app.get('db');
//     db.view_eaters([req.user.id])
//     .then((eaters) => {
//         res.status(200).send(eaters);
//     })
// })

// app.get('/hamstersThatSleep', (req, res) => {
//     const db = req.app.get('db');
//     db.view_sleepers([req.user.id])
//     .then((sleepers) => {
//         res.status(200).send(sleepers);
//     })
// })

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(FAILURE_REDIRECT)
})

app.listen(SERVER_PORT, () => {console.log(`${SERVER_PORT} licks to finish this ice cream cone...`)})