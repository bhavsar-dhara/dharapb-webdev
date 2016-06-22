/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (app) {
    app.get('/lectures', test);
    app.get('/lectures/:name', test2);

    function test(req, res) {
        // res.json({message: "hello"});
        res.render("hello.ejs");
    //    this wont work.. it requires data
    }
    
    function test2(req, res) {
        // var name = req.params.name;
        var data = {
            name: req.params.name,
            statements: [
                {type: "String", value: "Hello"},
                {type: "numeric", value: "1234"},
                {type: "Date", valye: "06/21/2016"}
            ]
        };
        res.render('hello.ejs', data);
    }
};