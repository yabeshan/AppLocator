

Ext.define('App.view.MapPanel', {
    extend: 'Ext.Map',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    config: {
        width:'100%',
        height:'100%',
        mapOptions: {
            center: new google.maps.LatLng (34.0522,-118.2437),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI:true,
            zoom: 10
        }
    },

    gMap:null,
    initialize: function() {
        this.gMap = this.getMap();


        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-green.png',
            position: new google.maps.LatLng (34.067611,-118.447872)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-double.png',
            position: new google.maps.LatLng (34.060172,-118.236898)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-grey.png',
            position: new google.maps.LatLng (33.956294,-118.377032)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-blue.png',
            position: new google.maps.LatLng (34.023516,-118.03447)
        });

        this.locateMe();
    },

    locateMe: function() {
        if (navigator && navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(position){
                var lat=position.coords.latitude;
                var lon=position.coords.longitude;

                var centerCoord = new google.maps.LatLng ( lat, lon );
                Ext.getCmp('mapPanel').setMapCenter( centerCoord );
                Ext.getCmp('mapPanel').setMapOptions( {'zoom': 12} );

            }, function(error){
                alert("Getting the error"+error.code + "\nerror mesg :" +error.message);
            }, { timeout: 10000 });

        } else{
            alert("navigator.geolocation not supported");
        }
    },

    trafficLayer:null,
    changeTraffic: function() {
        if (this.trafficLayer == null) {
            this.trafficLayer = new google.maps.TrafficLayer();
        }

        if (this.trafficLayer.getMap()==null) {
            this.trafficLayer.setMap(this.gMap);
        } else {
            this.trafficLayer.setMap(null);
        }

    },
    changeType: function( val ) {
        this.gMap.setMapTypeId( val );
    },

    markerArr:[],
    addMarker: function( model, positionFlag ) {
        Ext.getCmp('searchPanel').hideSearchResult();

        var lat = model.get('latitude');
        var lon = model.get('longitude');

        if (positionFlag) {
            var centerCoord = new google.maps.LatLng ( lat, lon );
            Ext.getCmp('mapPanel').setMapCenter( centerCoord );
            Ext.getCmp('mapPanel').setMapOptions( {'zoom': 18} );
        }

        var createFlag = this.markerArr[ model.get('id') ];
        if (createFlag==null) {
            var fuel = model.get('fuel');
            var icon = (fuel==0) ? 'img/map-point-blue.png' : ( (fuel==1) ? 'img/map-point-green.png' : 'img/map-point-double.png' );
            var marker = new google.maps.Marker({
                map: this.gMap,
                animation: google.maps.Animation.DROP,
                icon: 'img/map-point-green.png',
                position: new google.maps.LatLng ( lat , lon )
            });
            this.markerArr[ model.get('id') ] = true;
        }

    }
});


/*
Ext.define('App.view.MapPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    config: {

        items:[
            {
                html:'<div style="position: absolute;top:50%;left:50%;margin-left: -60px;">MAP DISABLED</div>'
            },{
                xtype:'button',
                height: '500px'
            }
        ]
    },

    addMarker: function( model ) {
        console.log( "add marker  " + model.get('name') );
    }
});
*/
