
Ext.define('App.view.MainPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.mainPage',
    id:'MainPage',

    config: {
        items:[
            {
                width:  '100%',
                top:    '40px',
                bottom: '40px',
                zIndex: 1,
                xtype: 'mapPanel'
            },{
                top:    '50px',
                style:'left:50%; margin-left:-158px;',
                id:'searchHolder',
                zIndex: 2,
                items: [{
                    flex: 1,
                    xtype: 'searchPanel'
                }]
            },{
                width:'100%',
                height:'40px',
                top:'0px',
                zIndex: 3,
                style:'background:#30b457',

                html: '<div id="menuBtn" class="button start-page-menu main-page-toolbar-menu"></div>'
                    + '<div id="locateBtn" class="button start-page-menu main-page-toolbar-locateme"></div>',
                listeners: {
                    swipe: {
                        fn: function( e, node ) {
                            if (node.id=="menuBtn" && e.direction=="right") {
                                Ext.getCmp('menuPanel').openMenu();
                            }
                        },
                        element: 'innerElement'
                    },
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="menuBtn") {
                                Ext.getCmp('menuPanel').openMenu();
                            } else if (node.id=="locateBtn") {
                                Ext.getCmp('mapPanel').locateMe();
                            }

                        },
                        element: 'element'
                    }
                }
            },{
                width:  '100%',
                height: '100%',
                bottom: '0px',
                zIndex: 4,
                style:'pointer-events:none',
                xtype: 'changeInfoPanel'
            },{
                width:  '100%',
                height: '100%',
                zIndex: 10,
                xtype:  'sharePanel'
            },{
                width:  '100%',
                height: '100%',
                zIndex: 10,
                xtype:  'menuPanel'
            },{
                width:  '100%',
                height: '100%',
                top:'0px',
                zIndex: 11,
                xtype:  'infoPopup'
            },{
                width:  '100%',
                height: '100%',
                top:'0px',
                zIndex: 11,
                xtype:  'tripPlaner'
            }
        ]
    },

    initialize: function() {
//        this.update();
//        setTimeout( Ext.getCmp('tripPlaner').openPopup, 2000 )
    },
    update:function(){
        Ext.getCmp('mapPanel').update();
    }

});