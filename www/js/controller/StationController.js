
Ext.define('App.controller.StationController', {
    extend : 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        stores : ['StationStore'],
        models : ['StationModel'],
        refs: {
            myContainer: 'searchPanel'
        },
        control: {
            'searchPanel': {
                activate: 'onActivate'
            },
            'searchPanel searchfield[itemId=searchBox]' : {
                clearicontap : 'onClearSearch',
                keyup: 'onSearchKeyUp',
                focus: 'onFocusSearch'
            },
            'searchPanel list' : {
                itemtap : 'qwe'
            }
        }

    },

    qwe: function( view, idx, t, model, e, eOpts) {
        Ext.getCmp('mapPanel').addMarker( model, true )
    },

    onFocusSearch: function() {
        Ext.getCmp('searchPanel').showSearchResult();
    },

    onActivate: function() {

    },

    onSearchKeyUp: function(searchField) {
        queryString = searchField.getValue();
        console.log(this,'Please search by: ' + queryString);

        var store = Ext.getStore('StationStore');
        store.clearFilter();

        if(queryString){
            var thisRegEx = new RegExp(queryString, "i");
            store.filterBy(function(record) {
//                if (thisRegEx.test(record.get('name')) ||
//                    thisRegEx.test(record.get('continent')) ||
//                    thisRegEx.test(record.get('region'))) {
//                    return true;
//                };
                if ( thisRegEx.test(record.get('name')) ) {
                    return true;
                };
                return false;
            });
        }

    },

    onClearSearch: function() {
        console.log('Clear icon is tapped');
        var store = Ext.getStore('StationStore');
        store.clearFilter();
    },

    init: function() {

    }

});