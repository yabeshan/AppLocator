

Ext.define('App.view.SearchPanel', {
    extend: 'Ext.Container',
    alias : 'widget.searchPanel',
    id:'searchPanel',

    config: {

        items: [
            {
                layout:'hbox',
                items: [
                    {
                        cls: 'searchfield-stations',
                        xtype: 'searchfield',
                        placeHolder: 'search by address, city or zip',
                        itemId: 'searchBox',
                        id:'pac-input'
                    },{
                        html:'<img id="searchBtn" src="img/main-page-toolbar-search-btn.png" style="width:44px;height:52px;">',
                        listeners: {
                            tap: {
                                fn: function( e, node ) {
                                    Ext.getCmp('searchPanel').hideSearchResult();
                                },
                                element: 'element'
                            }
                        }
                    }
                ]
            },{
                id:'searchList',
                xtype:  'list',
                style:"background-color: rgba(255,255,255,.8);font-size:65%;margin-left:10px;",
                width:'295px',
                store : 'StationStore',
                itemTpl:  '<div><b>{name}</b>,  {country}</div>'
                         +'<div>{zip}, {state}, {city}, {address}</div>',
                emptyText: '<div class="myContent"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            Ext.getCmp('searchPanel').hideSearchResult();
                        },
                        element: 'element'
                    }
                }
            },{
                id:'tripPlaner',
                cls:'info-zoom',
                style:'position:absolute;width:315px;height:165px;background-color:#FFF;top:0px;color: #999;font-weight:bold;',
                html:'<div id="tp-title">Trip Planer</div><input id="tp-start-point" type="text" placeholder="Start Point">'
                    +'<input id="tp-end-point" type="text" placeholder="End Point"><div id="tp-add">Add destination</div>'
                    +'<div id="tp-build">Build Trip</div><div id="tp-clear">Clear Road</div><div id="tp-close">Close</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            var parent = Ext.getCmp('searchPanel');
                            if (node.id=="tp-add") {

                            } else if (node.id=="tp-build") {
                                parent.buildTrip();
                            } else if (node.id=="tp-clear") {
                                parent.clearRoad();
                            } else if (node.id=="tp-close") {
                                parent.hideTripPlaner();
                            }
                        },
                        element: 'element'
                    }
                }
            }
        ]

    },
    initialize: function(me, eOpts) {
//        setTimeout( this.showTripPlaner, 2000);
        this.hideTripPlaner();
        this.hideSearchResult();
    },
    showSearchResult: function() {
//        Ext.getCmp('searchList').setStyle('width:100%;height:300px');
//        Ext.getCmp('searchList').show();
    },
    hideSearchResult: function() {
        Ext.getCmp('searchList').hide();
        Ext.getCmp('searchList').setStyle('width:0px;height:0px');
    },

    directionsService:null,
    directionsDisplay:null,
    showTripPlaner: function() {
        Ext.getCmp('tripPlaner').show();

        var start = document.getElementById('tp-start-point');
        var searchBox = new google.maps.places.SearchBox( (start) );

        var end = document.getElementById('tp-end-point');
        var searchBox = new google.maps.places.SearchBox( (end) );

        var that = Ext.getCmp('searchPanel');
        if (that.directionsService==null)
            that.directionsService = new google.maps.DirectionsService();
        if (that.directionsDisplay==null)
            that.directionsDisplay = new google.maps.DirectionsRenderer();
    },
    hideTripPlaner: function() {
        Ext.getCmp('tripPlaner').hide();
//        Ext.getCmp('tripPlaner').setStyle('width:0px;height:0px');
    },

    buildTrip: function() {
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
    },
    clearRoad: function() {
        this.directionsDisplay.setMap(null);
        document.getElementById('tp-start-point').value="";
        document.getElementById('tp-end-point').value="";
    }

});
