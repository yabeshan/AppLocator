

Ext.define('App.view.SearchPanel', {
    extend: 'Ext.Container',
    alias : 'widget.searchPanel',
    id:'searchPanel',

    config: {

        items: [
            {
                layout:'hbox',
                items: [
                    {
                        cls: 'searchfield-stations',
                        xtype: 'searchfield',
                        placeHolder: 'search by address, city or zip',
                        itemId: 'searchBox',
                        id:'pac-input'
                    },{
                        style:'cursor:pointer;',
                        html:'<img id="searchBtn" src="img/main-page-toolbar-search-btn.png" style="width:44px;height:52px;">',
                        listeners: {
                            tap: {
                                fn: function( e, node ) {
                                    Ext.getCmp("mapPanel").startGeocoderPosition();
                                    Ext.getCmp('searchPanel').hideSearchResult();
                                },
                                element: 'element'
                            }
                        }
                    }
                ]
            },{
                id:'searchList',
                xtype:  'list',
                style:"background-color: rgba(255,255,255,.8);font-size:65%;margin-left:10px;",
                width:'295px',
                store : 'StationStore',
                itemTpl:  '<div><b>{name}</b>,  {country}</div>'
                         +'<div>{zip}, {state}, {city}, {address}</div>',
                emptyText: '<div class="myContent"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            Ext.getCmp('searchPanel').hideSearchResult();
                        },
                        element: 'element'
                    }
                }
            }
        ]

    },
    initialize: function(me, eOpts) {
        this.hideSearchResult();
    },
    showSearchResult: function() {
//        Ext.getCmp('searchList').setStyle('width:100%;height:300px');
//        Ext.getCmp('searchList').show();
    },
    hideSearchResult: function() {
        Ext.getCmp('searchList').hide();
        Ext.getCmp('searchList').setStyle('width:0px;height:0px');
    }

});
