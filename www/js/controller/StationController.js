
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
//            'searchPanel': {
//                activate: 'onActivate'
//            },
//            'searchPanel searchfield[itemId=searchBox]' : {
//                clearicontap : 'onClearSearch',
//                keyup: 'onSearchKeyUp',
//                focus: 'onFocusSearch'
//            },
//            'searchPanel list' : {
//                itemtap : 'addMarker'
//            }
        }

    },

    addMarker: function( view, idx, t, model, e, eOpts) {
        Ext.getCmp('mapPanel').addMarker( model, true )
    },

    onFocusSearch: function() {
        Ext.getCmp('searchPanel').showSearchResult();
    },

    onActivate: function() {

    },

    onSearchKeyUp: function(searchField) {
        var queryString = searchField.getValue();
//        console.log(this,'Please search by: ' + queryString);

        var store = Ext.getStore('StationStore');
        store.clearFilter();

        if(queryString){
            var thisRegEx = new RegExp(queryString, "i");
            store.filterBy(function(record) {
                if ( thisRegEx.test(record.get('address')) ||
                    thisRegEx.test(record.get('zip'))  ||
                    thisRegEx.test(record.get('city')) ) {
                    return true;
                };
                return false;
            });
        }
    },

    onClearSearch: function() {
//         console.log('Clear icon is tapped');
        var store = Ext.getStore('StationStore');
        store.clearFilter();
    },

    init: function() {

    }

});