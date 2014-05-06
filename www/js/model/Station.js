
Ext.define('App.model.StationModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'name',
            'status'
        ]
    }
});

Ext.define('App.store.StationStore', {
    extend: 'Ext.data.Store',
    config: {
        model: "App.model.StationModel",
        autoLoad: true,

        proxy: {
            type: "ajax",
            url: "stationsTmp.json",

            reader: {
                type: "json",
                rootProperty: "test"
            }
        }

        /*
        data  : [
            { id : 'continent1', name : 'name1', status : 'region1' },
            { id : 'continent2', name : 'name2', status : 'region2' },
            { id : 'continent3', name : 'name3', status : 'region3' }
        ]
           */
    },
    load: function() {

    }
});