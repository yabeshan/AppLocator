

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

        Ext.getStore('StationStore').each(function(record,id){
            Ext.getCmp("mapPanel").addMarker( record, false );
        });

        if (navigator && navigator.geolocation) this.locateMe();
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

        var fuel = model.get('fuel');
        var icon = (fuel==0) ? 'img/map-point-blue.png' : ( (fuel==1) ? 'img/map-point-green.png' : 'img/map-point-double.png' );
        var marker = new google.maps.Marker({
            map: this.gMap,
//          animation: google.maps.Animation.DROP,
            icon: icon,
            position: new google.maps.LatLng ( lat , lon),
            model: model
        });

        if (positionFlag) {
            var centerCoord = new google.maps.LatLng ( lat, lon );
            Ext.getCmp('mapPanel').setMapCenter( centerCoord );
            Ext.getCmp('mapPanel').setMapOptions( {'zoom': 17} );
//            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        google.maps.event.addListener(marker,'mousedown',function(pos) {
            Ext.getCmp("mapPanel").tapMarker(this,marker,pos);
        });

        this.markerArr.push( marker );
    },

    tapMarker: function(me,marker,pos) {
        alert(marker.model.get('id') + "   "+ marker.model.get('name'));
//        marker.setAnimation(null);
    },

    onSearchTypeStations: function( lngSelectFlag, cngSelectFlag ) {
        var k=0, lng =this.markerArr.length, marker, fuel;
        for (k;k<lng;k++) {
            marker = this.markerArr[k];
            //remove listener
            marker.setMap(null);
        };
        this.markerArr = new Array();

        Ext.getStore('StationStore').each(function(record,id){
            fuel = record.get('fuel');
            if (lngSelectFlag && cngSelectFlag) {
                Ext.getCmp("mapPanel").addMarker( record, false );
            } else if (lngSelectFlag && fuel>=1 ) {
                Ext.getCmp("mapPanel").addMarker( record, false );
            } else if (cngSelectFlag && fuel!=1 ) {
                Ext.getCmp("mapPanel").addMarker( record, false );
            }
        });
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
