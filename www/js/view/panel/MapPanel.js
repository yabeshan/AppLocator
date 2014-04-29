
/*
Ext.define('MyApp.view.MyMap', {
    extend: 'Ext.Map',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    config: {
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
            position: new google.maps.LatLng (34.0522,-118.2437)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-double.png',
            position: new google.maps.LatLng (34.0022,-118.1037)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-grey.png',
            position: new google.maps.LatLng (34.1002,-118.3437)
        });
        var marker = new google.maps.Marker({
            map: this.gMap,
            animation: google.maps.Animation.DROP,
            icon: 'img/map-point-blue.png',
            position: new google.maps.LatLng (34.1022,-118.105)
        });
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
    }
});

*/

Ext.define('App.view.MapPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    config: {

        items:[
            {
                html:'<div style="position: absolute;top:50%;left:50%;margin-left: -60px">MAP DISABLED 111</div>'
            }
        ]
    }
});

