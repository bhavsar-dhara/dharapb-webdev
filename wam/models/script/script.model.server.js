/**
 * Created by Dhara on 6/21/2016.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');
    
    var ScriptSchema = require('./script.schema.server.js')();
    var Script = mongoose.model('Script', ScriptSchema);
    
    var api = {
        createScript: createScript,
        findAllScripts: findAllScripts,
        findScriptById: findScriptById,
        updateScript: updateScript,
        deleteScript: deleteScript
    };
    return api;
    
    function deleteScript(scriptId) {
        return Script.remove({_id: scriptId});
    }
    
    function updateScript(script) {
        return Script
            .update({_id: script._id}, {
                $set: {
                    name: script.name,
                    description: script.description
                }
            });
    }
    
    function findScriptById(scriptId) {
        return Script.findById({_id: scriptId});
    }
    
    function createScript(script) {
        return Script.create(script);
    }
    
    function findAllScripts() {
        return Script.find();
    }
};