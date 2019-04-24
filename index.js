const express = require('express')

const db = require('./data/db')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The user's information could not be retrieved."
                })
        })
})

server.get(`/api/users/:id`, (req, res) => {
    const { id } = req.params
    db
        .findById(id)
        .then(user => {
            user ?
                res
                    .status(201)
                    .json(user) :
                res
                    .status(404)
                    .json({
                        message: "The user with the specified ID does not exist."
                    })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err,
                    message: 'Something went wrong. Try again.'
                })
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    db
        .insert(newUser)
        .then(user => {
            user ?
                res
                    .status(201)
                    .json({
                        user: newUser.name,
                        bio: newUser.bio,
                        id: user.id
                    }) :
                res
                    .status(400)
                    .json({
                        error: 'Please provide name AND bio for the user'
                    })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err,
                    message: "There was an error while saving the user to the database."
                })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db
        .remove(id)
        .then(user => {
            user ?
                res.end() :
                res
                    .status(404)
                    .json({
                        message: "The user with the specified ID does not exist."
                    })
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: "The user could not be removed"
                })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    if (req.body.name && req.body.bio) {
        db
            .update(id, req.body)
            .then(user => {
                user ?
                    res
                        .status(200)
                        .json({
                            name: req.body.name,
                            bio: req.body.bio
                        }) :
                    res
                        .status(404)
                        .json({
                            message: "The user with the specified ID does not exist."
                        })
            })
            .catch(err => {
                res
                    .status(500)
                    .json({
                        error: "The user information could not be modified."
                    })
            })
    } else {
        res
            .status(400)
            .json({
                errorMessage: "Please provide name AND bio for the user."
            })
    }
})

server.listen(5000)