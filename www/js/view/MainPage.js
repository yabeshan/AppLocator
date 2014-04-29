

Ext.define('App.view.MainPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.mainPage',
    id:'MainPage',

    config: {
        items:[
            {
                xtype: 'mapPanel'
            },{
                xtype: 'searchPanel'
            },{
                style:'position:absolute;top:0px;height:40px;width:100%;background:#30b457',
                title:'',
                html: '<div id="menuBtn" class="button start-page-menu main-page-toolbar-menu"></div>'
                    + '<div id="locateBtn" class="button start-page-menu main-page-toolbar-locateme"></div>',
                listeners: {
                    swipe: {
                        fn: function( e, node ) {
                            if (node.id=="menuBtn" && e.direction=="right") {
                                alert("swipe menu");
                            }
                        },
                        element: 'innerElement'
                    },
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="menuBtn") {
                                Ext.getCmp('menuPanel').openMenu();
                            } else if (node.id=="locateBtn") {

                            }

                        },
                        element: 'element'
                    }
                }
            },{
                xtype: 'changeInfoPanel',
                cls:'info-zoom'
            },{
                xtype: 'menuPanel'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});