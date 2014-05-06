
Ext.define('App.model.StationModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'name',
            'continent',
            'region'
        ]
    }
});

Ext.define('App.store.StationStore', {
    extend: 'Ext.data.Store',
    config: {
        data  : [
            { continent : 'continent1', name : 'name1', region : 'region1' },
            { continent : 'continent2', name : 'name2', region : 'region2' },
            { continent : 'continent3', name : 'name3', region : 'region3' }
        ]

    }
});