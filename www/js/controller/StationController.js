
Ext.define('App.controller.StationController', {
    extend: 'Ext.app.Controller',

    config: {
        stores: ['StationStore'],
        models: ['StationModel'],
        views:  ['SearchPanel']
    },

    init: function() {

    }

});