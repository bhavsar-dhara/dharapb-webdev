/**
 * Created by Dhara on 6/24/2016.
 */
module.exports = function(app, models) {

    var eventModel = models.eventModel;

    app.post("/api/project/event", createEvent);


    function createEvent(req, res) {
        var event = req.body;
        eventModel
            .createEvent(event)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
    
};