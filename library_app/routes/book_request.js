var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/book_request', function(req, res) {
    
    conn.query('SELECT * FROM book_request', function(err,row)     {
        console.log(err);
            
    
        if(err){ 
            res.render('../views/book_request',
            {
                page_title: "Students Book Request",
                request: ''
            });   
        }
        else{ 
            res.render('../views/book_request',
            {
                page_title: "Students Book Request",
                request: row
            });
        }
                            
    });
    
});

router.post('/book_request/post', function(req,res,){
    let data = {student_id:   req.body.student_id,
        book_title:     req.body.book_title,
       borrowed_date:   req.body.borrowed_date,
        return_date:    req.body.return_date,
        status:         req.body.status,    
    };
    

    let sqlQuery = "INSERT INTO library_system.borrowed_book SET ?";

    conn.query(sqlQuery, data,(err) => {
    if(err) {
        console.log(err);
    } else {
        res.redirect('/')
    }
    // res.send(JSONResponse(results));
    });
        
});

router.get('/book_request/delete/:id', function(req, res, next){
    conn.query('DELETE FROM book_request WHERE id =' + req.params.id, function(err, row){
        if(err)  throw err;
        //req.flash('error', err); //must install additionals 'flash messages and others from to do list for these to work;

       //req.flash('success', 'Deleted Successfully') ///must install additionals 'flash messages and others from to do list for these to work;
            alert('Delete Successful');
            res.redirect('/existing_Recs');
            next();
    });
});

module.exports = router;