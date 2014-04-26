


Ext.define('App.view.SearchPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.searchPanel',
    id:'SearchPanel',

    config: {
        items:[
            {
                html: '<div style="position: absolute; top:50px; left: 50%; margin-left: -135px">'
                    + '<img src="img/main-page-toolbar-search.png" style="width:270px;height:46px;"></div>'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});
