
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

        if (mapZoom<=2) mapZoom=2;
        else mapZoom--;
        Ext.getCmp("mapPanel").gMap.setZoom( mapZoom );
    },

    update: function() {
        if (this.gMap==null) {
            this.addSpinner();

            this.viewInfoWindow();
//            setTimeout(Ext.getCmp("mapPanel").locateMe, 2000);
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
                        clearTimeout( Ext.getCmp('mapPanel').searchBoxInputUpd );
                        if( item.indexOf('pac-matched">') < 80 ) {
                            Ext.getCmp('mapPanel').addResultClickHandler( obj.parentNode.innerHTML, input );
                        } else {
                            Ext.getCmp('mapPanel').addResultClickHandler( item, input );
                        }
                    }
                });

            }
            that.countObj = obj1.length;
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

        /*
        var start = content.indexOf('pac-matched">')+13,
            end = content.length- 7,
            center = String(content.slice(start, end)),
            arr = center.split("</span>"),
            country = (arr[2]) ? arr[2].replace('<span>', ',  ') : "" ,
            result = arr[0]+arr[1]+country;
        */
        content = content.replace('</span><span>', ', ');
        var result = content.replace(/<[^>]+>/g,'');

        input.value = result;
        if (input.type=='search') Ext.getCmp("mapPanel").startGeocoderPosition(result);
        else Ext.getCmp('tripPlaner').openPopup({'type':'change'});
        input.focus();
    },

    completeMap: function(extMapComponent, googleMapComp) {
        var that = Ext.getCmp('mapPanel');
        if( !that.userCoord || !that.userCoord.lat || !that.userCoord.lon ) {
//            that.unmask();
//            that.addSpinner();
            if (Ext.getCmp("mapPanel").locateMeStartFlag==null) {
                Ext.getCmp("mapPanel").locateMe();
            }
            return;
        }

        that.unmask();
        var input = document.getElementById('pac-input').getElementsByTagName('input')[0];
        that.addSearchPanelInteractive( input, 'pac-input', true );
        setInterval( Ext.getCmp('mapPanel').addSearchItemHandlers, 1000);

        if (verDB!=verDB_new) {
            that.updateDataStations( urlDATA );
        } else {
            that.updateDataStationsComplete(false);
        }
    },

    updateDataStations: function( url) {
        Ext.getCmp('mapPanel').addSpinner();
        var store = Ext.getStore('StationStore');
        store.getProxy().set('url', url);
        store.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    console.log('complete upload data');
                    verDB=verDB_new;
                    Ext.get("verdb").dom.innerHTML = verDB;
                } else {
                    console.log('error upload data');
                }
                Ext.getCmp('mapPanel').updateDataStationsComplete(true);
            }
        });
    },

    updateDataStationsComplete: function( updateFlag ) {
        var that = Ext.getCmp('mapPanel');

        if (updateFlag && that.markerArr.length>0) {
            that.removeAllMarkers();
        }
        if (that.markerArr.length==0) {
            Ext.getStore('StationStore').each(function(record,id){
                that.addMarker( record, false );
            });
            that.searchFilter = that.searchFilterDefault();
        }

        that.onSearchTypeStations();
        that.nearStationForPoint( that.userCoord.lat, that.userCoord.lon );
        that.unmask();
    },

    removeAllMarkers: function() {
        var k=0, lng =this.markerArr.length, marker;
        this.markerViewArr = [];

        for (k;k<lng;k++) {
            marker = this.markerArr[k];
            marker.setMap(null);
        }
        this.markerArr = [];
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

    locateMeStartFlag:null,
    locateMe: function( tapFlag ) {
        var that = Ext.getCmp("mapPanel");
        that.locateMeStartFlag = true;
        that.addSpinner();
        if (that.infowindow)
            that.infowindow.close();

        Ext.getCmp("mapPanel").userCoord = {'lat':37.0625, 'lon':-95.677068};
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
                if (tapFlag) {
                    viewInfoPopup("  ", "Station Locator needs access to your location. Please turn on location access.");
                }
            }, { timeout: 12000 });
        } else{
//            alert("navigator.geolocation not supported");
            Ext.getCmp("mapPanel").viewInfoWindow("Error: Your browser doesn\'t support geolocation. ");
        }
        setTimeout( Ext.getCmp('mapPanel').completeMap, 100);
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
    searchBoxInputTxtArr:[],
    searchBoxInputUpd:null,
    addSearchPanelInteractive: function( input, id, disabledFlag ) {
        Ext.getCmp('mapPanel').searchBoxInputTxtArr[id] = {'txt':'', 'input':input};
        var item = Ext.getCmp('mapPanel').searchBoxInputTxtArr[id];

        if (!disabledFlag) {
            input.addEventListener('input', function( e )
            {
                if ( item.txt.length + 5 <  item.input.value.length) {
                    var txt = item.input.value;
                    Ext.getCmp('mapPanel').searchBoxInputUpd = setInterval(function(){
                        item.input.value = txt;
                    },500);
                } else {
                    clearInterval( Ext.getCmp('mapPanel').searchBoxInputUpd );
                }
                item.txt = item.input.value;
            });
        }

        this.searchBox = new google.maps.places.SearchBox( input );
        this.searchBoxInputArr.push(input);
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
            'VehicleTypesTractor'    :false,
            'VehicleTypesSemiTrucks'    :false,

            'HoursOpenIs24H'        :false,
            'HoursOpenNow'          :false,
            'FlowRateLow'           :false,
            'FlowRateMedium'        :false,
            'FlowRateHigh'          :false,

            'paymentSelect'     :false,

            'paymentAny'        :false,
            'paymentMastercard' :false,
            'paymentWEX'        :false,
            'paymentCleanEnergy':false,
            'paymentAmex'       :false,
            'paymentCash'       :false,
            'paymentDiscover'   :false,
            'paymentOther'      :false,
            'paymentVisa'       :false,
            'paymentVoyager'    :false,

            'paymentComdata'    :false,
            'paymentMasterFleet':false,
            'paymentTCH'        :false,
            'paymentTcheck'     :false,
            'paymentEFS'        :false,
            'paymentFuelman'    :false,
            'paymentSpeedway'   :false,
            'paymentVisaFleet'  :false,
            'paymentLegacy'     :false,
            'paymentWexFleet'   :false,
            'paymentGift'       :false
        }
    },
    onSearchTypeStations: function() {
        var k=0, lng =this.markerArr.length, marker,
            typeFlag, typeCNG, typeLNG, typeDSL, typeRDM,
            statusFlag, hoursFlag, flowFlag, payFlag,
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

            payFlag = this.getPayFlag(marker);

            if (typeFlag && statusFlag && carsFlag && hoursFlag && flowFlag && payFlag) {
                marker.setMap(this.gMap);
                this.markerViewArr.push( marker );
            } else {
                marker.setMap(null);
            }
        };

