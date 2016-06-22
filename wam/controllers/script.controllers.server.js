/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (app, models) {
    app.get('/wam/script', scriptListController);
    app.get('/wam/script/new', newScriptController);
    app.get('/wam/script/:scriptId', editScriptController);
    app.post('/wam/script', createScriptController);

    var scriptModel = models.scriptModel;

    function editScriptController(req, res) {
        scriptModel
            .findScriptById(req.params.scriptId)
            .then(
                function (script) {
                    
                },
                function (error) {
                    
                }
            );
        res.render('wam/script/script-edit.view.server.ejs');
    }

    function createScriptController(req, res) {
        var script = req.body;
        console.log(script);
        scriptModel
            .createModel(script)
            .then(
                function (script) {
                    
                },
                function (error) {
                    
                }
            );
            
        res.render('wam/script/script-list.view.server.ejs');
    }

    function newScriptController(req, res) {
        res.render('wam/script/script-new.view.server.ejs');
    }

    function scriptListController(req, res) {
        res.render('wam/script/script-list.view.server.ejs');
    }
};