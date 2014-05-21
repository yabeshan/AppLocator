


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
                html: '<div class="page"><br><br><p style="padding-left: 20%;text-align: left">Version database: xx-xx-xx<br>Last update: yy-yy-yy<br><br><button style="width: 200px; height: 80px">Update now</button></p></div>'
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});