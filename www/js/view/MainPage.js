

Ext.define('App.view.MainPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.mainPage',
    id:'MainPage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
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
                                alert('open menu');
                            } else if (node.id=="locateBtn") {
                                alert('locate');
                            }

                        },
                        element: 'element'
                    }
                }
            },{
                xtype: 'mapPanel'
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