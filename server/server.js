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
    db.view_users([req.session.passport.user.id]).then((hamsters) => {
        res.status(200).send(hamsters);
    })
})

app.delete('/deleteHamster/:id', (req, res) => {
    const db = req.app.get('db');
    db.delete_user([req.params.id])
    .then((newUserList) => {
        res.send(newUserList);
    })
})

app.get('/displayFavs/:id', (req, res) => {
    const db = req.app.get('db');
    db.view_favs([req.session.passport.user.id, req.params.id])
    .then((favs) => {
        res.status(200).send(favs);
    })
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(FAILURE_REDIRECT)
})

app.listen(SERVER_PORT, () => {console.log(`${SERVER_PORT} licks to finish this ice cream cone...`)})