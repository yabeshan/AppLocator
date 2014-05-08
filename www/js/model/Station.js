
Ext.define('App.model.StationModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'name',
            'status',
            'address',
            'city',
            'state',
            'zip',
            'country',
            'latitude',
            'longitude',
            'open',
            'close',
            'fuel'
        ]
    }
});

Ext.define('App.store.StationStore', {
    extend: 'Ext.data.Store',
    config: {
        model: "App.model.StationModel",
        autoLoad: true,

        /*
        data  : [
            {
                "id":10002,"name":"Clean Energy - Boundary & Dominion","status":"1","address":"3030 Boundary Rd",
                "city":"Burnaby","state":"BC","zip":"V5M 4A1","country":"Canada","latitude":49.256472,"longitude":-123.023465,
                "type":"0","fuel":"0","open":"7:00","close":"19:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":"nothing special"
            },{
                "id":10004,"name":"Clean Energy - Cloverdale Chevron","status":"1","address":"17790 56th Ave",
                "city":"Surrey","state":"BC","zip":"V3S 1C7","country":"Canada","latitude":49.103785,"longitude":-122.729808,
                "type":"0","fuel":"0","open":"8:00","close":"20:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":""
            },{
                "id":13000,"name":"Clean Energy - San Francisco Olympian Oil","status":"1","address":"2690 Third Street",
                "city":"San Francisco","state":"CA","zip":"94107","country":"USA","latitude":37.755584,"longitude":-122.388208,
                "type":"0","fuel":"0","open":"12:00","close":"0:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":""
            },{
                "id":13003,"name":"Clean Energy - Elk Grove","status":"1","address":"9050 Elkmont Way","city":"Elk Grove",
                "state":"CA","zip":"95624","country":"USA","latitude":38.38145065,"longitude":-121.364357,
                "type":"0","fuel":"0","open":"13:00","close":"1:00","monday":"Yes","tuesday":"Yes","wednesday":"Yes",
                "thursday":"Yes","friday":"Yes","saturday":"No","sunday":"","vehicle":0,"payment":"0","flow":0,"special":""
            }
        ]
        */

        proxy: {
            type: 'ajax',
            url: 'data/stationsTmp.json',
            reader: {
                type: 'json',
                totalProperty: 'totalCount',
                rootProperty: 'stations',
                successProperty: 'success'
            }
        }


    }
});

