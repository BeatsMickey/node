const express = require('express');
const controllers = require('../controllers');
const passport = require('passport');

const router = express.Router();

router.get('/login/', controllers.auth.getLogin);
router.post('/login/', controllers.auth.postLogin);
router.post('/logout/', controllers.auth.postLogout);
router.get('/signup/', controllers.auth.getSignup);
router.post('/signup/', controllers.auth.postSignup);

router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
        // The request will be redirected to GitHub for authentication, so this
        // function will not be called.
    });

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        console.log(req.user);
        res.redirect('/');
    });

module.exports = router;