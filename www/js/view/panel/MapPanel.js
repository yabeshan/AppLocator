

Ext.define('App.view.MapPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.mapPanel',
    id:'mapPanel',

    config: {
        items:[
            {
                html: '<div style="position: absolute; background-color: rgba(240,100,100,.5); width: 100%; height: 100%;">'
                    + '<div style="position: absolute; top:40%; left: 40%">Map Panel</div></div>'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});