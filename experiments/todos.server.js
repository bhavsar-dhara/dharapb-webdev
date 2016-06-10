/**
 * Created by Dhara on 6/9/2016.
 */
// everything --> webservice and model and schema
module.exports = function (app) {
    var mongoose = require("mongoose");
    var TodoSchema = mongoose.Schema({
        priority: Number,
        title: String,
        todo: String
    }, {collections: "experiments.todo"});
    
    var Todo = mongoose.model("Todo", TodoSchema);

    //

    app.get("/api/todos", findAllTodos);
    app.put("/api/todos", reorderTodos);

    function reorderTodos(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        console.log([start, end]);
        //traditional callback function instead of promise
        Todo.find(function (err, todos) {
            todos.forEach(function(todo){
                if(start > end) {
                    if(todo.priority >= end && todo.priority < start) {
                        todo.priority++;
                        todo.save(function () {
                            
                        });
                    } else if(todo.priority === start) {
                        todo.priority = end;
                        todo.save(function () {
                            
                        });
                    }
                    todo.save();
                } else {
                    if(todo.priority > start && todo.priority <= end) {
                        todo.priority--;
                        todo.save(function () {

                        });
                    } else if(todo.priority === start) {
                        todo.priority = end;
                        todo.save(function () {

                        });
                    }
                }
            })
        });

        res.send(200);
    }
    
    function findAllTodos(req, res) {
        Todo
            .find()
            .then(function (todos) {
                res.json(todos);
            })
    }

    /*Todo.create({"priority": 1, "title": "CS5610", "todo": "Teach Directives"});
    Todo.create({"priority": 2, "title": "CS5200", "todo": "Teach Database"});
    Todo.create({"priority": 3, "title": "CS5100", "todo": "Teach Algorithms"});
    Todo.create({"priority": 4, "title": "CS4550", "todo": "Teach Angular"});*/
}