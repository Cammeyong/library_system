var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/library_books', function(req, res) {
    
    if(req.session.loggedin == true) {
    conn.query('SELECT * FROM library_books', function(err,row)     {
    
        if(err){ 
            res.render('../views/library_books',
            {
                page_title: "Library",
                library: ''
            });   
        }
        else{ 
            res.render('../views/library_books',
            {
                page_title: "Library",
                library: row,
                my_session: req.session

            });
        }
                            
    });
} else {
    res.redirect("/login");
}
    
});

router.post('/book_request/add', function(req, res){

    var date_requested = new Date().toLocaleDateString('fr-CA');

    let data = {student_id:    req.body.student_id,
        book_title:   req.body.book_title,
        reference_nm:     req.body.reference_nm,
        request_date:     date_requested,
    };
console.log(date_requested)
    let sqlQuery = "INSERT INTO library_system.book_request SET ?";

    conn.query(sqlQuery, data,(err, results) => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/')
    }
    // res.send(JSONResponse(results));
    });
})


module.exports = router;