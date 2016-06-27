/**
 * Created by Dhara on 6/24/2016.
 */
module.exports = function (app, models) {

    var eventModel = models.eventModel;

    app.post("/api/project/event", createEvent);
    app.get("/api/project/event/:eventId", findEventById);
    app.put("/api/project/event/:eventId", updateEvent);
    app.delete("/api/project/event/:eventId", deleteEvent);

    function createEvent(req, res) {
        var event = req.body;
        eventModel
            .findEventByEventId(event.eventId)
            .then(
                function (response) {
                    // console.log(response);
                    if(response) {
                        // console.log("event exists");
                        res.json(response);
                    } else {
                        eventModel
                            .createEvent(event)
                            .then(
                                function (response) {
                                    // console.log("event created");
                                    res.json(response);
                                },
                                function (error) {
                                    // console.log("in server err");
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                },
                function (error) {
                    // console.log("in server err");
                    res.statusCode(404).send(error);
                }
            );
    }

    function findEventById(req, res) {
        var id = req.params.eventId;
        eventModel
            .findEventById(id)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateEvent(req, res) {
        var id = req.params.eventId;
        var event = req.body;
        eventModel
            .updateEvent(id, event)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteEvent(req, res) {
        var id = req.params.eventId;
        eventModel
            .deleteEvent(id)
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