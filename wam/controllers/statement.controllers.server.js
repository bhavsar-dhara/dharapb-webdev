/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (app, models) {
    app.get('/wam/script/:scriptId/statement', statementListController);
    app.get('/wam/script/:scriptId/statement/new', newStatementController);
    app.get('/wam/script/:scriptId/statement/:statementId', editStatementController);
    app.get('/wam/script/:scriptId/statement/:statementId/delete', deleteStatementController);
    app.put('/wam/script/:scriptId/statement', reorderStatements);
    app.post('/wam/script/:scriptId/statement', createStatementController);
    app.post('/wam/script/:scriptId/statement/:statementId', updateStatementController);

    var statementModel = models.statementModel;
    var scriptModel = models.scriptModel;

    function reorderStatements(req, res) {
        var scriptId = req.params.scriptId;
        var start = req.query.start;
        var end = req.query.end;
        statementModel
            .reorderStatements(scriptId, start, end)
            .then(
                function (response) {
                    
                }
            );
    }

    function editStatementController(req, res) {
        statementModel
            .findStatement(req.params.scriptId, req.params.statementId)
            .then(
                function (statement) {
                    var scope = {
                        scriptId: req.params.scriptId,
                        statementId: req.params.statementId,
                        statement: statement
                    };
                    res.render('wam/script/script-edit.view.server.ejs', scope);
                }
            );
    }

    function createStatementController(req, res) {
        var scope = {
            scriptId: req.params.scriptId
        };
        var script = req.body;
        // console.log(script);
        scriptModel
            .createModel(scope.scriptId, script)
            .then(
                function (script) {
                    
                },
                function (error) {
                    
                }
            );
            
        res.render('wam/script/script-list.view.server.ejs', scope);
    }

    function newScriptController(req, res) {
        res.render('wam/script/script-new.view.server.ejs');
    }

    function scriptListController(req, res) {
        var scope = {
            scriptId: req.params.scriptId
        };
        res.render('wam/script/script-list.view.server.ejs', scope);
    }
};