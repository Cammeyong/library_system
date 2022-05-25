var express = require('express');
var router = express.Router();
var conn = require('../lib/db');

router.get('/borrow_list', function(req, res, next) {
    
    conn.query('SELECT * FROM borrowed_book', function(err,row)     {
        console.log(err);
            
    
        if(err){ 
            res.render('../views/borrowed-list',
            {
                page_title: "Borrowed Book List",
                borrow: ''
            });   
        }
        else{ 
            res.render('../views/borrowed-list',
            {
                page_title: "Borrowed Book List",
                borrow: row
            });
        }
                            
    });
    
});

module.exports = router;