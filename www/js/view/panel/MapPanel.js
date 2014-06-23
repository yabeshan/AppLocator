
Ext.define('App.view.MapPanel', {
    extend: 'Ext.Container',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    gMap:null,
    markerArr:[],
    infowindow:null,
    trafficLayer:null,

    config: {
        width:'100%',
        height:'100%'
    },

    initialize: function(me, eOpts) {

    },

    update: function() {
        if (this.gMap==null) {
            this.addSpinner();
            this.locateMe();
        }
    },

    addSpinner: function(){
        this.setMasked({
            xtype: 'loadmask',
            message: 'Loading map...',
            indicator: true,
            hidden: false
        });
    },

    addMap: function(coord, mapZoom) {
        var map = this.add( {
            xtype:'map',
            width:'100%',
            height:'100%',
            mapOptions:{
                center: coord,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI:true,
                zoom: mapZoom
            },
            listeners: {
                maprender: Ext.getCmp('mapPanel').completeMap
            }
        } );

        this.gMap = map.getMap();
    },

    searchItemFlag:false,
    searchBox:null,
    autoDirection:false,
    addSearchItemHandlers: function() {
        var obj1 = document.getElementsByClassName("pac-container");
        var obj2 = document.getElementsByClassName("pac-item");

        if (obj1[0] && Ext.getCmp('mapPanel').searchItemFlag==false) {
            Ext.getCmp('mapPanel').searchItemFlag = true;
            var el = Ext.get(obj1[0]);

            el.on({
                tap : function(e, t) {
//                    alert("cont = " + e.target.innerHTML);
//                    console.log(e.target.innerHTML);

                    var item = e.target.innerHTML;
                    if (item.hasClass('pac-item')) {
                        Ext.getCmp('mapPanel').addResultClickHandler( e.target.innerHTML );
                    } else {
                        Ext.getCmp('mapPanel').addResultClickHandler( e.target.parentNode.innerHTML );
                    }


//                    if (e.target.parentNode) {
//                        if (e.target.parentNode.parentNode) {
//                            Ext.getCmp('mapPanel').addResultClickHandler( e.target.parentNode.parentNode.innerHTML );
//                        } else {
//                            Ext.getCmp('mapPanel').addResultClickHandler(e.target.parentNode.innerHTML );
//                        }
//                    } else {
//                        Ext.getCmp('mapPanel').addResultClickHandler(e.target.innerHTML );
//                    }
                }
            });
        } else {
            setTimeout( Ext.getCmp('mapPanel').addSearchItemHandlers, 1000);
        }
    },

    addResultClickHandler: function (content) {
        that = Ext.getCmp("mapPanel");
        if (that.autoDirection) return;
        alert( content );
        var start = content.indexOf('pac-matched">')+13,
            end = content.length- 7,
            center = String(content.slice(start, end)),
            arr = center.split("</span>"),
            country = (arr[2]) ? arr[2].replace('<span>', ',  ') : "" ,
            result = arr[0]+arr[1]+country;

        var input = document.getElementById('pac-input').getElementsByTagName('input')[0];
        input.value = result;
//        alert( result );

        var places = that.searchBox.getPlaces();
        var options = {
            map: that.gMap,
            position: places[0].geometry.location,
            content: places[0].name
        };

        if (that.infowindow)
            that.infowindow.close();

        that.infowindow = new google.maps.InfoWindow(options);
        that.gMap.setCenter(places[0].geometry.location);
        that.gMap.setZoom(14);
    },

    completeMap: function(extMapComponent, googleMapComp) {
        var that = Ext.getCmp('mapPanel');
        that.unmask();
        that.addSearchPanelInteractive();
        Ext.getStore('StationStore').each(function(record,id){
            that.addMarker( record, false );
        });
    },

    addMarker: function( model, positionFlag ) {
        var lat = model.get('latitude');
        var lon = model.get('longitude');

        var fuel = model.get('fuel');
        var icon = (fuel==0) ? 'img/map-point-blue.png' : ( (fuel==1) ? 'img/map-point-green.png' : 'img/map-point-double.png' );
        var marker = new google.maps.Marker({
            map: this.gMap,
//          animation: google.maps.Animation.DROP,
            icon: icon,
            position: new google.maps.LatLng ( lat , lon),
            model: model,
            title: model.get("name") +", "+ model.get("zip") +", "
                + model.get("state") +", "+ model.get("city") +", "+ model.get("address")
        });

        if (positionFlag) {
            var centerCoord = new google.maps.LatLng ( lat, lon );
            Ext.getCmp('mapPanel').setMapCenter( centerCoord );
            Ext.getCmp('mapPanel').setMapOptions( {'zoom': 17} );
//            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        google.maps.event.addListener(marker,'mouseup',function(pos) {
            Ext.getCmp("mapPanel").tapMarker(this,marker,pos);
        });

        this.markerArr.push( marker );
    },

    tapMarker: function(me,marker,pos) {
//        alert(marker.model.get('id') + "   "+ marker.model.get('name'));
        Ext.getCmp('infoPopup').openPopup(marker.model);
//        marker.setAnimation(null);
    },

    locateMe: function() {
        this.addSpinner();
        if (this.infowindow)
            this.infowindow.close();

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var lat=position.coords.latitude;
                var lon=position.coords.longitude;
                Ext.getCmp("mapPanel").viewInfoWindow("You are here. ", lat, lon);
            }, function(error){
//                alert("Getting the error"+error.code + "\nerror mesg :" +error.message);
                Ext.getCmp("mapPanel").viewInfoWindow("Error: The Geolocation service failed. ");
            }, { timeout: 2000 });
        } else{
//            alert("navigator.geolocation not supported");
            Ext.getCmp("mapPanel").viewInfoWindow("Error: Your browser doesn\'t support geolocation. ");
        }
    },

    userLocation:null,
    viewInfoWindow: function(content, lat, lon) {
        var mapZoom = 10;
        if (lat==null || lon==null) {
            lat = 37.0625;
            lon = -95.677068;
            mapZoom = 4;
        }

        Ext.Ajax.request({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=true&language=en',
            method: 'GET',
            useDefaultXhrHeader:false,
            disableCaching: true,
            timeout:120000,
            params: {
                latlng: lat+','+lon
            },
            success: function(response) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp("mapPanel").userLocation = res.results[0].formatted_address;
            },
            failure: function(response) {

            }
        });

        var coord = new google.maps.LatLng ( lat, lon );
        if (this.gMap==null) {
            this.addMap(coord, mapZoom);
        } else {
            this.unmask();
            this.gMap.setCenter(coord);
            this.gMap.setZoom( mapZoom );
        }

        if (this.infowindow)
            this.infowindow.close();

        var options = {
            map: this.gMap,
            position: coord,
            content: content
        };
        this.infowindow = new google.maps.InfoWindow(options);
    },

    addSearchPanelInteractive: function() {
        var input = document.getElementById('pac-input').getElementsByTagName('input')[0];
        this.searchBox = new google.maps.places.SearchBox( (input) );
        this.addSearchItemHandlers();

        google.maps.event.addListener( this.searchBox, 'places_changed', function() {

            that = Ext.getCmp("mapPanel");
            that.autoDirection = true;
            var places = that.searchBox.getPlaces();
            var options = {
                map: that.gMap,
                position: places[0].geometry.location,
                content: places[0].name
            };

            if (that.infowindow)
                that.infowindow.close();

            that.infowindow = new google.maps.InfoWindow(options);
            that.gMap.setCenter(places[0].geometry.location);
            that.gMap.setZoom(14);
        });
    },

    changeTraffic: function() {
        if (this.trafficLayer == null) {
            this.trafficLayer = new google.maps.TrafficLayer();
        }

        if (this.trafficLayer.getMap()==null) {
            this.trafficLayer.setMap(this.gMap);
            Ext.get('trafficBtn').addCls("main-page-menupanel-traffic-select");
        } else {
            this.trafficLayer.setMap(null);
            Ext.get('trafficBtn').removeCls("main-page-menupanel-traffic-select");
        }

    },
    changeType: function( val ) {
        this.gMap.setMapTypeId( val );
    },

    onSearchTypeStations: function( lngSelectFlag, cngSelectFlag ) {

        var k=0, lng =this.markerArr.length, marker, fuel;
        for (k;k<lng;k++) {
            marker = this.markerArr[k];
            fuel = marker.model.get('fuel');

            if (lngSelectFlag && cngSelectFlag) {
                marker.setMap(this.gMap);
            } else if (lngSelectFlag && fuel>=1 ) {
                marker.setMap(this.gMap);
            } else if (cngSelectFlag && fuel!=1 ) {
                marker.setMap(this.gMap);
            } else {
                marker.setMap(null);
            }
        };
    }

});
