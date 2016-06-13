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
        // console.log([start, end]);
        //traditional callback function instead of promise
        Todo.find(function (err, todos) {
            todos.forEach(function(todo){
                // console.log(todo);
                if(start > end) {
                    // console.log("server if " + todo.priority);
                    if(todo.priority >= end && todo.priority < start) {
                        // console.log("server if if");
                        todo.priority++;
                        todo.save(function () {

                        });
                    } else if(todo.priority === start) {
                        // console.log("server if else if");
                        todo.priority = end;
                        todo.save(function () {

                        });
                    }
                    // console.log("server if else");
                } else {
                    // console.log("server else " + todo.priority);
                    if(todo.priority > start && todo.priority <= end) {
                        // console.log("server else if");
                        todo.priority--;
                        todo.save(function () {

                        });
                    } else if(todo.priority === start) {
                        // console.log("server else else if");
                        todo.priority = end;
                        todo.save(function () {

                        });
                    }
                    // console.log("server else else");
                }
            });
        });

        res.status(200).send("Success reordering");
    }
    
    function findAllTodos(req, res) {
        Todo
            .find()
            .then(function (todos) {
                res.json(todos);
            })
    }

    // Todo.create({"priority": 0, "title": "CS5110", "todo": "Teach PDP"});
    // Todo.create({"priority": 1, "title": "CS5610", "todo": "Teach Directives"});
    // Todo.create({"priority": 2, "title": "CS5200", "todo": "Teach Algos"});
    // Todo.create({"priority": 3, "title": "CS5100", "todo": "Teach DB"});
    // Todo.create({"priority": 4, "title": "CS4550", "todo": "Teach Angular Undergrad"});
    // Todo.create({"priority": 5, "title": "CS6100", "todo": "Teach ML"});
    // Todo.create({"priority": 6, "title": "CS6550", "todo": "Teach MSD"});
    // Todo.create({"priority": 7, "title": "CS7610", "todo": "Teach Computer Systems"});
}