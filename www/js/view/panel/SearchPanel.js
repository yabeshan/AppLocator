


Ext.define('App.view.SearchPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.searchPanel',
    id:'SearchPanel',

    config: {
        layout:'vbox',
        items:[
            {
                style:'position:relative;left: 50%; margin-left: -172px',
                html: '<img id="searchText" src="img/main-page-toolbar-search-text.png" style="width:289px;height:52px;">'
                    + '<img id="searchBtn" src="img/main-page-toolbar-search-btn.png" style="width:55px;height:52px;">',
                itemId: 'testing',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="searchText") {
                                Ext.getCmp('SearchPanel').showSearchResult();
                            }
                            if (node.id=="searchBtn") {
                                Ext.getCmp('SearchPanel').hideSearchResult();
                            }
                        },
                        element: 'element'
                    }
                }
            },{
                id:'searchList',
                style:"background-color: rgba(255,255,255,.8)",
                xtype:  'list',
                width:  '100%',
                height: '100%',
                itemTpl: [
                    '{name}  {continent} {region}'
                ],
                store: 'StationStore'
            }
        ]
    },
    initialize: function(me, eOpts) {
        this.hideSearchResult();
    },
    showSearchResult: function() {
        Ext.getCmp('searchList').show();
    },
    hideSearchResult: function() {
        Ext.getCmp('searchList').hide();
    }
});
