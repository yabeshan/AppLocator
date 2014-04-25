

Ext.define('App.view.MainPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.mainPage',
    id:'MainPage',

    config: {
        items:[
            {
                xtype: 'mapPanel'
            },{
                style:'position:absolute;top:0px;height:40px;width:100%;background:#30b457',
                title:'',
                html: '<div id="menuBtn" style="position: absolute; left: 10px;background-color: #900">Menu button</div><div id="locateBtn" style="position: absolute; right: 10px">Locate Me</div>',
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
                style:'position:absolute;background:#FFF;bottom:0px;height:40px;width:100%;',
                title:'',
                html: '<div id="menuBtn" style="position: absolute; left: 10px;background-color: #900">Menu button</div><div id="locateBtn" style="position: absolute; right: 10px">Locate Me</div>',
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

                            } else if (node.id=="locateBtn") {

                            }

                        },
                        element: 'element'
                    }
                }
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