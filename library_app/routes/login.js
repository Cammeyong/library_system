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

    conn.query(" SELECT * FROM library_system.students WHERE email = ? AND BINARY password = ?" , [email, password], function (err, rows) {

        console.log(err)

        // if login is incorrect or not found
        console.log(rows.length);
        if (rows.length <= 0) {
            req.flash('error', 'Incorrect Email or Password, Please try again!');
            res.redirect('/login');
            console.log(err)
        }else { // if login found
            //Assign session variables based on login credentials                
            req.session.loggedin = true;
            req.session.first_nm = rows[0].first_nm;
            // req.session.last_Nm = rows[0].st_lname;
             req.session.student_id = rows[0].student_id;
            req.session.is_admin = rows[0].authorized_user;
            if (req.session.is_admin == 1) {
                res.redirect('/borrow_list');
            } else if (req.session.is_admin == 0 ) {
                res.redirect('/library_books')
            }

        }
    })

    
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    // req.flash('success', 'Enter Your Login email and password');
    res.redirect('/',);
});

module.exports = router;