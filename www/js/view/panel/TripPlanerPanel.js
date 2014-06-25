
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
                html:'<div id="trip-palent-starter"><div class="holder-trip-point"><input id="tp-end-point-0" type="text" placeholder="Start Point" class="tp-input-point"></div>'
                    +'<div class="holder-trip-point"><input id="tp-end-point-1" type="text" placeholder="End Point" class="tp-input-point"><img id="change-arrow-1" src="img/icons-change.png"></div></div>'

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
    openPopup: function(flag) {
        Ext.getCmp('tripPlaner').show();

        if (flag && Ext.getCmp("mapPanel").userLocation != null) {
            document.getElementById('tp-end-point-0').value = Ext.getCmp("mapPanel").userLocation;
            Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
            Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
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

        var newImg = document.createElement("img");
        newImg.id="change-arrow-" + newID;
        newImg.src="img/icons-change.png";
        newItem.appendChild(newInput);
        newItem.appendChild(newImg);
        Ext.get('trip-palent-starter').appendChild(newItem);

        var point = document.getElementById("tp-end-point-"+newID);
        var searchBox = new google.maps.places.SearchBox( (point) );
        Ext.getCmp("mapPanel").searchBoxInputArr.push(point);

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
    },

    swipeItems: function(id) {
        var index = id.slice(13,id.length),
            oldValue = Ext.get('tp-end-point-'+index).dom.value;
        Ext.get('tp-end-point-'+index).dom.value = Ext.get('tp-end-point-'+(index-1)).dom.value;
        Ext.get('tp-end-point-'+(index-1)).dom.value = oldValue;

        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
    },

    buildTrip: function() {
        if ( Ext.get('tp-build-img').dom.src.indexOf("icons-trip")<0 ) {
            this.openRouteViewer();
//            Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
//            Ext.get('tp-build-img').dom.src = "img/icons-trip.png";
            return;
        }

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
                that.directionsDisplay.setPanel(document.getElementById("directionsPanel"));

                var route = response.routes[0];
                var totalDistanse = 0;
                for (var i = 0; i < route.legs.length; i++) {
                    totalDistanse += route.legs[i].distance.value;
                }
            }
            else {
                alert(status + '. Please enter correct Start and Destination Points');
            }
        });
    },

    clearRoad: function() {
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
    }
});