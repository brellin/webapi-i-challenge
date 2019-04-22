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
            res.status(500).json({
                error: err,
                message: "That didn't work. Try again."
            })
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    db
        .insert(newUser)
        .then(user => {
            res
                .status(201)
                .json({
                    user: newUser.name,
                    id: user.id
                })
        })
        .catch(err => {
            res.json({
                error: err,
                message: "Something went wrong. Try again."
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
    db
        .remove(userId)
        .then(user => {
            res.status(204).end()
        })
        .catch(err => {
            res.json({
                error: err,
                message: 'Something went wrong. Try again.'
            })
        })
})

server.listen(5000)