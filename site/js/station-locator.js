

var stationLocator = {};

(function (stationLocator) {
    var map;
    var markers = [];
    var localPrefics = '';
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var geocoder;
    var trafficLayer = new google.maps.TrafficLayer();
    var infowindow = null;

    google.maps.event.addDomListener(window, 'load', initialize);
    // The following example creates complex markers to indicate beaches near
    // Sydney, NSW, Australia. Note that the anchor is set to
    // (0,32) to correspond to the base of the flagpole.

    function initialize() {
        directionsDisplay = new google.maps.DirectionsRenderer();


        var mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(37.0625, -95.677068),
            mapTypeControl: false

        }
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        directionsDisplay.setMap(map);

        //var input = ($('#pac-input')[0]);
        ////map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        //var searchBox = new google.maps.places.SearchBox((input));

        //addListener(searchBox, map);



        var arrayOfSearchInputs = $('.searchInput');
        var counter = arrayOfSearchInputs.length;

        while (counter--) {
            var inputS = (arrayOfSearchInputs[counter]);
            var searchBoxS = new google.maps.places.SearchBox((inputS));
            //addListener(searchBoxS, map);

            //console.log(arrayOfSearchInputs[counter]);
        }

        var mainSearchInput = $('#mainSearchInput');
        var mianSearchBox = new google.maps.places.SearchBox((mainSearchInput[0]));

        geocoder = new google.maps.Geocoder();
        initContextMenu();


        var form = $('form');
        form.on('submit', function (event) { event.preventDefault(); });
        // [START region_getplaces]
        // Listen for the event fired when the user selects an item from the
        // pick list. Retrieve the matching places for that item.
        google.maps.event.addListener(mianSearchBox, 'places_changed', function () {
            //console.log('new loc ' + searchBox.bounds.Ba.k);

            var places = mianSearchBox.getPlaces();

            //for (var i = 0, marker; marker = markers[i]; i++) {
            //    marker.setMap(null);
            //}

            //// For each place, get the icon, place name, and location.
            //markers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {
                var image = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };
                var marker = {};
                var mExists = false;

                var mCounter = markers.length;
                if (mCounter > 0) {
                    while (mCounter--) {
                        if (markers[mCounter].marketType == 'searchBox') {
                            markers[mCounter].setPosition(place.geometry.location);
                            mExists = true;
                            break;
                        }
                    }
                }


                // Create a marker for each place.
                if (!mExists) {
                    marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location,
                        marketType: 'searchBox'
                    });
                }

                markers.push(marker);
                if (i == 0) {
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);  // Why 17? Because it looks good.
                    }
                    //map.setCenter(marker.position);
                }


                //bounds.extend(place.geometry.location);
            }

            //map.fitBounds(bounds);

            //if (places.length > 0)
            //    map.setCenter(places[0].geometry.location);
            //console.log(places);

        });
        // [END region_getplaces]

        // Bias the SearchBox results towards places that are within the bounds of the
        // current map's viewport.
        google.maps.event.addListener(map, 'bounds_changed', function () {
            var bounds = map.getBounds();
            mianSearchBox.setBounds(bounds);
        });


        setTimeout(function () {
            resetParamnsToDefaults(true);
            loadListOfCoordinates('CL', true);
        }, 50)



        //setMarkers(map, beaches);
    }

    function addListener(searchBox, map) {
        google.maps.event.addListener(searchBox, 'places_changed', function () {
            //console.log('new loc ' + searchBox.bounds.Ba.k);

            var places = searchBox.getPlaces();

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = places[i]; i++) {


                bounds.extend(place.geometry.location);
            }

            map.fitBounds(bounds);
        });
    }

    /**
     * Data for the markers consisting of a name, a LatLng and a zIndex for
     * the order in which these markers should display on top of each
     * other.
     */
    var beaches = [
        ['Bondi Beach', 49.256472, -123.023465, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    function setMarkers(map, locations) {

        deleteMarkers();

        // Add markers to the map

        // Marker sizes are expressed as a Size of X,Y
        // where the origin of the image (0,0) is located
        // in the top left of the image.

        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        ////var image = {
        ////    url: '/StationLocator/Images/C.png',
        ////    // This marker is 20 pixels wide by 32 pixels tall.
        ////    size: new google.maps.Size(24, 40),
        ////    // The origin for this image is 0,0.
        ////    origin: new google.maps.Point(0, 0),
        ////    // The anchor for this image is the base of the flagpole at 0,32.
        ////    anchor: new google.maps.Point(0, 10)
        ////};
        // Shapes define the clickable region of the icon.
        // The type defines an HTML &lt;area&gt; element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coord: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };
        for (var i = 0; i < locations.length; i++) {
            var beach = locations[i];
            var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: getImage(beach[4]),
                shape: shape,
                title: beach[0],
                zIndex: beach[3],
                stationId: beach[5]
            });

            addMarker(marker);

            //console.log(beach[5]);
            google.maps.event.addListener(marker, 'click', function (e) {
                //console.log(this.get("stationId"));
                //console.log(e);

                if ($('.bottomPopup .pushUp').css('opacity') == 0) {
                    $('.bottomPopup .pushUp').css('opacity', '1');
                }
                getStationByStationId(this.get("stationId"));
            });
        }

        //console.log(markers);

        //setAllMap(map);

        showMarkers();


    }

    function getImage(rType) {
        var imageC = {
            url: localPrefics + '/Images/C.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(24, 44),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(12, 44)
        };

        var imageL = {
            url: localPrefics + '/Images/L.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(24, 44),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(12, 44)
        };

        var imageCL = {
            url: localPrefics + '/Images/CL.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(24, 44),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(12, 44)
        };

        //console.log(rType);

        if (rType == "C")
            return imageC;

        if (rType == "CL")
            return imageCL;

        if (rType == "L")
            return imageL;
    }




    //$(function () {
    //    setTimeout(function () {
    //        initCheckBoxes();
    //    }, 50);
    //});

    function loadListOfCoordinates(fType, withLocateMe) {
        thePlugin =
        {
            fuelType: fType
        };


        if (thePlugin != null) {

            var theData = JSON.stringify(thePlugin);
            $.ajax({
                type: "POST",
                url: localPrefics + "/home/GetListOfCoordinates",
                contentType: "application/json; charset=utf-8",
                data: theData,
                dataType: "json",
                success: function (e) {
                    //console.log('list of apps');
                    //console.log(e);

                    var tmpListOfBatches = new Array();
                    var tmpBatch;

                    var listOfAppsForPlugin = e;
                    var counter_1 = e.length;

                    while (counter_1--) {
                        //$('#' + e[counter_1]).prop("checked", true);
                        //console.log(e[counter_1]);
                        tmpBatch = [listOfAppsForPlugin[counter_1].StationName, listOfAppsForPlugin[counter_1].Latitude, listOfAppsForPlugin[counter_1].Longitude, 1, listOfAppsForPlugin[counter_1].StationType, listOfAppsForPlugin[counter_1].StationIdNumber];

                        tmpListOfBatches[counter_1] = tmpBatch;
                        //console.log(tmpListOfBatches[counter_1]);

                    }

                    //console.log(tmpListOfBatches);

                    beaches = tmpListOfBatches;
                    //initialize();



                    setMarkers(map, beaches);
                    //console.log(beaches);
                    if (withLocateMe)
                        locateMe(true);

                    /*hideLoading();
                     showLoadingWithoutLoading(e);
                     getNotes();
                     jQuery('#window #taNotes').val('');*/
                },
                beforeSend: function () {
                    /*showLoading('Creating Notes');*/
                }
            });

        }


    }



    function loadFilteredListOfCoordinates() {
        thePlugin =
            getFilterObject();

        //console.log();

        if (thePlugin != null) {

            var theData = JSON.stringify(thePlugin);
            $.ajax({
                type: "POST",
                url: localPrefics + "/home/GetFilteredListOfCoordinates",
                contentType: "application/json; charset=utf-8",
                data: theData,
                dataType: "json",
                success: function (e) {
                    //console.log('list of apps');
                    var tmpListOfBatches = new Array();
                    var tmpBatch;

                    var listOfAppsForPlugin = e;
                    var counter_1 = e.length;

                    while (counter_1--) {
                        tmpBatch = [listOfAppsForPlugin[counter_1].StationName, listOfAppsForPlugin[counter_1].Latitude, listOfAppsForPlugin[counter_1].Longitude, 1, listOfAppsForPlugin[counter_1].StationType, listOfAppsForPlugin[counter_1].StationIdNumber];
                        tmpListOfBatches[counter_1] = tmpBatch;


                    }

                    beaches = tmpListOfBatches;
                    setMarkers(map, beaches);

                },
                beforeSend: function () {
                    /*showLoading('Creating Notes');*/
                }
            });

        }


    }


    function getStationByStationId(stId) {
        thePlugin =
        {
            stationId: stId
        };


        if (thePlugin != null) {

            var theData = JSON.stringify(thePlugin);
            $.ajax({
                type: "POST",
                url: localPrefics + "/home/GetStationByStationId",
                contentType: "application/json; charset=utf-8",
                data: theData,
                dataType: "json",
                success: function (e) {
                    //console.log('single station');
                    //console.log(e);

                    populateBottomPanel(e);

                    //var tmpListOfBatches = new Array();
                    //var tmpBatch;

                    //var listOfAppsForPlugin = e;
                    //var counter_1 = e.length;

                    //while (counter_1--) {
                    //    tmpBatch = [listOfAppsForPlugin[counter_1].StationName, listOfAppsForPlugin[counter_1].Latitude, listOfAppsForPlugin[counter_1].Longitude, 1, listOfAppsForPlugin[counter_1].StationType, listOfAppsForPlugin[counter_1].StationIdNumber];

                    //    tmpListOfBatches[counter_1] = tmpBatch;

                    //}
                    //beaches = tmpListOfBatches;
                    //setMarkers(map, beaches);
                },
                beforeSend: function () {
                    /*showLoading('Creating Notes');*/
                }
            });

        }


    }

    function sendEmail() {
        var emailName = $('#inputName');
        var emailEmail = $('#inputEmail');
        var emailText = $('#textAreaSubject');

        if (emailName.val().length > 0 && emailEmail.val().length > 0) {
            thePlugin =
            {
                EmailName: emailName.val(),
                EmailAddress: emailEmail.val(),
                EmailBody: emailText.val()
            };


            if (thePlugin != null) {

                var theData = JSON.stringify(thePlugin);
                $.ajax({
                    type: "POST",
                    url: localPrefics + "/home/SendEmail",
                    contentType: "application/json; charset=utf-8",
                    data: theData,
                    dataType: "json",
                    success: function (e) {
                        //console.log('single station');
                        //console.log(e);

                        //populateBottomPanel(e);
                        //console.log(e);

                        var emailStatus = $('#spanEmailStatus');

                        emailStatus.text(e.EmailStatusMessage);
                    },
                    beforeSend: function () {
                        /*showLoading('Creating Notes');*/
                    }
                });

            }
        }
        else {
            var emailStatus = $('#spanEmailStatus');

            emailStatus.text('Please enter Your Name and Email.');
        }


    }

    function hidePanel() {
        $('#divPanel').hide('slow')

        return false;
    }

    function processDirectionsList() {
        var arr = $('.ui-state-default');
        var counter = arr.length;
        var tmpButton;

        if (counter > 1) {
            while (counter--) {
                var tmpLi = $(arr[counter]).find('input');
                var tmpSpan = $(arr[counter]).find('span.dectination-icon');

                if (tmpLi != null) {
                    //console.log(tmpLi.val());
                    //console.log(tmpSpan);
                    tmpSpan.attr('class', 'dectination-icon dectination-icon-middle');
                    tmpButton = $(arr[counter]).find('button.widget-removeDirection');
                    tmpButton.show();
                }
            }

            var tmpSpan = $(arr[0]).find('span.dectination-icon');
            tmpSpan.attr('class', 'dectination-icon dectination-icon-start');

            tmpSpan = $(arr[arr.length - 1]).find('span.dectination-icon');
            tmpSpan.attr('class', 'dectination-icon dectination-icon-end');

            tmpButton = $(arr[0]).find('button.widget-removeDirection');
            tmpButton.hide();

            tmpButton = $(arr[arr.length - 1]).find('button.widget-removeDirection');
            tmpButton.hide();
        }
    }

    function isTripPlannerEmpty() {
        var arr = $('.ui-state-default');
        var counter = arr.length;
        var tmpButton;

        if (counter > 1) {

            var start = $(arr[0]).find('input').val();
            var end = $(arr[arr.length - 1]).find('input').val();


            if (counter == 2 && (start == '' && end == '') || (start == 'Start Point' && end == 'End Point')) {
                return true;
                //console.log('trip planner is empty');
            }
            else {
                return false;
                //console.log('trip planner is not empty');
            }
        }
    }


    function buildRout() {

        var waypts = [];
        var arr = $('.ui-state-default');
        var counter = arr.length;

        //directionsDisplay.setMap(null);

        if (counter > 2)
            for (var i = 1; i < counter - 1; i++) {

                var tmpLi = $(arr[i]).find('input');

                if (tmpLi != null && tmpLi.val() != null && tmpLi.val().length > 0) {
                    waypts.push({
                        location: tmpLi.val(),
                        stopover: true
                    });
                }

            }


        var start = $(arr[0]).find('input').val();
        var end = $(arr[arr.length - 1]).find('input').val();

        //console.log('waypts');
        //console.log(waypts);
        //console.log('start');
        //console.log(start);
        //console.log('end');
        //console.log(end);

        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.alternatives = true;
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setDirections(response);

                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);

                var route = response.routes[0]
                var totalDistanse = 0;


                for (var i = 0; i < route.legs.length; i++) {
                    totalDistanse += route.legs[i].distance.value;
                    //console.log(route.legs[i].distance);
                }

                //console.log(Math.round(totalDistanse / 1609));

                //var route = response.routes[0];
                //var summaryPanel = document.getElementById('directions_panel');
                //summaryPanel.innerHTML = '';
                //// For each route, display summary information.
                //for (var i = 0; i < route.legs.length; i++) {
                //    var routeSegment = i + 1;
                //    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
                //    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                //    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                //    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                //}
            }
            else {
                alert(status + '. Please enter correct Start and Destination Points');
            }

        });

    }

    function initSearchForAddedSearchBox(addresBox) {
        if (addresBox == null) {
            var arr = $('.ui-state-default');
            var counter = arr.length;

            if (counter > 1) {

                var tmpLi = $(arr[counter - 1]).find('input');
                //console.log(tmpLi);
                var searchBoxS = new google.maps.places.SearchBox((tmpLi[0]));
            }
        }
        else
        {
            var arr = $('.ui-state-default');
            var counter = arr.length;

            if (counter > 1) {
                var searchBoxS = new google.maps.places.SearchBox((addresBox[0]));
            }
        }

    }

    function changeStartAndEndValues() {
        var arr = $('.ui-state-default');
        var counter = arr.length;

        if (counter > 1) {

            var tmpValue;

            var tmpLiStart = $(arr[0]).find('input');
            var tmpLiEnd = $(arr[counter - 1]).find('input');

            tmpValue = tmpLiStart.val();
            tmpLiStart.val(tmpLiEnd.val());
            tmpLiEnd.val(tmpValue);

        }
    }



    // Add a marker to the map and push to the array.
    function addMarker(marker) {

        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function setAllMap(map) {

        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);

            //console.log('trying to show markers');
            //console.log(markers[i]);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setAllMap(null);
    }

    // Shows any markers currently in the array.
    function showMarkers() {
        setAllMap(map);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function initContextMenu() {
        var contextMenuOptions = {};
        contextMenuOptions.classNames = { menu: 'context_menu', menuSeparator: 'context_menu_separator' };

        //	create an array of ContextMenuItem objects
        //	an 'id' is defined for each of the four directions related items
        var menuItems = [];
        menuItems.push({ className: 'context_menu_item', eventName: 'directions_origin_click', id: 'directionsOriginItem', label: 'Directions from here' });
        menuItems.push({ className: 'context_menu_item', eventName: 'directions_destination_click', id: 'directionsDestinationItem', label: 'Directions to here' });
        menuItems.push({ className: 'context_menu_item', eventName: 'clear_directions_click', id: 'clearDirectionsItem', label: 'Clear directions' });
        menuItems.push({ className: 'context_menu_item', eventName: 'get_directions_click', id: 'getDirectionsItem', label: 'Get directions' });
        //	a menuItem with no properties will be rendered as a separator
        menuItems.push({});
        menuItems.push({ className: 'context_menu_item', eventName: 'zoom_in_click', label: 'Zoom in' });
        menuItems.push({ className: 'context_menu_item', eventName: 'zoom_out_click', label: 'Zoom out' });
        menuItems.push({});
        menuItems.push({ className: 'context_menu_item', eventName: 'center_map_click', label: 'Center map here' });
        contextMenuOptions.menuItems = menuItems;

        var contextMenu = new ContextMenu(map, contextMenuOptions);

        google.maps.event.addListener(map, 'rightclick', function (mouseEvent) {
            contextMenu.show(mouseEvent.latLng);

            //console.log(mouseEvent);
        });

        //	create markers to show directions origin and destination
        //	both are not visible by default
        var markerOptions = {};
        markerOptions.icon = 'http://www.google.com/intl/en_ALL/mapfiles/markerA.png';
        markerOptions.map = null;
        markerOptions.position = new google.maps.LatLng(0, 0);
        markerOptions.title = 'Directions origin';

        var originMarker = new google.maps.Marker(markerOptions);

        markerOptions.icon = 'http://www.google.com/intl/en_ALL/mapfiles/markerB.png';
        markerOptions.title = 'Directions destination';
        var destinationMarker = new google.maps.Marker(markerOptions);

        //	listen for the ContextMenu 'menu_item_selected' event
        google.maps.event.addListener(contextMenu, 'menu_item_selected', function (latLng, eventName) {
            switch (eventName) {
                case 'directions_origin_click':
                    originMarker.setPosition(latLng);
                    if (!originMarker.getMap()) {
                        originMarker.setMap(map);
                    }

                    decodeCoodinates(latLng, 'start', null, 1);
                    break;
                case 'directions_destination_click':
                    destinationMarker.setPosition(latLng);
                    if (!destinationMarker.getMap()) {
                        destinationMarker.setMap(map);
                    }
                    decodeCoodinates(latLng, 'end', null, 1);
                    break;
                case 'clear_directions_click':
                    directionsDisplay.setMap(null);
                    //	set CSS styles to defaults
                    document.getElementById('clearDirectionsItem').style.display = '';
                    document.getElementById('directionsDestinationItem').style.display = '';
                    document.getElementById('directionsOriginItem').style.display = '';
                    document.getElementById('getDirectionsItem').style.display = '';
                    break;
                case 'get_directions_click':
                    var directionsRequest = {};
                    directionsRequest.destination = destinationMarker.getPosition();
                    directionsRequest.origin = originMarker.getPosition();
                    directionsRequest.travelMode = google.maps.TravelMode.DRIVING;

                    directionsService.route(directionsRequest, function (result, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            //	hide the origin and destination markers as the directionsDisplay will render Markers itself
                            originMarker.setMap(null);
                            destinationMarker.setMap(null);
                            directionsDisplay.setDirections(result);
                            directionsDisplay.setMap(map);
                            //	hide all but the 'Clear directions' menu item
                            document.getElementById('clearDirectionsItem').style.display = 'block';
                            document.getElementById('directionsDestinationItem').style.display = 'none';
                            document.getElementById('directionsOriginItem').style.display = 'none';
                            document.getElementById('getDirectionsItem').style.display = 'none';
                        } else {
                            alert('Sorry, the map was unable to obtain directions.\n\nThe request failed with the message: ' + status);
                        }
                    });
                    break;
                case 'zoom_in_click':
                    map.setZoom(map.getZoom() + 1);
                    break;
                case 'zoom_out_click':
                    map.setZoom(map.getZoom() - 1);
                    break;
                case 'center_map_click':
                    map.panTo(latLng);
                    break;
            }
            if (originMarker.getMap() && destinationMarker.getMap() && document.getElementById('getDirectionsItem').style.display === '') {
                //	display the 'Get directions' menu item if it is not visible and both directions origin and destination have been selected
                document.getElementById('getDirectionsItem').style.display = 'block';
            }
        });
    }


    function decodeCoodinates(latlng, destination, exactAddress, numberOfresults) {
        //console.log('decoding');
        if (exactAddress == null || exactAddress == '') {
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //console.log(results);
                    if (results[1]) {
                        //map.setZoom(11);
                        //marker = new google.maps.Marker({
                        //    position: latlng,
                        //    map: map
                        //});
                        //infowindow.setContent(results[1].formatted_address);
                        //infowindow.open(map, marker);
                        //console.log(results[1].formatted_address);

                        var arr = $('.ui-state-default');
                        var counter = arr.length;

                        if (counter > 1) {

                            var tmpValue;

                            var tmpLiStart = $(arr[0]).find('input');
                            var tmpLiEnd = $(arr[counter - 1]).find('input');

                            if (destination == 'start') {
                                if (numberOfresults != null)
                                    tmpLiStart.val(results[numberOfresults].formatted_address);
                                else
                                    tmpLiStart.val(results[0].formatted_address);
                            }

                            if (destination == 'end') {
                                if (numberOfresults != null)
                                    tmpLiEnd.val(results[numberOfresults].formatted_address);
                                else
                                    tmpLiEnd.val(results[0].formatted_address);
                            }
                            //tmpValue = tmpLiStart.val();
                            //tmpLiStart.val(tmpLiEnd.val());
                            //tmpLiEnd.val(tmpValue);

                        }

                    } else {
                        alert('No results found');
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });
        }
        else {
            var arr = $('.ui-state-default');
            var counter = arr.length;

            if (counter > 1) {

                var tmpValue;

                var tmpLiStart = $(arr[0]).find('input');
                var tmpLiEnd = $(arr[counter - 1]).find('input');

                if (destination == 'start') {
                    tmpLiStart.val(exactAddress);
                }

                if (destination == 'end') {
                    tmpLiEnd.val(exactAddress);
                }
            }
        }

    }

    function removeDirection(element) {
        var tmpLi = $(element).parent();
        tmpLi.remove();
        //console.log(element);
        //console.log(tmpLi);
    }




    function clearRoute() {
        var arr = $('.ui-state-default');
        var counter = arr.length;
        var tmpButton;

        if (counter > 1) {
            while (counter--) {
                if ($(arr[counter]) != null) {
                    $(arr[counter]).remove()
                }
            }


        }

        var $liStart = $("<li class='ui-state-default'><span class='dectination-icon dectination-icon-start'></span><input title='' style='' placeholder='Start Point' class='searchInput'><button class='widget-removeDirection' onclick='stationLocator.removeDirection(this);'>-</button><span class='directions-underline'></span></li>");
        $("#sortable").append($liStart);
        var $liEnd = $("<li class='ui-state-default'><span class='dectination-icon dectination-icon-start'></span><span class='icon-start'></span><input title='' style='' placeholder='End Point' class='searchInput'><button class='widget-removeDirection' onclick='stationLocator.removeDirection(this);'><span></span></button><span class='directions-underline'></span></li>");
        $("#sortable").append($liEnd);

        $("#sortable").sortable('refresh');

        processDirectionsList();

        directionsDisplay.setMap(null);




        arr = $('.ui-state-default');
        counter = arr.length;
        if (counter > 1) {
            var tmpLiStart = $(arr[0]).find('input');
            var tmpLiEnd = $(arr[counter - 1]).find('input');
            initSearchForAddedSearchBox(tmpLiStart);
            initSearchForAddedSearchBox(tmpLiEnd);
        }

    }



    function locateMe(withNearest) {
        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);


                //var latLong = new google.maps.LatLng('33.6671539', '-117.858567');
                //pos = latLong;
                if (infowindow)
                    infowindow.close();


                infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'You are here.&nbsp;&nbsp;&nbsp;'
                });

                map.setCenter(pos);
                if (withNearest)
                    findClosestMarker(pos);

            }, function () {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }

    }


    function locateMeFromStation(locateType) {

        if (locateType == 'tripPlanner') {
            var dc = $('.directionsControl');
            dc.show('slow');

            if ($('#markerPosition').length > 0) {
                // Try HTML5 geolocation
                if (isTripPlannerEmpty()) {

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var pos = new google.maps.LatLng(position.coords.latitude,
                                position.coords.longitude);

                            if (infowindow)
                                infowindow.close();

                            infowindow = new google.maps.InfoWindow({
                                map: map,
                                position: pos,
                                content: 'You are here.&nbsp;&nbsp;&nbsp;'
                            });

                            map.setCenter(pos);


                            //var dc = $('.directionsControl');
                            //dc.show('slow');

                            var tmpLog = $('#markerPosition').val().split(',')[0];
                            var tmpLat = $('#markerPosition').val().split(',')[1];

                            //console.log(tmpLog);
                            //console.log(tmpLat);
                            //console.log(pos);

                            decodeCoodinates(pos, 'start');
                            //console.log(pos);
                            var endPos = new google.maps.LatLng(tmpLat,
                                tmpLog);

                            //var stAddress = $('#bottomStAddress');
                            //decodeCoodinates(endPos, 'end', $('#bottomStAddress').text());


                        }, function () {
                            handleNoGeolocation(true);
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleNoGeolocation(false);
                    }

                    var stAddress = $('#bottomStAddress');
                    decodeCoodinates(null, 'end', $('#bottomStAddress').text());
                }
                else {


                    addDestinationToTripPlanner();
                    var stAddress = $('#bottomStAddress');
                    var endPos = {};
                    decodeCoodinates(endPos, 'end', $('#bottomStAddress').text());
                }
            }
        }

        if (locateType == 'getDirections') {

            if ($('#markerPosition').length > 0) {
                // Try HTML5 geolocation
                if (isTripPlannerEmpty()) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var pos = new google.maps.LatLng(position.coords.latitude,
                                position.coords.longitude);

                            if (infowindow)
                                infowindow.close();

                            infowindow = new google.maps.InfoWindow({
                                map: map,
                                position: pos,
                                content: 'You are here.&nbsp;&nbsp;&nbsp;'
                            });

                            map.setCenter(pos);


                            var dc = $('.directionsControl');
                            dc.show('slow');

                            var tmpLog = $('#markerPosition').val().split(',')[0];
                            var tmpLat = $('#markerPosition').val().split(',')[1];

                            //console.log(tmpLog);
                            //console.log(tmpLat);
                            //console.log(pos);

                            decodeCoodinates(pos, 'start');
                            //console.log(pos);
                            var endPos = new google.maps.LatLng(tmpLat,
                                tmpLog);

                            var stAddress = $('#bottomStAddress');
                            decodeCoodinates(endPos, 'end', $('#bottomStAddress').text());


                        }, function () {
                            handleNoGeolocation(true);
                        });
                    } else {
                        // Browser doesn't support Geolocation
                        handleNoGeolocation(false);
                    }
                }
                else {
                    var r = confirm("Your current trip will be cleared.");
                    if (r == true) {
                        clearRoute();
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var pos = new google.maps.LatLng(position.coords.latitude,
                                    position.coords.longitude);

                                if (infowindow)
                                    infowindow.close();

                                infowindow = new google.maps.InfoWindow({
                                    map: map,
                                    position: pos,
                                    content: 'You are here.&nbsp;&nbsp;&nbsp;'
                                });

                                map.setCenter(pos);


                                var dc = $('.directionsControl');
                                dc.show('slow');

                                var tmpLog = $('#markerPosition').val().split(',')[0];
                                var tmpLat = $('#markerPosition').val().split(',')[1];

                                //console.log(tmpLog);
                                //console.log(tmpLat);
                                //console.log(pos);

                                decodeCoodinates(pos, 'start');
                                //console.log(pos);
                                var endPos = new google.maps.LatLng(tmpLat,
                                    tmpLog);

                                var stAddress = $('#bottomStAddress');
                                decodeCoodinates(endPos, 'end', $('#bottomStAddress').text());


                            }, function () {
                                handleNoGeolocation(true);
                            });
                        } else {
                            // Browser doesn't support Geolocation
                            handleNoGeolocation(false);
                        }
                    }
                }
            }
        }
    }


    function findClosestMarker(pos) {
        var lat = pos.k;
        var lng = pos.A;
        var R = 6371; // radius of earth in km
        var distances = [];
        var closest = -1;
        for (i = 0; i < markers.length; i++) {
            var mlat = markers[i].position.lat();
            var mlng = markers[i].position.lng();
            var dLat = toRad(mlat - lat);
            var dLong = toRad(mlng - lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat)) * Math.cos(toRad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            distances[i] = d;
            if (closest == -1 || d < distances[closest]) {
                closest = i;
            }
        }
        if (closest > -1) {

            //console.log(markers[closest].title);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(pos);
            bounds.extend(markers[closest].position);

            var moduleLat = Math.abs(pos.lat() - markers[closest].position.lat());
            var moduleLong = Math.abs(pos.lng() - markers[closest].position.lng());

            //console.log(moduleLat);
            //console.log(moduleLong);
            //console.log(pos);
            //console.log(anotherCorner);

            if (pos.lng() > markers[closest].position.lng()) {
                if (pos.lng() < 0)
                    moduleLong = pos.lng() - moduleLong;
                else
                    moduleLong = pos.lng() + moduleLong;
            }
            else {
                if (pos.lng() < 0)
                    moduleLong = pos.lng() + moduleLong;
                else
                    moduleLong = pos.lng() - moduleLong;
            }


            if (pos.lat() > markers[closest].position.lat()) {
                if (pos.lat() < 0)
                    moduleLat = pos.lat() - moduleLat;
                else
                    moduleLat = pos.lat() + moduleLat;
            }
            else {
                if (pos.lat() < 0)
                    moduleLat = pos.lat() + moduleLat;
                else
                    moduleLat = pos.lat() - moduleLat;
            }

            var anotherCorner = new google.maps.LatLng(moduleLat, moduleLong);





            bounds.extend(anotherCorner);

            map.fitBounds(bounds);


        }
        else {
            //console.log('no closest');
        }
    }

    function toRad(number) {
        return number * Math.PI / 180;
    }


    function setMapView(view) {

        if (view != 'traffic' && view != 'removeTraffic') {
            if ($('#spanArial').hasClass('aerial'))
                view = 'sat';
            else
                view = 'roadmap';

            if (view == 'roadmap') {
                map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
                $('#spanArial').attr('class', 'sl-icon aerial');
                $('#spanArialText').text('Aerial View');
            }

            if (view == 'sat') {
                map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                $('#spanArial').attr('class', 'sl-icon map');
                $('#spanArialText').text('Map View');
            }
        }


        if (view == 'traffic') {
            trafficLayer.setMap(map);
        }


        if (view == 'removeTraffic') {
            trafficLayer.setMap(null);
        }
    }


    function getFilterObject() {
        var filterObject = {};


        //data-filter-type="fuel"
        filterObject.StationFuelTypeCNG = $('#stationFuelTypeLNG').is(':checked');
        filterObject.StationFuelTypeLNG = $('#stationFuelTypeCNG').is(':checked');

        filterObject.StationFuelTypeDSL = $('#stationFuelTypeDSL').is(':checked');
        filterObject.StationFuelTypeRDM = $('#stationFuelTypeRDM').is(':checked');

        //data-filter-type="time"
        filterObject.HoursOpen = $('#hoursOpen').is(':checked');
        filterObject.HoursOpenIs24H = $('#hoursOpenIs24H').is(':checked');

        //data-filter-type="vehicle"
        filterObject.VehicleTypesCarsAndVans = $('#vehicleTypesCarsAndVans').is(':checked');
        filterObject.VehicleTypesBoxTrucks = $('#vehicleTypesBoxTrucks').is(':checked');
        filterObject.VehicleTypesSemiTrucks = $('#vehicleTypesSemiTrucks').is(':checked');

        //data-filter-type="flowRate"
        filterObject.FlowRateLow = $('#flowRateLow').is(':checked');
        filterObject.FlowRateMedium = $('#flowRateMedium').is(':checked');
        filterObject.FlowRateHigh = $('#flowRateHigh').is(':checked');

        //data-filter-type="payment"
        filterObject.PaymentTypesAcceptedCleanEnergyFuelCard = $('#paymentTypesAcceptedCleanEnergyFuelCard').is(':checked');
        filterObject.PaymentTypesAcceptedMasterCard = $('#paymentTypesAcceptedMasterCard').is(':checked');
        filterObject.PaymentTypesAcceptedVisa = $('#paymentTypesAcceptedVisa').is(':checked');
        filterObject.PaymentTypesAcceptedDiscover = $('#paymentTypesAcceptedDiscover').is(':checked');
        filterObject.PaymentTypesAcceptedWrightExpress = $('#paymentTypesAcceptedWrightExpress').is(':checked');
        filterObject.PaymentTypesAcceptedVoyager = $('#paymentTypesAcceptedVoyager').is(':checked');
        filterObject.PaymentTypesAcceptedTranStar = $('#paymentTypesAcceptedTranStar').is(':checked');
        filterObject.PaymentTypesAcceptedNaturalFuels = $('#paymentTypesAcceptedNaturalFuels').is(':checked');

        return filterObject;
        //console.log('111');
        //console.log(filterObject);
    }

    function setDefaultValues() {
        //data-filter-type="fuel"
        $('#stationFuelTypeCNG').removeAttr('checked');
        $('#stationFuelTypeLNG').removeAttr('checked');
        $('#stationFuelTypeDSL').removeAttr('checked');
        $('#stationFuelTypeRDM').removeAttr('checked');

        //data-filter-type="time"
        $('#hoursOpen').removeAttr('checked');
        $('#hoursOpenIs24H').removeAttr('checked');

        //data-filter-type="vehicle"
        $('#vehicleTypesCarsAndVans').removeAttr('checked');
        $('#vehicleTypesBoxTrucks').removeAttr('checked');
        $('#vehicleTypesSemiTrucks').removeAttr('checked');

        //data-filter-type="flowRate"
        $('#flowRateLow').removeAttr('checked');
        $('#flowRateMedium').removeAttr('checked');
        $('#flowRateHigh').removeAttr('checked');

        //data-filter-type="payment"
        $('#paymentTypesAcceptedCleanEnergyFuelCard').removeAttr('checked');
        $('#paymentTypesAcceptedMasterCard').removeAttr('checked');
        $('#paymentTypesAcceptedVisa').removeAttr('checked');
        $('#paymentTypesAcceptedDiscover').removeAttr('checked');
        $('#paymentTypesAcceptedWrightExpress').removeAttr('checked');
        $('#paymentTypesAcceptedVoyager').removeAttr('checked');
        $('#paymentTypesAcceptedTranStar').removeAttr('checked');
        $('#paymentTypesAcceptedNaturalFuels').removeAttr('checked');
    }


    function processCheckAndUncheckAllPayments() {
        var anyCheckBox = $('#paymentTypesAcceptedAny');
        //console.log(anyCheckBox.is(':checked'));

        if (anyCheckBox.is(':checked')) {
            $('#paymentTypesAcceptedCleanEnergyFuelCard').attr('checked', 'checked');
            $('#paymentTypesAcceptedMasterCard').attr('checked', 'checked');
            $('#paymentTypesAcceptedVisa').attr('checked', 'checked');
            $('#paymentTypesAcceptedDiscover').attr('checked', 'checked');
            $('#paymentTypesAcceptedWrightExpress').attr('checked', 'checked');
            $('#paymentTypesAcceptedVoyager').attr('checked', 'checked');
            $('#paymentTypesAcceptedTranStar').attr('checked', 'checked');
            $('#paymentTypesAcceptedNaturalFuels').attr('checked', 'checked');

            anyCheckBox.parent().parent().parent().find('div').removeClass('newRadioOff').removeClass('newRadiOn');
            anyCheckBox.parent().parent().parent().find('div').addClass('newRadioOn');
        }
        else {
            $('#paymentTypesAcceptedCleanEnergyFuelCard').removeAttr('checked');
            $('#paymentTypesAcceptedMasterCard').removeAttr('checked');
            $('#paymentTypesAcceptedVisa').removeAttr('checked');
            $('#paymentTypesAcceptedDiscover').removeAttr('checked');
            $('#paymentTypesAcceptedWrightExpress').removeAttr('checked');
            $('#paymentTypesAcceptedVoyager').removeAttr('checked');
            $('#paymentTypesAcceptedTranStar').removeAttr('checked');
            $('#paymentTypesAcceptedNaturalFuels').removeAttr('checked');

            anyCheckBox.parent().parent().parent().find('div').removeClass('newRadioOff').removeClass('newRadiOn');
            anyCheckBox.parent().parent().parent().find('div').addClass('newRadioOff');
        }
    }


    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
            map: map,
            position: new google.maps.LatLng(37.0625, -95.677068),
            content: content
        };

        if (infowindow)
            infowindow.close();

        infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    }

    function populateBottomPanel(station) {
        var stName = $('#bottomStName');
        var stAddress = $('#bottomStAddress');
        var stAccept = $('#bottomStAccepts');

        var stRdm = $('#bottomStRdm');
        var stCng = $('#bottomStLng');
        var stLng = $('#bottomStCng');
        var stDiesel = $('#bottomStDiesel');


        var stCars = $('#bottomStCars');
        var stTruck = $('#bottomStTruck');
        var stSemiTrack = $('#bottomStSemiTrack');

        var stMarkerPosition = $('#markerPosition');

        stMarkerPosition.val(station.Longitude + ', ' + station.Latitude);


        var acceptValue = '';

        if (station.PaymentTypesAcceptedCleanEnergyFuelCard == "Yes")
            acceptValue += 'Clean Energy Fuel Card, ';

        if (station.PaymentTypesAcceptedMasterCard == "Yes")
            acceptValue += 'Mastercard, ';

        if (station.PaymentTypesAcceptedVisa == "Yes")
            acceptValue += 'Visa, ';

        if (station.PaymentTypesAcceptedDiscover == "Yes")
            acceptValue += 'Discover, ';

        if (station.PaymentTypesAcceptedWrightExpress == "Yes")
            acceptValue += 'WEX, ';

        if (station.PaymentTypesAcceptedVoyager == "Yes")
            acceptValue += 'Voyager, ';

        if (station.PaymentTypesAcceptedTranStar == "Yes")
            acceptValue += 'TranStar, ';

        if (station.PaymentTypesAcceptedNaturalFuels == "Yes")
            acceptValue += 'Other, ';

        if (acceptValue.length > 3)
            acceptValue = acceptValue.substring(0, acceptValue.length - 2);

        stRdm.removeClass('available');
        stLng.removeClass('available');
        stCng.removeClass('available');
        stDiesel.removeClass('available');

        if (station.StationFuelTypeCNG == "Yes")
            stCng.addClass('available');

        if (station.StationFuelTypeLNG == "Yes")
            stLng.addClass('available');

        if (station.StationFuelTypeDSL == "Yes")
            stDiesel.addClass('available');

        if (station.StationFuelTypeRDM == "Yes")
            stRdm.addClass('available');


        if (station.VehicleTypesCarsAndVans == "Yes")
            stCars.addClass('available');

        if (station.VehicleTypesBoxTrucks == "Yes")
            stTruck.addClass('available');

        if (station.VehicleTypesSemiTrucks == "Yes")
            stSemiTrack.addClass('available');

        //stCars.removeClass('available');
        //stTruck.removeClass('available');
        //stSemiTrack.removeClass('available');




        //console.log(station);
        //console.log(acceptValue);

        stName.text(station.StationName);
        stAddress.text(station.StationAddress + ', ' + station.StationCity + ', ' + station.StationZip);//city, state zip
        stAccept.text(acceptValue);


        popup = "closed";
        $('.bottomPopup .pushUp').trigger('click');
    }


    function resetParamnsToDefaults(returnToInitials) {
        if (returnToInitials)
            setDefaultValues();

        $('#stationFuelTypeCNG').prop('checked', 'checked');
        $('#stationFuelTypeLNG').prop('checked', 'checked');
        $('#stationFuelTypeDSL').prop('checked', 'checked');
        $('#stationFuelTypeRDM').prop('checked', 'checked');



        //Lng Cng
        if ($('#stationFuelTypeCNG').is(':checked')) {
            $('#stationFuelTypeCNG').closest('label').find('span').removeClass('active');
            $('#stationFuelTypeCNG').closest('label').find('span').addClass('active');
        }

        if ($('#stationFuelTypeLNG').is(':checked')) {
            $('#stationFuelTypeLNG').closest('label').find('span').removeClass('active');
            $('#stationFuelTypeLNG').closest('label').find('span').addClass('active');
        }


        if ($('#stationFuelTypeDSL').is(':checked')) {
            $('#stationFuelTypeDSL').closest('label').find('span').removeClass('active');
            $('#stationFuelTypeDSL').closest('label').find('span').addClass('active');
        }

        if ($('#stationFuelTypeRDM').is(':checked')) {
            $('#stationFuelTypeRDM').closest('label').find('span').removeClass('active');
            $('#stationFuelTypeRDM').closest('label').find('span').addClass('active');
        }
        //Cars
        $('#vehicleTypesCarsAndVans').closest('label').removeClass('checked');
        $('#vehicleTypesBoxTrucks').closest('label').removeClass('checked');
        $('#vehicleTypesSemiTrucks').closest('label').removeClass('checked');

        //Hours
        $('#hoursOpen').closest('div').attr('class', 'newRadioOff');
        $('#hoursOpenIs24H').closest('div').attr('class', 'newRadioOff');
        //Flow Rate
        $('#flowRateLow').closest('div').attr('class', 'newRadioOff');
        $('#flowRateMedium').closest('div').attr('class', 'newRadioOff');
        $('#flowRateHigh').closest('div').attr('class', 'newRadioOff');
        //Credit Cards
        $('#paymentTypesAcceptedCleanEnergyFuelCard').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedMasterCard').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedVisa').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedDiscover').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedWrightExpress').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedVoyager').closest('div').attr('class', 'newRadioOff');
        $('#paymentTypesAcceptedTranStar').closest('div').attr('class', 'newRadioOff');
        ////data-filter-type="payment"
        var arrOfMenuItems = $('.stationTypeMenu .menuItem');
        var counter = arrOfMenuItems.length;
        var mItem = {};

        while (counter--) {
            //console.log(arrOfMenuItems[counter]);
            mItem = $(arrOfMenuItems[counter]);

            if (mItem.find('#cngBtgDiv').length > 0) {
                mItem.removeClass('current');
                mItem.addClass('current');
            }

            if (mItem.find('#lngBtgDiv').length > 0) {
                mItem.removeClass('current');
                mItem.addClass('current');
            }
        }
    }

    function getTripPlannerInfo() {

        var arr = $('.ui-state-default');
        var counter = arr.length;
        var tripInfo = '';
        //directionsDisplay.setMap(null);

        var start = $(arr[0]).find('input').val();
        var end = $(arr[arr.length - 1]).find('input').val();

        tripInfo = 'Trip Info\r\n\r\n';

        if (start.length > 0)
            tripInfo += 'Start: ' + start;
        else
            tripInfo += 'Start: undefined';



        if (counter > 2)
            for (var i = 1; i < counter - 1; i++) {
                var tmpLi = $(arr[i]).find('input');

                if (end.length > 0)
                    tripInfo += '\r\n Destination: ' + tmpLi.val();
                else
                    tripInfo += '\r\n Destination: undefined';

            }

        if (end.length > 0)
            tripInfo += '\r\nEnd: ' + end;
        else
            tripInfo += '\r\nEnd: undefined';

        return tripInfo;
    }

    function addDestinationToTripPlanner() {

        var arr = $('.ui-state-default');
        var counter = arr.length;


        if (counter < 7) {
            var $li = $("<li class='ui-state-default'><span class='dectination-icon dectination-icon-middle'></span><span class='icon-start'></span><input title='' style='' placeholder='Search Box' class='searchInput'><button class='widget-removeDirection' onclick='stationLocator.removeDirection(this);'><span></span></button><span class='directions-underline'></span></li>");
            $("#sortable").append($li);
            $("#sortable").sortable('refresh');

            processDirectionsList();

            initSearchForAddedSearchBox();
        }

        if (counter == 7)
            alert('You can not add more Destinations.');

    }


    function composeEmail(emailType) {
        var signature = '\r\n\r\nSincerely, \r\n Clean Energy Station Locator \r\n http://www.cnglngstations.com';

        if (emailType == 'email') {
            var emailName = $('#inputName');
            var emailEmail = $('#inputEmail');
            var emailText = $('#textAreaSubject');
            var emailStatus = $('#spanEmailStatus');

            emailText.val('');
            emailStatus.text('');

            $('.directionsControl').hide('slow');

            if (isTripPlannerEmpty()) {
                emailText.val(signature);
            }
            else {
                emailText.val(getTripPlannerInfo() + signature);

            }
        }

        if (emailType == 'emailStation') {
            var emailText = $('#textAreaSubject');

            var stName = $('#bottomStName').text();
            var stAddress = $('#bottomStAddress').text();
            var stHours = $('#bottomStHours').text();
            var stAccepts = $('#bottomStAccepts').text();

            var stationInfo = '';
            emailText.text('');

            stationInfo += 'Station: ' + stName;
            stationInfo += '\r\nAddress: ' + stAddress;
            stationInfo += '\r\nOpen Hours: ' + stHours;
            stationInfo += '\r\nAccepts: ' + stAccepts;
            stationInfo += '\r\n';

            emailText.text(stationInfo + signature);
        }

    }

    //Marup

    $('.menuItem').click(function () {

        if ($(this).find('#cngBtgDiv').length > 0 || $(this).find('#lngBtgDiv').length > 0) {
            var arrOfMenuItems = $(this).parent().find('.menuItem');
            var counter = arrOfMenuItems.length;
            var mItem = {};
            var type = '';


            if ($(this).hasClass('current')) {
                $(this).removeClass('current');
            }
            else {
                //$('.stationTypeMenu > .menuItem').removeClass('current');
                $(this).addClass('current');
            }



            while (counter--) {
                //console.log(arrOfMenuItems[counter]);
                mItem = $(arrOfMenuItems[counter]);

                if (mItem.hasClass('current') && mItem.find('#cngBtgDiv').length > 0) {
                    type += 'L';
                    $('#stationFuelTypeCNG').prop('checked', 'checked');
                    $('#stationFuelTypeCNG').closest('label').find('span').removeClass('active');
                    $('#stationFuelTypeCNG').closest('label').find('span').addClass('active');
                }
                else {
                    $('#stationFuelTypeCNG').removeAttr('checked');
                    $('#stationFuelTypeCNG').closest('label').find('span').removeClass('active');
                }


                if (mItem.hasClass('current') && mItem.find('#lngBtgDiv').length > 0) {
                    type += 'C';
                    setTimeout(function () {
                        $('#stationFuelTypeLNG').prop('checked', 'checked');
                        $('#stationFuelTypeLNG').closest('label').find('span').removeClass('active');
                        $('#stationFuelTypeLNG').closest('label').find('span').addClass('active');
                    }, 50);

                }
                else {
                    $('#stationFuelTypeLNG').removeAttr('checked');
                    $('#stationFuelTypeLNG').closest('label').find('span').removeClass('active');
                }


                //if (mItem.hasClass('current') && mItem.find('#lngBtgDiv').length > 0)
                //    type += 'C';
            }

            //console.log(type);

            loadListOfCoordinates(type);
        }

        //if ($(this).find('#cngBtgDiv').length > 0)
        //    loadListOfCoordinates('C');
        //if ($(this).find('#lngBtgDiv').length > 0)
        //    loadListOfCoordinates('L');
    });

    /*Open socials*/
    $('a.share, .action.share').click(function () {
        var soc = $(this).closest('li').find('.share_panel');

        if (soc.is(':visible'))
            soc.hide('slow');
        else
            soc.show('slow');
    });
    $('a.btm-share').click(function () {
        var soc = $('.btm-share_panel');

        if (soc.is(':visible'))
            soc.hide('slow');
        else
            soc.show('slow');
    });

    var filters = "closed";
    $('.menuItem a[data-fuel-type="cngLng"]').click(function () {
        if (filters == "closed") {
            $('#advancedFilter').slideDown();
            filters = "open";

            var dc = $('.directionsControl');
            dc.hide('slow');
        }
        else {
            $('#advancedFilter').slideUp();
            filters = "closed";
        }
    });

    /*e-mail form*/
    $('.share_panel .email').click(function () {
        $('.emailSend').css('display', 'block');

        //$('.share_panel').hide('slow');
        if ($(this).hasClass('emailStation')) {
            composeEmail('emailStation');
        }
        else
            composeEmail('email');
        return false;
    });





    $('.emailSend .backgroundCover, .emailSend .close').click(function () {
        $('.emailSend').css('display', 'none');
    });


    /*Fuel checked*/
    $('.fuel label').click(function () {

        //console.log($(this).find('input'))
        var $selectedInput = $($(this).find('input')[0]);
        if ($selectedInput != null) {
            if ($selectedInput.is(':checkbox')) {
                if ($selectedInput.is(':checked')) {
                    $(this).find('span').removeClass('active');
                    $(this).find('span').addClass('active');
                }
                else {
                    $(this).find('span').removeClass('active');
                }
            }
            else {
                $('.fuel span').removeClass('active');
                $(this).find('span').addClass('active');
            }


            //Lng Cng
            var menuItem = {};
            if ($('#stationFuelTypeCNG').is(':checked')) {
                menuItem = $('#cngBtgDiv').parent().parent();
                menuItem.removeClass('current');
                menuItem.addClass('current');
                //$('#stationFuelTypeCNG').closest('label').find('span').removeClass('active');
                //$('#stationFuelTypeCNG').closest('label').find('span').addClass('active');
            }
            else {
                menuItem = $('#cngBtgDiv').parent().parent();
                menuItem.removeClass('current');
            }

            if ($('#stationFuelTypeLNG').is(':checked')) {
                menuItem = $('#lngBtgDiv').parent().parent();
                menuItem.removeClass('current');
                menuItem.addClass('current');
                //$('#stationFuelTypeLNG').closest('label').find('span').removeClass('active');
                //$('#stationFuelTypeLNG').closest('label').find('span').addClass('active');
            }
            else {
                menuItem = $('#lngBtgDiv').parent().parent();
                menuItem.removeClass('current');
            }
        }
    });

    /*Vehicle checked*/
    $('.vehicle label').click(function () {

        var $selectedInput = $($(this).find('input')[0]);
        if ($selectedInput != null) {
            if ($selectedInput.is(':checkbox')) {
                if ($selectedInput.is(':checked')) {

                    $(this).removeClass('checked');
                    $(this).addClass('checked');
                }
                else {
                    $(this).removeClass('checked');
                }
            }
            else {
                $('.vehicle label').removeClass('checked');
                $(this).addClass('checked');
            }
        }


    });

    /*Radio buttons*/
    $('label input[type=radio]').click(function () {
        //console.log(this);
        //$(this).parent('.filterItem').find('.newRadioOn').addClass('newRadioOff').removeClass('newRadioOn');
        //$(this).parent('.types').find('.newRadioOn').addClass('newRadioOff').removeClass('newRadioOn');
        $(this).parent().parent().parent().find('.newRadioOn').addClass('newRadioOff').removeClass('newRadioOn');
        $(this).parent().parent().find('.newRadioOff').addClass('newRadioOn').removeClass('newRadioOff');
    });

    $('label input:checkbox').on('change', function () {
        //console.log(this);
        //debugger
        var $checkbox = $(this);
        if ($checkbox.is(':checked')) {
            $checkbox.parent().parent().find('.newRadioOff').addClass('newRadioOn').removeClass('newRadioOff');

        }
        else {
            $checkbox.parent().parent().find('.newRadioOn').addClass('newRadioOff').removeClass('newRadioOn');
        }
    });
    /*Close*/
    $('.filter .close').click(function () {
        $('#advancedFilter').slideUp();
        //$('.stationTypeMenu > .menuItem').removeClass('current');
        filters = "closed";
    });

    $('.filter .apply').click(function () {
        $('#advancedFilter').slideUp();
        //$('.stationTypeMenu > .menuItem').removeClass('current');
        filters = "closed";
    });

    /*Payment types open/close*/
    var types = "closed";
    $('.typesWrap > p').click(function () {
        if (types == "closed") {
            $('.types').slideDown();
            $(this).addClass('open');
            types = "open";
        }
        else { $('.types').slideUp(); $(this).removeClass('open'); types = "closed"; }
    });

    /*Bottom Popup*/
    var popup = "closed";
    $('.bottomPopup .pushUp').click(function () {
        if (popup == "closed") {
            $(this).removeClass('pushUp').addClass('pushDown');
            $('.bottomPopup').addClass('open');
            popup = "open";
        } else {
            $(this).removeClass('pushDown').addClass('pushUp');
            $('.bottomPopup').removeClass('open');
            popup = "closed";
        }
    });


    //OnClickOutside\

    $(document).mouseup(function (e) {
        var shareContainer = $(".share_panel");

        if (!shareContainer.is(e.target) // if the target of the click isn't the shareContainer...
            && shareContainer.has(e.target).length === 0) // ... nor a descendant of the shareContainer
        {
            var arrOfShared = shareContainer.closest('li').find('.share_panel');
            var counter = arrOfShared.length;

            while (counter--) {
                var tmpShare = $(arrOfShared[counter]);
                if (tmpShare.is(':visible'))
                    tmpShare.hide('slow');
            }
        }

        var typesWrapContainer = $(".types");
        var typesWrapButtonContainer = $(".typesWrap");

        if ((!typesWrapContainer.is(e.target) && typesWrapContainer.has(e.target).length === 0) &&
            (!typesWrapButtonContainer.is(e.target) && typesWrapButtonContainer.has(e.target).length === 0)
            ) {
            $('.types').slideUp();
            $('.typesWrap > p').removeClass('open'); types = "closed";
        }

        var bottomPopupPanel = $('.bottomPopup');

        if (!bottomPopupPanel.is(e.target) // if the target of the click isn't the shareContainer...
            && bottomPopupPanel.has(e.target).length === 0) // ... nor a descendant of the shareContainer
        {
            if (popup == "open") {
                $('#expandBottomBtn').removeClass('pushDown').addClass('pushUp');
                $('.bottomPopup').removeClass('open');
                popup = "closed";
            }
        }




    });

    //OnLoad
    $(document).ready(function () {
        setDefaultValues();

        $('.bottomPopup .pushUp').css('opacity', '0');
        //console.log('$(window).height()');
        //console.log($(window).height());
        //console.log($(document).height());

        //var docHeight = $(document).height();
        var docHeight = $(window).height();
        if (docHeight > 200) {
            $('#map-canvas').height((docHeight - 189).toString() + 'px');
        }

        //console.log( $('#map-canvas').height());



        processDirectionsList();

        $("#sortable").sortable({
            stop: function (event, ui) {
                processDirectionsList();
            }
        });
        //$("#sortable").disableSelection();

        $("#addDirection").click(function (e) {
            //console.log('Click - Add Direction');
            e.preventDefault();
            //var text = $("input[name='add1']").val();
            addDestinationToTripPlanner();

        });

        $("#buildRout").click(function (e) {
            //console.log('Click - Add Direction');
            e.preventDefault();
            //var text = $("input[name='add1']").val();
            directionsDisplay.setMap(null);

            buildRout();

        });

        $("#changeDirections").click(function (e) {
            //console.log('Click - Add Direction');
            directionsDisplay.setMap(null);
            //	set CSS styles to defaults
            //var text = $("input[name='add1']").val();
            changeStartAndEndValues();

        });


        $("#clearRoute").click(function (e) {
            //console.log('Click - Add Direction');
            e.preventDefault();
            //var text = $("input[name='add1']").val();
            clearRoute();

        });

        $("#btnLocateMe").click(function (e) {
            //console.log('Click - Add Direction');
            e.preventDefault();
            //var text = $("input[name='add1']").val();
            locateMe();

            return false;

        });

        $("#btnArialView").click(function (e) {
            e.preventDefault();
            setMapView('sat');
        });

        $("#btnMapView").click(function (e) {
            e.preventDefault();
            setMapView('roadmap');
        });

        $("#btnFilterItems").click(function (e) {
            e.preventDefault();
            loadFilteredListOfCoordinates();
        });

        $("#paymentTypesAcceptedAny").change(function (e) {

            //console.log('1212');
            processCheckAndUncheckAllPayments();
        });

        $("#btnGetDirections").click(function (e) {
            e.preventDefault();
            locateMeFromStation('getDirections');
        });

        $("#btnTripPlanner").click(function (e) {
            e.preventDefault();
            locateMeFromStation('tripPlanner');
        });

        $("#btnResetToDefaults").click(function (e) {
            e.preventDefault();
            resetParamnsToDefaults(true);
        });

        $(".btn_send").click(function (e) {
            e.preventDefault();
            sendEmail();
        });




        $("#btnTrafficView").click(function (e) {
            e.preventDefault();
            //setMapView('traffic');

            //if($(e).parent())
            //console.log(e);

            var currMenuItem = $(this).parent();

            if (currMenuItem != null) {
                if (currMenuItem.hasClass('active')) {
                    currMenuItem.removeClass('active');
                    setMapView('removeTraffic');
                }
                else {
                    currMenuItem.addClass('active');
                    setMapView('traffic');
                }

                //console.log($(this).parent().hasClass('active'));
            }
        });





        $(".widget-cng").click(function (e) {
            var btn = $(e.target);

            if (btn != null) {
                //console.log(btn);
                //console.log(e);

                if (btn.attr('id') == 'cngBtg' || btn.attr('id') == 'cngBtgDiv') {
                    loadListOfCoordinates('C');
                }

                if (btn.attr('id') == 'lngBtg' || btn.attr('id') == 'lngBtgDiv') {
                    loadListOfCoordinates('L');
                }

                if (btn.attr('id') == 'cngLngBtn' || btn.attr('id') == 'cngLngBtnDiv') {
                    loadListOfCoordinates('CL');
                }
            }

        });

        $(".btnTP").click(function (e) {
            var dc = $('.directionsControl');

            if (dc.is(':visible'))
                dc.hide('slow');
            else {
                dc.show('slow');
                $('#advancedFilter').slideUp();
                filters = "closed";
            }

        });

        $(".closeDirections").click(function (e) {
            $('.directionsControl').hide('slow');
        });

        //$('.addDirection').click(function () {
        //    alert("JQuery Running!");
        //});


        $('.fb').attr('href', 'http://www.facebook.com/sharer.php?u=http%3A%2F%2Fcnglngstations.com%2F').attr('target', '_blank');
        $('.tw').attr('href', 'http://twitter.com/home?status=Clean%20Energy%20Station%20Locator%20http%3A%2F%2Fcnglngstations.com%2F').attr('target', '_blank');
        $('.gp').attr('href', 'https://plus.google.com/share?url=http%3A%2F%2Fcnglngstations.com%2F').attr('target', '_blank');
        //$('.email').attr('href', 'mailto:?subject=Clean%20Energy%20Station&amp;body=http%3A%2F%2Fcnglngstations.com%2F');
        $('.email').attr('href', '#1');
    });

    stationLocator.removeDirection = removeDirection;
    stationLocator.setMapView = setMapView;
    stationLocator.getFilterObject = getFilterObject;
    stationLocator.loadFilteredListOfCoordinates = loadFilteredListOfCoordinates;
    stationLocator.resetParamnsToDefaults = resetParamnsToDefaults;
    stationLocator.isTripPlannerEmpty = isTripPlannerEmpty;


    return stationLocator;

}(stationLocator));
