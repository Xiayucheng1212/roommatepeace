const express = require('express');

const todos = require('../model/todo.js');

const router = express.Router();

router.use(express.json());

// getTodos
router.get('/getTodos', function (req, res, next) {
    let {unaccomplishedOnly, searchText} = req.query;
    unaccomplishedOnly = unaccomplishedOnly === 'false' ? false:true;
    todos.getTodos(unaccomplishedOnly,searchText)
        .then((data)=>{
            console.log(data);
            res.json(data);
    })
    .catch(next);
});

// createTodo
router.post('/createTodo', (req, res, next)=>{
    const {mood, text} = req.body;
    
    todos.createTodo(mood,text)
        .then((data)=>{
            console.log(data);
            res.json(data);
        })
        .catch(next);
})

//accomplishTodo
router.post('/accomplishTodo', (req,res,next)=>{
    const {id} = req.body;
    todos.accomplishTodo(id)
        .then((data)=>{
            res.json(data);
        })
        .catch(next);
})


module.exports =router;