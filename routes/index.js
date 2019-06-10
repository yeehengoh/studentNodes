'use strict'

var express = require('express');
var sql = require('mssql');
var db = require('../db.js');

var router = express.Router();
var result;

/* GET home page. */
router.get('/', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err) {
            console.log("Error while connecting to database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.query('select * from dbo.student', function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    console.log(res);
                    res.send(res);
                }
                sql.close();
                res.render('index', {
                    route: 'home',
                    data: result.recordset
                });
            });
        }
    });
});

/* GET edit page. */
router.get('/edit/:id/', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err) {
            console.log("Error while connecting to database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.input('id', sql.Int, req.params.id)
                .query('select * from dbo.student where id=@id', function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    console.log(res);
                    res.send(res);
                }
                sql.close();
                res.render('edit', {
                    route: 'edit',
                    data: result.recordset[0]
                });
            });
        }
    });
});

/* POST edit page. */
router.post('/update', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err) {
            console.log("Error while connecting to database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.input('id', sql.Int, req.body.id)
                .input('firstName', sql.NVarChar(50), req.body.firstName)
                .input('lastName', sql.NVarChar(50), req.body.lastName)
                .input('gender', sql.NVarChar(50), req.body.gender)
                .input('dob', sql.Date, req.body.dob)
                .input('address1', sql.NVarChar(50), req.body.address1)
                .input('address2', sql.NVarChar(50), req.body.address2)
                .input('city', sql.NVarChar(50), req.body.city)
                .input('state', sql.NVarChar(50), req.body.state)
                .input('country', sql.NVarChar(50), req.body.country)
                .input('poscode', sql.NVarChar(50), req.body.poscode)
                .input('phoneNum', sql.NVarChar(50), req.body.phoneNum)
                .query('update dbo.student set studentID=@studentID,firstName=@firstName,lastName=@lastName,gender=@gender,dob=@dob,address1=@address1,address2=@address2,city=@city,state=@state,country=@country,poscode=@poscode,phoneNum=@phoneNum where studentID=@studentID', function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    console.log(res);
                    res.send(res);
                }
                sql.close();
                res.redirect('/');
            });
        }
    });
});

/* GET add page. */
router.get('/add', function (req, res, next) {
    res.render('add', {
        route: 'add',
    });
});

/* POST add page. */
router.post('/add', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err) {
            console.log("Error while connecting to database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.input('studentID', sql.BigInt, req.body.studentID)
                .input('firstName', sql.NVarChar(50), req.body.firstName)
                .input('lastName', sql.NVarChar(50), req.body.lastName)
                .input('gender', sql.NVarChar(50), req.body.gender)
                .input('dob', sql.Date, req.body.dob)
                .input('address1', sql.NVarChar(50), req.body.address1)
                .input('address2', sql.NVarChar(50), req.body.address2)
                .input('city', sql.NVarChar(50), req.body.city)
                .input('state', sql.NVarChar(50), req.body.state)
                .input('country', sql.NVarChar(50), req.body.country)
                .input('poscode', sql.NVarChar(50), req.body.poscode)
                .input('phoneNum', sql.NVarChar(50), req.body.phoneNum)
                .query('insert into dbo.student (studentID, firstName, lastName, gender, dob, address1, address2, city, state, country, poscode, phoneNum) values (@studentID, @firstName, @lastName, @gender, @dob, @address1, @address2, @city, @state, @country, @poscode, @phoneNum)', function (err, res) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    }
                    else {
                        console.log(res);
                        res.send(res);
                    }
                    sql.close();
                    res.redirect('/');
                });
        }
    });
});

/* GET delete page. */
router.get('/delete/:id/', function (req, res, next) {
    sql.connect(db, function (err) {
        if (err) {
            console.log("Error while connecting to database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.input('id', sql.Int, req.body.id)
                .query('delete from dbo.student where id=@id', function (err, res) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    console.log(res);
                    res.send(res);
                }
                sql.close();
                res.redirect('/');
            });
        }
    });
});

module.exports = router;
