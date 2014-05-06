
Ext.define('MyApp.controller.SearchDemo', {
    extend : 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),
        stores : ['Countries'],
        models : ['Country'],
        refs: {
            myContainer: 'mainPanel'
        },
        control: {
            'mainPanel': {
                activate: 'onActivate'
            },
            'mainPanel searchfield[itemId=searchBox]' : {
                clearicontap : 'onClearSearch',
                keyup: 'onSearchKeyUp'
            }
        }

    },

    onActivate: function() {
        console.log('Main container is active');
    },

    onSearchKeyUp: function(searchField) {
        queryString = searchField.getValue();
        console.log(this,'Please search by: ' + queryString);

        var store = Ext.getStore('Countries');
        store.clearFilter();

        if(queryString){
            var thisRegEx = new RegExp(queryString, "i");
            store.filterBy(function(record) {
                if (thisRegEx.test(record.get('name')) ||
                    thisRegEx.test(record.get('continent')) ||
                    thisRegEx.test(record.get('region'))) {
                    return true;
                };
                return false;
            });
        }

    },

    onClearSearch: function() {
        console.log('Clear icon is tapped');
        var store = Ext.getStore('Countries');
        store.clearFilter();
    },

    init: function() {
        console.log('Controller initialized');
    }

});

Ext.define('MyApp.view.MainPanel', {
    extend: 'Ext.dataview.List',
    alias : 'widget.mainPanel',

    config: {
        store : 'Countries',



        itemTpl:  '<div class="myContent">'+
            '<div>Country is <b>{name}</b></div>' +
            '<div>Continent: <b>{continent}</b> Region: <b>{region}</b></div>' +
            '</div>',

        emptyText: '<div class="myContent">No Matching Countries</div>',

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',

                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search...',
                        itemId: 'searchBox'
                    }
                ]
            }
        ]

    }
});

Ext.define('MyApp.store.Countries', {
    extend: 'Ext.data.Store',

    config: {
        model: 'MyApp.model.Country',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'http://www.7id.biz/data/stations.json',
            reader: {
                type: 'json',
                totalProperty: 'totalCount',
                rootProperty: 'countries',
                successProperty: 'success'
            }
        }
    }
});

Ext.define('MyApp.model.Country', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'code',
            'name',
            'continent',
            'region',
            'lifeExpectancy',
            'gnp'
        ]
    }
});


Ext.Loader.setConfig({
    enabled: true
});

Ext.application({

    name: 'MyApp',
    appFolder: 'app',

    requires: [
        'MyApp.view.MainPanel',
    ],

    views : ['MainPanel'],
    controllers: ['SearchDemo'],

    launch: function() {
        console.log('Application launch');
        Ext.create('Ext.Container', {
            fullscreen: true,
            layout: 'vbox',
            items: [{
                flex: 1,
                xtype: 'mainPanel'
            }]
        });
    }

});






/*
var appInit = function() {
    if (initflag==true) return;

    Ext.application({
        name: 'App',

        controllers: [
            'PageController', 'StationController'
        ],

        views: [
            'StartPage', 'MainPage', 'PlanTripPage', 'AboutPage', 'SettingsPage', 'SharePage'
        ],

        launch: function() {

            Ext.create('Ext.Panel', {
                id:'panelHolder',
                fullscreen: true,
                layout: 'card',
                activeItem: 1,
                cls:'scaleApp',
                items: [ {xtype:'startPage'}, {xtype:'mainPage'}, {xtype:'planTripPage'},
                    {xtype:'aboutPage'}, {xtype:'settingsPage'}, {xtype:'sharePage'} ]
            });

        }
    });
};

var initflag = false;
var onDeviceReady = function() {
    appInit();
    initflag = true;
    window.onload = function(){};
};

document.addEventListener('deviceready', onDeviceReady, false);
window.onload=function(){
    setTimeout( onDeviceReady, 1000 );
};
*/