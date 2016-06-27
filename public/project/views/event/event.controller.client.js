/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("EventsController", EventsController)
        .controller("EventDetailController", EventDetailController);

    function EventsController($routeParams, EventfulService, $sce, GoogleMapService, EventService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searchText = undefined;
        vm.location = "Boston";
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        var count;
        var country;
        var state;
        var city;
        var map;
        vm.lat = undefined;
        vm.lng = undefined;
        vm.markers = [];
        var infoWindow = undefined;

        function init() {
            GoogleMapService
                .loadGMap()
                .then(
                    function (response) {
                        // console.log(response);

                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: 42.3601, lng: -71.0589},
                            zoom: 10,
                            disableDefaultUI: true
                        });

                        var infoWindowGeo = new google.maps.InfoWindow();

                        // Try HTML5 geolocation.
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };

                                vm.lat = pos.lat;
                                vm.lng = pos.lng;
                                searchEvents();
                                // console.log(navigator.geolocation);
                                // getCityName(pos.lat, pos.lng);

                                // infoWindowGeo.setPosition(pos);
                                // infoWindowGeo.setContent('Location found.');
                                map.setCenter(pos);
                            }, function () {
                                handleLocationError(true, infoWindowGeo, map.getCenter());
                            });
                        } else {
                            // Browser doesn't support Geolocation
                            handleLocationError(false, infoWindowGeo, map.getCenter());
                        }

                        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                            infoWindow.setPosition(pos);
                            infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
                        }

                        // getEvents();

                        var input = /** @type {!HTMLInputElement} */(
                            document.getElementById('pac-input'));
                        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                        var autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
                        autocomplete.bindTo('bounds', map);

                        autocomplete.addListener('place_changed', function() {
                            document.getElementById('pac-input').focus();
                            var place = autocomplete.getPlace();
                            if (!place.geometry) {
                                window.alert("Autocomplete's returned place contains no geometry");
                                return;
                            }
                            console.log(place);
                            vm.location = place.name;
                            console.log(vm.location);
                            vm.lat = place.geometry.location.lat;
                            vm.lng = place.geometry.location.lng;
                            console.log(".."+vm.lat);
                            console.log(".."+vm.lng);
                            searchEvents();

                            // If the place has a geometry, then present it on a map.
                            if (place.geometry.viewport) {
                                map.fitBounds(place.geometry.viewport);
                            } else {
                                map.setCenter(place.geometry.location);
                                map.setZoom(10);  // Why 17? Because it looks good.
                            }

                            var address = '';
                            if (place.address_components) {
                                address = [
                                    (place.address_components[0] && place.address_components[0].short_name || ''),
                                    (place.address_components[1] && place.address_components[1].short_name || ''),
                                    (place.address_components[2] && place.address_components[2].short_name || '')
                                ].join(' ');
                            }
                        });

                        infoWindow = new google.maps.InfoWindow();

                        vm.openInfoWindow = function(e, selectedMarker){
                            console.log("click");
                            e.preventDefault();
                            google.maps.event.trigger(selectedMarker, 'click');
                        }
                    }
                );
        }
        init();

        function getCityName(latitude, longitude) {
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode(
                {'latLng': latlng},
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var add = results[0].formatted_address ;
                            var value = add.split(",");

                            count = value.length;
                            country = value[count-1];
                            state = value[count-2];
                            city = value[count-3];
                            vm.location = city;
                            console.log("city name is: " + city);
                        }
                        else  {
                            console.log("address not found");
                        }
                    }
                    else {
                        console.log("Geocoder failed due to: " + status);
                    }
                }
            );
        }

        function getEvents() {
            EventfulService
                .searchEvents(vm.searchText, vm.location)
                .then(
                    function (response) {
                        data = response.data;
                        // console.log("data = " + JSON.stringify(data));
                        vm.events = data.events;

                        for (var i = 0; i < vm.events.event.length; i++){
                            createMarker(vm.events.event[i]);
                        }
                    },
                    function (error) {
                        console.log("Something went wrong..." + error);
                    }
                );
        }

        function searchEvents() {
            console.log(vm.lat);
            console.log(vm.lng);
            EventfulService
                .searchEventsOnLatLng(vm.searchText, vm.lat, vm.lng)
                .then(
                    function (response) {
                        data = response.data;
                        // console.log("data = " + JSON.stringify(data));
                        vm.events = data.events;

                        for (var j=0; j < vm.markers.length; j++) {
                            vm.markers[j].setMap(null);
                        }
                        vm.markers = [];

                        // console.log("len = "+vm.events.event.length);
                        for (var i = 0; i < vm.events.event.length; i++){
                            createMarker(vm.events.event[i]);
                        }
                    },
                    function (error) {
                        console.log("Something went wrong..." + error);
                    }
                );
        }

        function createMarker(info){
            // console.log("in createMarker " + info.city_name);
            // console.log("in createMarker" + info.latitude);
            // console.log("in createMarker" + info.longitude);
            // console.log("in createMarker" + info.venue_name);
            var marker = new google.maps.Marker({
                map: vm.map,
                position: new google.maps.LatLng(info.latitude, info.longitude),
                title: info.title,
                startTime: info.start_time,
                venueName: info.venue_name,
                venueAddress: info.venue_address,
                imgUrl: (info.image != null ? info.image.medium.url : ""),
                eventId: info.id
            });
            // console.log("in createMarker " + marker.title);
            var event = {
                eventId: info.id,
                eventTitle: info.title,
                eventStartTime: info.start_time,
                eventUrl: info.url,
                eventDesc: info.description,
                eventImgUrl: (info.image != null ? info.image.medium.url : ""),
                eventVenueName: info.venue_name,
                eventVenueAddr: info.venue_address,
                eventVenueUrl: info.venue_url
            };
            // console.log("in createMarker .. " + event.eventId);
            EventService
                .createEvent(event)
                .then(function (response) {
                    // console.log("back in controller.. " + response);
                    var eventRes = response.data;
                    if (eventRes) {
                        console.log(eventRes._id);
                        marker.content = '<div class="infoWindowContent">'
                            + marker.venueName
                            + '<p>' + marker.venueAddress + '</p>'
                            + '<p> <a href="#/user/'
                            + vm.userId
                            + '/event/'
                            + eventRes._id
                            + '">Event Details</a> </p> </div>';

                        google.maps.event.addListener(marker, 'click', function(){
                            infoWindow.setContent('<div class="capitalize"><strong>' + marker.title.toLowerCase() + '</strong><br>' + marker.content);
                            infoWindow.open(vm.map, marker);
                        });

                        marker.setMap(map);

                        vm.markers.push(marker);
                    } else {
                        vm.showError = true;
                        vm.error = "Unable to create event";
                    }
                });
        }


        function getSafeHtml(description) {
            if(description != null) {
                return $sce.trustAsHtml(description);
            }
        }

        function getSafeUrl(eventUrl) {
            if(eventUrl != null) {
                return $sce.trustAsResourceUrl(eventUrl);
            }
        }

    }

    function EventDetailController($routeParams, EventService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.eId = $routeParams.eventId;
        vm.updateEvent = updateEvent;
        vm.deleteEvent = deleteEvent;
        vm.getSafeHtml = getSafeHtml;

        function init() {
            console.log(vm.eId);
            EventService
                .findEventById(vm.eId)
                .then(
                    function (response) {
                        vm.event = response.data;
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }
        init();
        
        function updateEvent() {
            EventService
                .updateEvent(vm.eId, event)
                .then(
                    function (response) {
                        vm.event = response.data;
                        console.log("event updated");
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function deleteEvent() {
            EventService
                .deleteEvent(vm.eId)
                .then(
                    function (response) {
                        console.log("event deleted");
                    },
                    function (error) {
                        console.log(error);
                    }
                );
        }

        function getSafeHtml(description) {
            if(description != null) {
                return $sce.trustAsHtml(description);
            }
        }
    }
})();
