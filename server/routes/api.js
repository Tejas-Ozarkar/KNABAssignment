const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Subject = require('../models/subject');

const db = 'mongodb://tejas:tejas5@ds227459.mlab.com:27459/asteriax';
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if (err) {
        console.log("Error! " + err);
    }
});

router.get('/users', function(req, res) {
    console.log('Get requests for all users');
    User.find({})
        .exec(function(err, users) {
            if (err) {
                console.log("Error retrieving videos");
            } else {
                res.json(users);
            }
        });
});

router.get('/users/:id', function(req, res) {
    console.log('Get requests for a user');
    User.findById(req.params.id)
        .exec(function(err, user) {
            if (err) {
                console.log("Error retrieving videos");
            } else {
                res.json(user);
            }
        });
});

router.post('/user', function(req, res) {
    console.log(req.body);
    var newUser = new User();
    newUser.googleId = req.body.googleId;
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.imageUrl = req.body.imageUrl;
    newUser.save(function(err, insertedUser) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to fetch request',
                error: err
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Success',
                data: insertedUser
            });
        }
    });
});

router.put('/user/:id', function(req, res) {
    console.log('Update user');
    User.findByIdAndUpdate(req.params.id, {
            $set: { username: req.body.username, address: req.body.address, contact: req.body.contact, email: req.body.email }
        }, {
            new: true
        },
        function(err, updatedUser) {
            if (err) {
                res.send("Error updating User");
            } else {
                res.json(updatedUser);
            }
        });
});

router.delete('/user/:id', function(req, res) {
    console.log('Deleting a user');
    User.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
        if (err) {
            res.send("Error Deleting user");
        } else {
            res.send(deletedVideo);
        }
    })
})


router.post('/subject', function(req, res) {
    console.log(req.body);
    var newUser = new Subject();
    newUser.userId = req.body.userId;
    newUser.name = req.body.name;
    newUser.teacher = req.body.teacher;
    newUser.semester = req.body.semester;
    newUser.duration = req.body.duration;
    newUser.save(function(err, insertedSubject) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Unable to insert new subject',
                error: err
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Success',
                data: insertedSubject
            });
        }
    });
});

router.get('/subjects', function(req, res) {
    console.log('Get requests for all subjects');
    Subject.find({})
        .exec(function(err, subjects) {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Unable to fetch subjects',
                    error: err
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Success',
                    data: subjects
                });
            }
        });
});

router.put('/subject', function(req, res) {

    console.log(req.body);
    Subject.findByIdAndUpdate(req.body._id, {
            $set: { name: req.body.name, teacher: req.body.teacher, duration: req.body.duration, semester: req.body.semester }
        }, {
            new: true
        },
        function(err, updatedSubject) {
            if (err) {
                res.send("Error updating subject");
            } else {
                res.json(updatedSubject);
            }
        });
});

router.delete('/subject/:id', function(req, res) {
    console.log('Deleting a subject' + req.params.id);
    Subject.findByIdAndRemove(req.params.id, function(err, deletedSubject) {
        if (err) {
            res.send("Error deleting subject");
        } else {
            res.send(deletedSubject);
        }
    })
})


module.exports = router;