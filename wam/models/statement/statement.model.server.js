/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (models) {
    
    var scriptModel = models.scriptModel;
    
    var api = {
        createStatement: createStatement,
        findAllStatements: findAllStatements,
        findStatementById: findStatementById,
        updateStatement: updateStatement,
        deleteStatement: deleteStatement,
        reorderStatements: reorderStatements
    };
    return api;

    function reorderStatements(scriptId, start, end) {
        return scriptModel
            .findScriptById({_id: scriptId})
            .then(
                function (script) {
                    script.statements.splice(end, 0, script.statements.splice(start, 0));
                    return script.save();
                }
            );
    }
    
    function deleteStatement(scriptId, statementId) {
        return scriptModel
            .findScriptById({_id: scriptId})
            .then(
                function (script) {
                    script.statements.id(statementId).remove();
                    return script.save();
                }
            );
    }
    
    function updateStatement(scriptId, statementId, statementName) {
        return scriptModel
            .findScriptById({_id: scriptId})
            .then(
                function (script) {
                    var statement = script.statements.id(statementId);
                    statement.name = statementName;
                    return 3script.save();
                }
            );
    }
    
    function findStatementById(scriptId) {
        return Script.findById({_id: scriptId});
    }
    
    function createStatement(script) {
        return Script.create(script);
    }
    
    function findAllStatements() {
        return Script.find();
    }
};