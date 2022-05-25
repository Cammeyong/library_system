var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/login', function(req,res,next){
    res.render('../views/login',{ messages:req.session?.flash});
    
    next();
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    conn.query('SELECT * FROM library_system.admin WHERE email = ? AND BINARY password = ?', [email, password], function (err, rows, fields) {

        // if login is incorrect or not found
        console.log(rows.length);
        if (rows.length <= 0) {

            req.flash('error', 'Incorrect Email or Password, Please try again!');
            res.redirect('/login');
            console.log(err)

        }else { // if login found
            //Assign session variables based on login credentials                
            req.session.loggedin = true;
            req.session.id = rows[0].id;
            // req.session.first_name = rows[0].frst_nm;
            // req.session.last_name = rows[0].last_nm;
            // req.session.is_admin = rows[0].is_admin;
            console.log(req.session);
            res.redirect('../views/borrowed-list');

        }
    })
});

router.get('/logout', function (req, res) {
    req.session.destroy();
  //   req.flash('success', 'Enter Your Login email and password');
    res.redirect('/');
});

module.exports = router;