
Ext.define('App.view.TripPlaner' ,{
    extend: 'Ext.Container',
    alias : 'widget.tripPlaner',
    id:'tripPlaner',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,1);top:0px;left:0px;',
                html:'<div id="tp-title">Trip Planer</div><img id="tp-close" src="img/popup-close-button.png" >'
                    +'<div class="holder-trip-point"><input id="tp-start-point" type="text" placeholder="Start Point"></div>'
                    +'<div class="holder-trip-point"><input id="tp-second-point" type="text" placeholder="End Point"><img src="img/icons-change.png"></div>'
                    +'<div class="holder-trip-point"><input id="tp-second-point" type="text" placeholder="End Point"><img src="img/icons-change.png"></div>'
                    +'<div class="holder-trip-point"><input id="tp-second-point" type="text" placeholder="End Point"><img src="img/icons-change.png"></div>'
                    +'<div id="tp-add" class="trip-planer-btn"><img src="img/icons-add.png">Add destination</div>'
                    +'<div id="tp-build" class="trip-planer-btn"><img id="tp-build-img" src="img/icons-trip.png"><span id="tp-build-title" style="pointer-events:none">Build Trip</span></div>'
                    +'<div id="tp-clear" class="trip-planer-btn"><img src="img/icons-close.png">Clear Trip</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            var parent = Ext.getCmp('tripPlaner');
                            if (node.id=="tp-add") {
//                                parent.addPoint();
                            } else if (node.id=="tp-build") {
                                parent.buildTrip();
                            } else if (node.id=="tp-clear") {
                                parent.clearRoad();
                            } else if (node.id=="tp-close") {
                                parent.closePopup();
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
    },
    openPopup: function(flag) {
        Ext.getCmp('tripPlaner').show();
        /*
         if (flag && Ext.getCmp("mapPanel").userLocation != null) {
         document.getElementById('tp-start-point').value = Ext.getCmp("mapPanel").userLocation;
         }

         Ext.getCmp('tripPlaner').show();

         var start = document.getElementById('tp-start-point');
         var searchBox = new google.maps.places.SearchBox( (start) );

         var center = document.getElementById('tp-center-point');
         var searchBox = new google.maps.places.SearchBox( (center) );

         var end = document.getElementById('tp-end-point');
         var searchBox = new google.maps.places.SearchBox( (end) );

         //        Ext.getCmp('mapPanel').searchItemFlag=false;
         //        Ext.getCmp("mapPanel").addSearchItemHandlers();

         var that = Ext.getCmp('searchPanel');
         if (that.directionsService==null)
         that.directionsService = new google.maps.DirectionsService();
         if (that.directionsDisplay==null)
         that.directionsDisplay = new google.maps.DirectionsRenderer();
         */
    },
    closePopup: function() {
        Ext.getCmp('tripPlaner').hide();

        /*
         if (Ext.get("tp-center-point")) {
         Ext.get("tp-center-point").setStyle({'visibility':'hidden'});
         Ext.get("tp-center-point").setStyle({'height':'0px'});
         Ext.get("tp-center-point").setStyle({'margin':'0'});
         }
         if (Ext.get("tp-add")) Ext.get("tp-add").setStyle({'opacity':1});
         */
    },



    addPoint: function() {
        /*
        Ext.get("tp-center-point").setStyle({'visibility':'visible'});
        Ext.get("tp-center-point").setStyle({'height':'35px'});
        Ext.get("tp-center-point").setStyle({'margin':'10px 5px 20px 5px'});
        Ext.get("tp-add").setStyle({'opacity':.5});
        */
    },

    buildTrip: function() {
        if ( Ext.get('tp-build-img').dom.src.indexOf("icons-trip")>0 ) {
            Ext.get('tp-build-title').dom.innerHTML = "List to Trip";
            Ext.get('tp-build-img').dom.src = "img/icons-list-trip.png";
        }


        /*
        var start = document.getElementById('tp-start-point').value;
        var end = document.getElementById('tp-end-point').value;

        var request = {
            origin: start,
            destination: end,
//            waypoints: waypts,
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
        */
    },
    clearRoad: function() {
        Ext.get('tp-build-title').dom.innerHTML = "Build Trip";
        Ext.get('tp-build-img').dom.src = "img/icons-trip.png";


        /*
        this.directionsDisplay.setMap(null);
        document.getElementById('tp-start-point').value="";
        document.getElementById('tp-center-point').value="";
        document.getElementById('tp-end-point').value="";

        Ext.get("tp-center-point").setStyle({'visibility':'hidden'});
        Ext.get("tp-center-point").setStyle({'height':'0px'});
        Ext.get("tp-center-point").setStyle({'margin':'0'});
        Ext.get("tp-add").setStyle({'opacity':1});
        */
    }
});