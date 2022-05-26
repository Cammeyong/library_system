var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/student_register', function(req,res,next){
    conn.query ("SELECT * FROM students", function(err, rows) {
        if(err){
            console.log(err);
        } else {
            res.render('../views/student_register', {
                it: rows
            }); 
             next();
        }
    })
    
});

router.post('/student_register/add', function(res,req,next){
    let data = {student_id:   req.body.student_id,
        first_nm:     req.body.first_nm,
        last_nm:      req.body.last_nm,
        email:        req.body.email,
        password:     req.body.password,    
    };

    let sqlQuery = "INSERT INTO library_system.students SET ?";

    conn.query(sqlQuery, data,(err, results) => {
    if(err) 
    console.log(err);
    res.send(JSONResponse(results));
    });
    next();
})

module.exports = router;