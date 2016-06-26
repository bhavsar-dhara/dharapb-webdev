/**
 * Created by Dhara on 6/19/2016.
 */
(function () {
    angular
        .module("MusicAroundMe")
        .controller("EventsController", EventsController)
        .controller("EventDetailController", EventDetailController);

    var cities = [
        {
            city : 'Toronto',
            desc : 'This is the best city in the world!',
            lat : 43.7000,
            long : -79.4000
        },
        {
            city : 'New York',
            desc : 'This city is aiiiiite!',
            lat : 40.6700,
            long : -73.9400
        },
        {
            city : 'Chicago',
            desc : 'This is the second best city in the world!',
            lat : 41.8819,
            long : -87.6278
        },
        {
            city : 'Los Angeles',
            desc : 'This city is live!',
            lat : 34.0500,
            long : -118.2500
        },
        {
            city : 'Las Vegas',
            desc : 'Sin City...\'nuff said!',
            lat : 36.0800,
            long : -115.1522
        }
    ];
    
    function EventsController($routeParams, EventfulService, $sce, GoogleMapService) {
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

        function init() {
            EventfulService
                .searchEvents(vm.searchText, vm.location)
                .then(
                    function (response) {
                        data = response.data;
                        // console.log("data = " + JSON.stringify(data));
                        vm.events = data.events;
                    },
                    function (error) {
                        console.log("Something went wrong..." + error);
                    }
                );

            GoogleMapService
                .loadGMap("Boston")
                .then(
                    function (response) {
                        console.log(response);

                        map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: 38.9072, lng: -77.0369},
                            zoom: 13,
                            disableDefaultUI: true
                        });

                        var infoWindowGeo = new google.maps.InfoWindow({map: map});

                        // Try HTML5 geolocation.
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };

                                console.log(navigator.geolocation);
                                getCityName(pos.lat, pos.lng);

                                infoWindowGeo.setPosition(pos);
                                infoWindowGeo.setContent('Location found.');
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

                        function getCityName(latitude, longitude) {
                            var geocoder;
                            geocoder = new google.maps.Geocoder();
                            var latlng = new google.maps.LatLng(latitude, longitude);

                            geocoder.geocode(
                                {'latLng': latlng},
                                function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        if (results[0]) {
                                            var add= results[0].formatted_address ;
                                            var  value=add.split(",");

                                            count=value.length;
                                            country=value[count-1];
                                            state=value[count-2];
                                            city=value[count-3];
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

                        var input = /** @type {!HTMLInputElement} */(
                            document.getElementById('pac-input'));
                        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                        var autocomplete = new google.maps.places.Autocomplete(input, {types: ['geocode']});
                        autocomplete.bindTo('bounds', map);

                        var infowindow = new google.maps.InfoWindow();
                        var marker = new google.maps.Marker({
                            map: map,
                            anchorPoint: new google.maps.Point(0, -29)
                        });

                        autocomplete.addListener('place_changed', function() {
                            document.getElementById('pac-input').focus();
                            infowindow.close();
                            marker.setVisible(false);
                            var place = autocomplete.getPlace();
                            if (!place.geometry) {
                                window.alert("Autocomplete's returned place contains no geometry");
                                return;
                            }

                            // If the place has a geometry, then present it on a map.
                            if (place.geometry.viewport) {
                                map.fitBounds(place.geometry.viewport);
                            } else {
                                map.setCenter(place.geometry.location);
                                map.setZoom(17);  // Why 17? Because it looks good.
                            }
                            marker.setIcon(/** @type {google.maps.Icon} */({
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(35, 35)
                            }));
                            marker.setPosition(place.geometry.location);
                            marker.setVisible(true);

                            var address = '';
                            if (place.address_components) {
                                address = [
                                    (place.address_components[0] && place.address_components[0].short_name || ''),
                                    (place.address_components[1] && place.address_components[1].short_name || ''),
                                    (place.address_components[2] && place.address_components[2].short_name || '')
                                ].join(' ');
                            }

                            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                            infowindow.open(map, marker);
                        });

                        // var mapOptions = {
                        //     zoom: 4,
                        //     center: new google.maps.LatLng(40.0000, -98.0000),
                        //     mapTypeId: google.maps.MapTypeId.TERRAIN
                        // };
                        //
                        // vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                        //
                        // vm.markers = [];
                        //
                        // var infoWindow = new google.maps.InfoWindow();
                        //
                        // var createMarker = function (info){
                        //
                        //     var marker = new google.maps.Marker({
                        //         map: vm.map,
                        //         position: new google.maps.LatLng(info.lat, info.long),
                        //         title: info.city
                        //     });
                        //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                        //
                        //     google.maps.event.addListener(marker, 'click', function(){
                        //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        //         infoWindow.open(vm.map, marker);
                        //     });
                        //
                        //     vm.markers.push(marker);
                        //
                        // };
                        //
                        // for (i = 0; i < cities.length; i++){
                        //     createMarker(cities[i]);
                        // }
                        //
                        // vm.openInfoWindow = function(e, selectedMarker){
                        //     e.preventDefault();
                        //     google.maps.event.trigger(selectedMarker, 'click');
                        // }

                    }
                );
        }
        init();

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

    function EventDetailController($routeParams) {
        var vm = this;
        vm.userId = $routeParams.uid;


    }
})();
