
Ext.define('App.view.InfoPopup' ,{
    extend: 'Ext.Container',
    alias : 'widget.infoPopup',
    id:'infoPopup',

    config: {
        items:[
            {
                cls:'info-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,.8);top:0px;left:0px;',
                html:'<img src="img/popup-station-info.png">',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            Ext.getCmp('infoPopup').closePopup();
                        },
                        element: 'element'
                    }
                }
            }
//            ,{
//                id:'menuList1',
//                cls:'menu-zoom',
//                html: '<div class="main-page-menu-panel">'
//                    + '</div>',
//
//                listeners: {
//                    tap: {
//                        fn: function( e, node ) {
//                            Ext.getCmp('infoPopup').closePopup();
//                        },
//                        element: 'element'
//                    }
//                }
//            }
        ]
    },

    initialize: function() {
        Ext.getCmp('infoPopup').closePopup();
    },
    openPopup: function() {
        Ext.getCmp('infoPopup').show();
    },
    closePopup: function() {
        Ext.getCmp('infoPopup').hide();
    }

});