//        alert(this.markerViewArr.length);
    },
    getPayFlag: function(marker) {
        if (this.searchFilter.paymentAny ) return true;

        this.searchFilter.paymentSelect = (
            !this.searchFilter.paymentCleanEnergy &&
            !this.searchFilter.paymentMastercard &&
            !this.searchFilter.paymentWEX &&
            !this.searchFilter.paymentAmex &&
            !this.searchFilter.paymentCash &&
            !this.searchFilter.paymentDiscover &&
            !this.searchFilter.paymentVoyager &&
            !this.searchFilter.paymentComdata &&
            !this.searchFilter.paymentTCH &&
            !this.searchFilter.paymentTcheck &&
            !this.searchFilter.paymentEFS &&
            !this.searchFilter.paymentMasterFleet &&
            !this.searchFilter.paymentFuelman &&
            !this.searchFilter.paymentSpeedway &&
            !this.searchFilter.paymentVisaFleet &&
            !this.searchFilter.paymentLegacy &&
            !this.searchFilter.paymentWexFleet &&
            !this.searchFilter.paymentVisa &&
            !this.searchFilter.paymentGift &&
            !this.searchFilter.paymentOther
        );
        if (this.searchFilter.paymentSelect) return true;


        if (this.searchFilter.paymentCleanEnergy &&
            marker.model.get('PaymentTypesAcceptedCleanEnergyFuelCard')=="Yes") return true;
        if (this.searchFilter.paymentMastercard &&
            marker.model.get('PaymentTypesAcceptedMasterCard')=="Yes") return true;
        if (this.searchFilter.paymentWEX &&
            marker.model.get('PaymentTypesAcceptedWrightExpress')=="Yes") return true;
        if (this.searchFilter.paymentAmex &&
            marker.model.get('PaymentTypesAcceptedAmex')=="Yes") return true;

        if (this.searchFilter.paymentDiscover &&
            marker.model.get('PaymentTypesAcceptedDiscover')=="Yes") return true;
        if (this.searchFilter.paymentVoyager &&
            marker.model.get('PaymentTypesAcceptedVoyager')=="Yes") return true;
        if (this.searchFilter.paymentComdata &&
            marker.model.get('PaymentTypesAcceptedComData')=="Yes") return true;
        if (this.searchFilter.paymentTCH &&
            marker.model.get('PaymentTypesAcceptedTCH')=="Yes") return true;
        if (this.searchFilter.paymentTcheck &&
            marker.model.get('PaymentTypesAcceptedTcheck')=="Yes") return true;

        if (this.searchFilter.paymentEFS &&
            marker.model.get('PaymentTypesAcceptedEFS')=="Yes") return true;
        if (this.searchFilter.paymentMasterFleet &&
            marker.model.get('PaymentTypesAcceptedMasterCardFleet')=="Yes") return true;
        if (this.searchFilter.paymentFuelman &&
            marker.model.get('PaymentTypesAcceptedFuelmanFleetwide')=="Yes") return true;
        if (this.searchFilter.paymentSpeedway &&
            marker.model.get('PaymentTypesAcceptedSpeedway')=="Yes") return true;
        if (this.searchFilter.paymentVisaFleet &&
            marker.model.get('PaymentTypesAcceptedVisaFleet')=="Yes") return true;

        if (this.searchFilter.paymentLegacy &&
            marker.model.get('PaymentTypesAcceptedLegacyEFS')=="Yes") return true;
        if (this.searchFilter.paymentWexFleet &&
            marker.model.get('PaymentTypesAcceptedWEXFleetone')=="Yes") return true;
        if (this.searchFilter.paymentVisa &&
            marker.model.get('PaymentTypesAcceptedVisa')=="Yes") return true;

        if (this.searchFilter.paymentGift &&
            marker.model.get('PaymentTypesAcceptedPFGiftCard')=="Yes") return true;
        if (this.searchFilter.paymentOther &&
           ( marker.model.get('PaymentTypesAcceptedTranStar')=="Yes" ||
             marker.model.get('PaymentTypesAcceptedNaturalFuels')=="Yes")) return true;

        return false;
    }

});
