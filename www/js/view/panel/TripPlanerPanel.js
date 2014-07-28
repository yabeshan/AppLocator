
Ext.define('App.view.TripPlaner' ,{
    extend: 'Ext.Container',
    alias : 'widget.tripPlaner',
    id:'tripPlaner',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:#fff',
                html:'<div id="tp-title">Trip Planner</div><img id="tp-close" src="img/popup-close-button.png" >',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="tp-close") {
//                                var el1 = document.getElementById ('trip-planer');
                                var el2 = document.getElementById ('route-viewer');

                                if (el2.style.visibility == "visible") {
                                    Ext.getCmp('tripPlaner').closeRouteViewer();
                                } else {
                                    Ext.getCmp('tripPlaner').closePopup();
                                }
                            }
                        },
                        element: 'element'
                    }
                }
            },{
                id:'trip-planer',
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;top:50px;bottom:10px;background-color:#fff',
                scrollable: {
                    direction: 'vertical'
                },
                html:'<div id="trip-palent-starter"><div class="holder-trip-point"><input id="tp-end-point-0" type="text" placeholder="Start Point" class="tp-input-point" value=""></div>'
                    +'<div class="holder-trip-point"><input id="tp-end-point-1" type="text" placeholder="End Point" class="tp-input-point" value=""><img id="change-arrow-1" class="holder-trip-point-change" src="img/icons-change.png"></div></div>'

                    +'<div id="tp-add" class="trip-planer-btn"><img src="img/icons-add.png">Add destination</div>'
                    +'<div id="tp-build" class="trip-planer-btn"><img id="tp-build-img" src="img/icons-trip.png"><span id="tp-build-title" style="pointer-events:none">Build Trip</span></div>'
                    +'<div id="tp-clear" class="trip-planer-btn"><img src="img/icons-close.png">Clear Trip</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            var parent = Ext.getCmp('tripPlaner');
                            if (node.id=="tp-add") {
                                parent.addPoint();
                            } else if (node.id=="tp-build") {
                                parent.buildTrip();
                            } else if (node.id=="tp-clear") {
                                parent.clearRoad();
                            } else if (node.id.indexOf("change-arrow")>=0) {
                                parent.swipeItems(node.id);
                            } else if (node.id.indexOf("delete-arrow")>=0) {
                                parent.deleteItems(node);
                            }
                        },
                        element: 'element'
                    }
                }
            },{
                id:'route-viewer',
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;top:50px;bottom:10px;background-color:#fff;visibility:hidden',
                scrollable: {
                    direction: 'vertical'
                },
                html:'<div id="directionsPanel" style="padding: 10px;"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="route-viewer-close") {
                                Ext.getCmp('tripPlaner').closeRouteViewer();
                            }
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        Ext.getCmp('tripPlaner').closePopup();
        Ext.getCmp('tripPlaner').closeRouteViewer();
    },

    closeRouteViewer: function() {
        var el = document.getElementById ('route-viewer');
        if (el) el.style.visibility = "hidden" ;
    },
    openRouteViewer: function() {
        var el = document.getElementById ('route-viewer');
        if (el) el.style.visibility = "visible" ;
    },

    initSearchBoxFlag:null,
    openPopup: function( obj ) {
        Ext.getCmp('tripPlaner').show();

        if (obj != null) {
            Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
            Ext.get('tp-build-img').dom.src = "img/icons-trip.png";

            if (Ext.getCmp("mapPanel").userLocation != null && document.getElementById('tp-end-point-0').value.length==0) {
                document.getElementById('tp-end-point-0').value = Ext.getCmp("mapPanel").userLocation;
            }

            if (obj.type=="get") {
                document.getElementById('tp-end-point-1').value = obj.point;
            }

            if (obj.type=="add") {
                if (document.getElementById('tp-end-point-1').value.length==0) {
                    document.getElementById('tp-end-point-1').value = obj.point;
                } else {
                    var newID = this.addPoint();
                    document.getElementById('tp-end-point-'+newID).value = obj.point;
                }
            }
        }

        var that = Ext.getCmp('searchPanel');
        if (that.initSearchBoxFlag==null) {
            that.initSearchBoxFlag = true;
            var start = document.getElementById('tp-end-point-0');
            var searchBox = new google.maps.places.SearchBox( (start) );
            Ext.getCmp("mapPanel").searchBoxInputArr.push(start);

            var end = document.getElementById('tp-end-point-1');
            var searchBox = new google.maps.places.SearchBox( (end) );
            Ext.getCmp("mapPanel").searchBoxInputArr.push(end);

            if (that.directionsService==null)
                that.directionsService = new google.maps.DirectionsService();
            if (that.directionsDisplay==null)
                that.directionsDisplay = new google.maps.DirectionsRenderer();
        }
    },
    closePopup: function() {
        Ext.getCmp('tripPlaner').hide();
    },

    addPoint: function() {
        var newID = Ext.get('trip-palent-starter').dom.children.length;
        var newItem = document.createElement("div");
        newItem.id = "item-end-point-"+newID;
        newItem.className ="holder-trip-point";

        var newInput = document.createElement("input");
        newInput.id = "tp-end-point-"+newID;
        newInput.type = "text";
        newInput.placeholder = "End Point";
        newInput.className= "tp-input-point";

        var newDelImg = document.createElement("img");
        newDelImg.id="delete-arrow-" + newID;
        newDelImg.src="img/icons-close.png";
        newDelImg.className ="holder-trip-point-delete";

        var newChgImg = document.createElement("img");
        newChgImg.id="change-arrow-" + newID;
        newChgImg.src="img/icons-change.png";
        newChgImg.className = "holder-trip-point-change";

        newItem.appendChild(newInput);
        newItem.appendChild(newDelImg);
        newItem.appendChild(newChgImg);
        Ext.get('trip-palent-starter').appendChild(newItem);

        var point = document.getElementById("tp-end-point-"+newID);
        var searchBox = new google.maps.places.SearchBox( (point) );
        Ext.getCmp("mapPanel").searchBoxInputArr.push(point);

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";

        return newID;
    },

    swipeItems: function(id) {
        var index = id.slice(13,id.length),
            oldValue = Ext.get('tp-end-point-'+index).dom.value;
        Ext.get('tp-end-point-'+index).dom.value = Ext.get('tp-end-point-'+(index-1)).dom.value;
        Ext.get('tp-end-point-'+(index-1)).dom.value = oldValue;

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
    },

    deleteItems: function(node) {
        var k= 0, arr=Ext.get('trip-palent-starter').dom.children, lng=arr.length, searchFlag=false;
        for (k;k<lng;k++) {
            if( arr[k]==node.parentNode ) searchFlag = true;
            if (searchFlag) {
                arr[k-1].children[0].value = arr[k].children[0].value;
            }
        }
        (elem=arr[k-1]).parentNode.removeChild(elem);

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
    },

    buildTrip: function() {
        var mapPanel = Ext.getCmp("mapPanel");
        if (mapPanel.infowindow) mapPanel.infowindow.close();

        this.routeMarker = [];
        var k= 0, arr = Ext.getCmp("mapPanel").markerViewArr, lng = arr.length;
        for (k; k<lng; k++) {
            arr[k].model.set({'viewRoute':null});
        }

        if ( Ext.get('tp-build-img').dom.src.indexOf("icons-trip")<0 ) {
            this.openRouteViewer();
//            Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
//            Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
            return;
        }

        mapPanel.addSpinner();
        Ext.get('tp-build-title').dom.innerHTML = "List to Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-list-trip.png";
        Ext.getCmp('tripPlaner').hide();

        var start = document.getElementById('tp-end-point-0').value;
        var lastID = Ext.get('trip-palent-starter').dom.children.length-1;
        var end = document.getElementById('tp-end-point-'+lastID).value;
        var waypts = [], val;
        if (lastID>1) {
            for (var k=lastID-1; k>0; k--) {
                val = document.getElementById('tp-end-point-'+k).value;
                if (val.length>4) waypts.push({location:val, stopover:true});
            }
        }

        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var that = Ext.getCmp('searchPanel');
        that.directionsService.alternatives = true;
        that.directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setDirections(response);

                that.directionsDisplay.setDirections(response);
                that.directionsDisplay.setMap( Ext.getCmp("mapPanel").gMap );
                that.directionsDisplay.setOptions( { suppressMarkers: true } );
                that.directionsDisplay.setPanel(document.getElementById("directionsPanel"));

                var route = response.routes[0];
                var totalDistanse = 0;
                var totalTime = 0;

                for (var i = 0; i < route.legs.length; i++) {
                    totalDistanse += route.legs[i].distance.value;
                    totalTime += route.legs[i].duration.value;
                }

                var hoursRoute = Math.floor( totalTime / 3600 );
                var minsRoute = Math.ceil( (totalTime-hoursRoute*3600)/60 );

                Ext.get('tp-build-title').dom.innerHTML += ' ('+ Math.ceil(totalDistanse/1610) +'mi, '+ hoursRoute +'h '+ minsRoute+'mins)';
                var distanseBetweenMarkers = Math.max(1000, Math.round(totalDistanse / 100));

                Ext.getCmp('tripPlaner').addRedMarkers(response.routes[0]);
                Ext.getCmp('tripPlaner').viewRadiusStations(response.routes[0]);

            }
            else {
                var message = status + '. Please enter correct Start and Destination Points';
                if (navigator.notification) {
                    navigator.notification.alert(message, null, 'Error');
                } else {
                    alert(message);
                }
            }
            setTimeout(function(){
                mapPanel.unmask();
            },500);
        });
    },

    routeMarker:[],
    intBulder:null,
    viewRadiusStations:function(myRoute) {
        var map = Ext.getCmp("mapPanel").gMap;
        var markerZIndex = 10000000;
        var point=myRoute.overview_path[0], marker, posx, posy, dist;
//console.log( point.k +"   "+ point.A);

        var k = 1, arr = myRoute.overview_path, lng = arr.length;
        for (k; k<lng; k++) {
            posx = Math.pow( Math.abs( point.lat() - arr[k].lat() ), 2);
            posy = Math.pow( Math.abs( point.lng() - arr[k].lng() ), 2);
            dist = Math.sqrt(posx+posy);
            if (dist>= 0.08) {
                this.routeMarker.push( point );
                point=arr[k];
//                marker = new google.maps.Marker({
//                    position: arr[k],
//                    map: map,
//                    icon: 'img/map-point-grey.png'
//                });
            }
        }
        this.routeMarker.push( point );

//        this.findRadiusStations( this.routeMarker.pop() );
//        return;

        if(this.routeMarker.length>0) {
            var m = 0, arr = this.routeMarker, lng = arr.length;
            for (m; m<lng; m++) {
                this.findRadiusStations( this.routeMarker[m].lat(), this.routeMarker[m].lng() );
            }
//            this.intBulder = setInterval(function(){
//                var that = Ext.getCmp('tripPlaner');
//                that.findRadiusStations( that.routeMarker.pop() );
//                if (that.routeMarker.length==0) clearInterval( that.intBulder );
//            },10);
        }
    },

    findRadiusStations:function( startX, startY ) {
        var map = Ext.getCmp("mapPanel").gMap;
//        markerViewArr
        var k= 0, arr = Ext.getCmp("mapPanel").markerViewArr, lng = arr.length, coordx, coordy, posx, posy, dist;

        for (k; k<lng; k++) {
            coordx = arr[k].model.get("Latitude");
            coordy = arr[k].model.get("Longitude");

            posx = Math.pow( Math.abs(startX-coordx), 2);
            posy = Math.pow( Math.abs(startY-coordy), 2);
            dist = Math.sqrt(posx+posy);

            if (dist>0.3 && arr[k].model.get('viewRoute')!=true) {
                arr[k].setMap(null);
            } else {
                arr[k].model.set({'viewRoute':true});
                arr[k].setMap(map);
            }
        }
    },

    redMarkerArr:null,
    redMarkerImageArr:['img/redA.png','img/redB.png','img/redC.png','img/redD.png','img/redE.png','img/redF.png','img/redG.png','img/redH.png','img/redI.png','img/redJ.png','img/redK.png','img/redL.png'],
    addRedMarkers:function(myRoute) {
        var map = Ext.getCmp("mapPanel").gMap;
        var markerZIndex = 10000000;
        var that = Ext.getCmp('tripPlaner');
        if (that.redMarkerArr!=null) that.removeRedMarkers();
        that.redMarkerArr = [];

//        console.log( "start_location = "+ myRoute.legs[0].start_location );
        var marker = new google.maps.Marker({
            position: myRoute.legs[0].start_location,
            map: map,
            icon: that.redMarkerImageArr[that.redMarkerArr.length],
            zIndex:markerZIndex
        });
        that.redMarkerArr.push(marker);


//        console.log( "start_location = "+ (myRoute.legs.length-1) );
        var k=0, arr = myRoute.legs, lng = arr.length-1;
        for (k;k<lng;k++) {
//            console.log (arr[k].start_location);
            marker = new google.maps.Marker({
                position: arr[k].end_location,
                map: map,
                icon: that.redMarkerImageArr[that.redMarkerArr.length],
                zIndex:markerZIndex
            });
            console.log("middle    "+ that.redMarkerImageArr[that.redMarkerArr.length]);
            that.redMarkerArr.push(marker);
        }

//        console.log( "end_location = "+ myRoute.legs[0].end_location );
        marker = new google.maps.Marker({
            position: myRoute.legs[ myRoute.legs.length-1 ].end_location,
            map: map,
            icon: that.redMarkerImageArr[that.redMarkerArr.length],
            zIndex:markerZIndex
        });
        that.redMarkerArr.push(marker);
    },

    removeRedMarkers:function() {
        if (this.redMarkerArr==null) return;

        var k= 0, arr = this.redMarkerArr, lng = arr.length;
        for (k; k<lng; k++) {
            arr[k].setMap(null);
        }
        this.redMarkerArr = null;
    },

    clearRoad: function() {
        var map = Ext.getCmp("mapPanel").gMap;
        var k= 0, arr = Ext.getCmp("mapPanel").markerViewArr, lng = arr.length;
        for (k; k<lng; k++) {
            arr[k].setMap(map);
            arr[k].model.set({'viewRoute':null});
        }

        Ext.getCmp('searchPanel').directionsDisplay.setDirections({ routes: [] });
        Ext.getCmp('tripPlaner').removeRedMarkers();

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";

        var lastID = Ext.get('trip-palent-starter').dom.children.length-1;
        if (lastID>1) {
            for (var k=lastID; k>1; k--) {
                (elem=document.getElementById( 'item-end-point-'+k )).parentNode.removeChild(elem);
            }
        }
        document.getElementById('tp-end-point-0').value="";
        document.getElementById('tp-end-point-1').value="";
    },

    buildTripIconsRestore: function() {
        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
    }
});