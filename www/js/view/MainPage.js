
Ext.define('App.view.MainPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.mainPage',
    id:'MainPage',

    config: {
        items:[
            {
                width:  '100%',
                top:    '40px',
                bottom: '50px',
                zIndex: 1,
                id:     'mapHolder'
            },{
                width:  '100%',
                top:    '50px',
                bottom: '110px',
                zIndex: 2,
                xtype:  'searchPanel'
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

                            }

                        },
                        element: 'element'
                    }
                }
            },{
                width:  '100%',
                height: '50px',
                bottom: '0px',
                zIndex: 4,
                xtype: 'changeInfoPanel'
            },{
                width:  '100%',
                height: '100%',
                zIndex: 10,
                xtype:  'menuPanel'
            }
        ]
    },

    initialize: function() {
        this.update();
    },
    mapContent:null,
    update:function(){
        if (this.mapContent == null) {
            this.mapContent = Ext.create('App.view.MapPanel');
            Ext.getCmp("mapHolder").add( this.mapContent );
        }
    }

});