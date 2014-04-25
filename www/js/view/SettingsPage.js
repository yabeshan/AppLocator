


Ext.define('App.view.SettingsPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.settingsPage',
    id:'SettingsPage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
                title:'Settings',
                items:[{
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    listeners: {
                        tap: function() {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:1, direction:'right'}]
                            });
                        }
                    }
                }]
            },{
                html: '<div class="page"><br><br>Page content</div>'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});