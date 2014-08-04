
Ext.define('App.view.MapPanel', {
    extend: 'Ext.Container',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    gMap:null,
    markerArr:[],
    markerViewArr:[],
    infowindow:null,
    trafficLayer:null,

    config: {
        width:'100%',
        height:'100%'
    },

    initialize: function(me, eOpts) {

    },

    nearStationForPoint:function( lat, lon) {
//        lat = 37.0625;
//        lon = -95.677068;

        var that = Ext.getCmp("mapPanel");
        var k=0, arr=that.markerViewArr, lng=arr.length, posx, posy, dist, point, pointMin, distMin=200;
        if (lng==0) return;
        for (k;k<lng;k++) {
            point=arr[k];
            posx = Math.pow( Math.abs( lat - arr[k].model.get("Latitude") ), 2);
            posy = Math.pow( Math.abs( lon - arr[k].model.get("Longitude") ), 2);
            dist = Math.sqrt(posx+posy);
            if (dist<distMin) {
                distMin = dist;
                pointMin = point;
            }
        }
//        console.log( lat +"    "+ pointMin.model.get("Latitude") );
//        console.log( lon +"    "+ pointMin.model.get("Longitude") );

        var ZOOM_MAX = 21;
        var points = [
            { lat: lat, lng: lon },
            { lat: pointMin.model.get("Latitude"), lng: pointMin.model.get("Longitude") }
        ];
        var markers = [];
        var bounds = new google.maps.LatLngBounds();

        for (var k=0; k<points.length; k++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(points[k].lat, points[k].lng)
            });
//            marker.setMap( Ext.getCmp("mapPanel").gMap );
//            markers.push( marker );
            bounds.extend( marker.getPosition() );
        }

        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();

        function latRad(lat) {
            var sin = Math.sin(lat * Math.PI / 180);
            var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
            return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        }
        var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
        var lngDiff = ne.lng() - sw.lng();
        var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

        function zoom(mapPx, worldPx, fraction) {
            return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        }
        var latZoom = zoom(200, 256, latFraction);
        var lngZoom = zoom(200, 256, lngFraction);
        var mapZoom = Math.min(latZoom, lngZoom, ZOOM_MAX);

        Ext.getCmp("mapPanel").gMap.setCenter( new google.maps.LatLng ( lat, lon ) );

        if (mapZoom<2) mapZoom=2;
        Ext.getCmp("mapPanel").gMap.setZoom( mapZoom );
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
            message: 'Loading...',
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

    searchBox:null,
    autoDirection:false,
    countObj:0,
    addSearchItemHandlers: function() {
        var obj1 = document.getElementsByClassName("pac-container");
        var obj2 = document.getElementsByClassName("pac-item");
        var that = Ext.getCmp('mapPanel');

        if (obj1[that.countObj] && that.countObj != obj1.length) {
            var k = obj1.length-1;
            for (k; k>=that.countObj; k--) {
                var el = Ext.get(obj1[k]);
                el.index = k;

                el.on({
                    tap : function(e, t) {
                        var input = Ext.getCmp("mapPanel").searchBoxInputArr[this.index];
                        var obj = e.target;
                        var item = obj.innerHTML;
                        if( item.indexOf('pac-matched">') < 0 ) {
                            obj = e.target.parentNode;
                            item = obj.innerHTML;
                        }
                        if( item.indexOf('pac-matched">') < 80 ) {
                            Ext.getCmp('mapPanel').addResultClickHandler( obj.parentNode.innerHTML, input );
                        } else {
                            Ext.getCmp('mapPanel').addResultClickHandler( item, input );
                        }
                    }
                });

            }
            that.countObj = obj1.length;


            /*
             var el = Ext.get(obj1[0]);
            el.on({
                tap : function(e, t) {
                    var obj = e.target;
                    var item = obj.innerHTML;
                    if( item.indexOf('pac-matched">') < 0 ) {
                        obj = e.target.parentNode;
                        item = obj.innerHTML;
                    }
                    if( item.indexOf('pac-matched">') < 80 ) {
                        Ext.getCmp('mapPanel').addResultClickHandler( obj.parentNode.innerHTML );
                    } else {
                        Ext.getCmp('mapPanel').addResultClickHandler( item );
                    }
                }
            });
             */
        }
    },

    startGeocoderPosition: function(result) {
        if (result==null) {
            result = document.getElementById('pac-input').getElementsByTagName('input')[0].value;
        }

        var mapPanel = Ext.getCmp("mapPanel");
        mapPanel.addSpinner();

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : result}, function(results, status){
//            alert(results +"   "+ status);
            if (status == google.maps.GeocoderStatus.OK) {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                position = new google.maps.LatLng(lat, lng);

                var that = Ext.getCmp("mapPanel");
                if (that.infowindow)
                    that.infowindow.close();

                var coord = new google.maps.LatLng ( lat, lng );
                var options = {
                    map: that.gMap,
                    position: coord,
                    content: result
                };

                that.infowindow = new google.maps.InfoWindow(options);
                Ext.getCmp('mapPanel').onSearchTypeStations();
                Ext.getCmp("mapPanel").nearStationForPoint( lat, lng );
            }
            setTimeout(function(){
                mapPanel.unmask();
            },500);
        });
    },

    addResultClickHandler: function (content, input) {
        that = Ext.getCmp("mapPanel");
        if (that.autoDirection) return;

        var start = content.indexOf('pac-matched">')+13,
            end = content.length- 7,
            center = String(content.slice(start, end)),
            arr = center.split("</span>"),
            country = (arr[2]) ? arr[2].replace('<span>', ',  ') : "" ,
            result = arr[0]+arr[1]+country;

//        var input = document.getElementById('pac-input').getElementsByTagName('input')[0];
//        input.value = result;
//        Ext.getCmp("mapPanel").startGeocoderPosition(result);

        input.value = result;
        if (input.type=='search') Ext.getCmp("mapPanel").startGeocoderPosition(result);
        else Ext.getCmp('tripPlaner').openPopup({'type':'change'});
    },

    completeMap: function(extMapComponent, googleMapComp) {
        var that = Ext.getCmp('mapPanel');
        that.unmask();
        that.addSearchPanelInteractive();
        Ext.getStore('StationStore').each(function(record,id){
            that.addMarker( record, false );
        });
        that.searchFilter = that.searchFilterDefault();
        that.onSearchTypeStations();
        that.nearStationForPoint( that.userCoord.lat, that.userCoord.lon );
    },

    addMarker: function( model, positionFlag ) {
        var lat = model.get('Latitude');
        var lon = model.get('Longitude');

        var status = model.get('StationStatus'), icon;
        if (status=='Coming Soon') {
            if (model.get('StationFuelTypeCNG')=='Yes' && model.get('StationFuelTypeLNG')=='No') {
                icon = 'img/map-point-blue-cs.png';
            } else if (model.get('StationFuelTypeLNG')=='Yes' && model.get('StationFuelTypeCNG')=='No') {
                icon = 'img/map-point-green-cs.png';
            } else {
                icon = 'img/map-point-double-cs.png';
            }
        } else if (status=='Under Maintenance') {
            icon = 'img/map-point-grey-cs.png';
        } else {
            if (model.get('StationFuelTypeCNG')=='Yes' && model.get('StationFuelTypeLNG')=='No') {
                icon = 'img/map-point-blue.png';
            } else if (model.get('StationFuelTypeLNG')=='Yes' && model.get('StationFuelTypeCNG')=='No') {
                icon = 'img/map-point-green.png';
            } else {
                icon = 'img/map-point-double.png';
            }
        }

        var marker = new google.maps.Marker({
//            map: this.gMap,
//          animation: google.maps.Animation.DROP,
            icon: icon,
            position: new google.maps.LatLng ( lat , lon),
            model: model,
            title: model.get("StationName") +", "+ model.get("StationZip") +", "+ model.get("StationCountry") +", "
                + model.get("StationState") +", "+ model.get("StationCity") +", "+ model.get("StationAddress")
        });

        if (positionFlag) {
            var centerCoord = new google.maps.LatLng ( lat, lon );
            Ext.getCmp('mapPanel').setMapCenter( centerCoord );
            Ext.getCmp('mapPanel').setMapOptions( {'zoom': 17} );
//            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        google.maps.event.addListener(marker,'click',function(pos) {
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
                Ext.getCmp("mapPanel").nearStationForPoint( lat, lon );
                Ext.getCmp("mapPanel").userCoord = {'lat':lat, 'lon':lon};
            }, function(error){
//                alert("Getting the error"+error.code + "\nerror mesg :" +error.message);
                Ext.getCmp("mapPanel").viewInfoWindow("Error: The Geolocation service failed. ");
            }, { timeout: 12000 });
        } else{
//            alert("navigator.geolocation not supported");
            Ext.getCmp("mapPanel").viewInfoWindow("Error: Your browser doesn\'t support geolocation. ");
        }
    },

    userLocation:null,
    userCoord:null,
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

    searchBoxInputArr:[],
    addSearchPanelInteractive: function() {
        var input = document.getElementById('pac-input').getElementsByTagName('input')[0];
        this.searchBox = new google.maps.places.SearchBox( (input) );
        this.searchBoxInputArr.push(input);
        setInterval( Ext.getCmp('mapPanel').addSearchItemHandlers, 1000);

//        google.maps.event.addListener( this.searchBox, 'places_changed', function() {
//
//            that = Ext.getCmp("mapPanel");
//            that.autoDirection = true;
//            var places = that.searchBox.getPlaces();
//            var options = {
//                map: that.gMap,
//                position: places[0].geometry.location,
//                content: places[0].name
//            };
//
//            if (that.infowindow)
//                that.infowindow.close();
//
//            that.infowindow = new google.maps.InfoWindow(options);
//            that.gMap.setCenter(places[0].geometry.location);
//            that.gMap.setZoom(14);
//        });
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

    searchFilter:null,
    searchFilterDefault: function() {
        return {
            'StationFuelTypeCNG'    :true,
            'StationFuelTypeLNG'    :true,
            'StationFuelTypeDSL'    :true,
            'StationFuelTypeRDM'    :true,

            'StationStatusActive'   :true,
            'StationStatusUnder'    :true,
            'StationStatusComing'   :false,

            'VehicleTypesCarsAndVans'   :false,
            'VehicleTypesBoxTrucks'     :false,
            'VehicleTypesSemiTrucks'    :false,

            'HoursOpenIs24H'        :false,
            'HoursOpenNow'          :false,
            'FlowRateLow'           :false,
            'FlowRateMedium'        :false,
            'FlowRateHigh'          :false,

            'paymentAny'        :false,
            'paymentMastercard' :false,
            'paymentWEX'        :false,
            'paymentCleanEnergy':false,
            'paymentAmex'       :false,
            'paymentCash'       :false,
            'paymentDiscover'   :false,
            'paymentOther'      :false,
            'paymentVisa'       :false,
            'paymentVoyager'    :false
        }
    },
    onSearchTypeStations: function() {
        var k=0, lng =this.markerArr.length, marker,
            typeFlag, typeCNG, typeLNG, typeDSL, typeRDM,
            statusFlag, hoursFlag, flowFlag,
            carsFlag, carsVans, carsBox, carsSemi;
        this.markerViewArr = [];

        for (k;k<lng;k++) {
            marker = this.markerArr[k];

            typeCNG = ( this.searchFilter.StationFuelTypeCNG && marker.model.get('StationFuelTypeCNG')=="Yes" );
            typeLNG = ( this.searchFilter.StationFuelTypeLNG && marker.model.get('StationFuelTypeLNG')=="Yes" );
            typeDSL = ( this.searchFilter.StationFuelTypeDSL && marker.model.get('StationFuelTypeDSL')=="Yes" );
            typeRDM = ( this.searchFilter.StationFuelTypeRDM && marker.model.get('StationFuelTypeRDM')=="Yes" );
            typeFlag =
                (typeCNG && typeLNG) || (typeCNG && typeRDM) || (typeLNG && typeRDM) ||
                (typeCNG || typeLNG || typeRDM);


            statusFlag =
                    ( this.searchFilter.StationStatusActive && marker.model.get('StationStatus')=="Active" ) ||
                    ( this.searchFilter.StationStatusUnder && marker.model.get('StationStatus')=="Under Maintenance" ) ||
                    ( this.searchFilter.StationStatusComing && marker.model.get('StationStatus')=="Coming Soon" ) ||
                    ( !this.searchFilter.StationStatusActive && !this.searchFilter.StationStatusUnder && !this.searchFilter.StationStatusComing );

            carsFlag = ( !this.searchFilter.VehicleTypesCarsAndVans && !this.searchFilter.VehicleTypesBoxTrucks && !this.searchFilter.VehicleTypesSemiTrucks );
            if (carsFlag==false) {
                /*
                carsVans = ( this.searchFilter.VehicleTypesCarsAndVans && marker.model.get('VehicleTypesCarsAndVans')=="Yes" );
                carsBox = ( this.searchFilter.VehicleTypesBoxTrucks && marker.model.get('VehicleTypesBoxTrucks')=="Yes" );
                carsSemi = ( this.searchFilter.VehicleTypesSemiTrucks && marker.model.get('VehicleTypesSemiTrucks')=="Yes" );
                if ( this.searchFilter.VehicleTypesCarsAndVans && this.searchFilter.VehicleTypesBoxTrucks && this.searchFilter.VehicleTypesSemiTrucks ) {
                    carsFlag = carsVans && carsBox && carsSemi;
                } else {
                    carsFlag = carsVans || carsBox || carsSemi;
                }
                */

                if ( this.searchFilter.VehicleTypesSemiTrucks ) {
                    carsFlag = marker.model.get('VehicleTypesSemiTrucks')=="Yes";
                } else if ( this.searchFilter.VehicleTypesBoxTrucks ) {
                    carsFlag = marker.model.get('VehicleTypesBoxTrucks')=="Yes" || marker.model.get('VehicleTypesSemiTrucks')=="Yes";
                } else if ( this.searchFilter.VehicleTypesCarsAndVans ) {
                    carsFlag = marker.model.get('VehicleTypesCarsAndVans')=="Yes" || marker.model.get('VehicleTypesBoxTrucks')=="Yes" || marker.model.get('VehicleTypesSemiTrucks')=="Yes";
                }
            }

            hoursFlag =
                    ( !this.searchFilter.HoursOpenIs24H && !this.searchFilter.HoursOpenNow ) ||
                    ( this.searchFilter.HoursOpenIs24H && this.searchFilter.HoursOpenNow ) ||
                    ( this.searchFilter.HoursOpenIs24H && marker.model.get('HoursOpenIs24H')=="Yes" ) ||
                    ( this.searchFilter.HoursOpenNow && (marker.model.get('HoursOpenIs24H')=="Yes" || Math.random()*100>50 ) );

            flowFlag =
                    ( !this.searchFilter.FlowRateLow && !this.searchFilter.FlowRateMedium && !this.searchFilter.FlowRateHigh ) ||
                    ( this.searchFilter.FlowRateLow && marker.model.get('CNG3000PSI')=="Yes" ) ||
                    ( this.searchFilter.FlowRateMedium && marker.model.get('CNG3000StandardNozzle')=="Yes" ) ||
                    ( this.searchFilter.FlowRateHigh && marker.model.get('CNG3000HighFlowNozzle')=="Yes" );

            if (typeFlag && statusFlag && carsFlag && hoursFlag && flowFlag) {
                marker.setMap(this.gMap);
                this.markerViewArr.push( marker );
            } else {
                marker.setMap(null);
            }
        };
//        alert(this.markerViewArr.length);
    }

});
