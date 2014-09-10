


Ext.define('App.view.SettingsPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.settingsPage',
    id:'SettingsPage',

    config: {
        items:[
            {
                xtype:'toolbar',
                style:'background:#30b457',
                title:'Settings'
            },{
                html: '<img id="backBtn" src="img/icons_button-back.png" style="position:absolute;z-index:90000; top:0px; left:0px;height:47px;cursor:pointer">'
                    +'<div class="page"><br><br>'
//                    +'<p style="padding-left: 20%;text-align: left">Version database: xx-xx-xx<br>Last update: yy-yy-yy<br><br><button style="width: 200px; height: 80px">Update now</button></p>'
//                    +'<p style="padding-left: 20%;text-align: left">Checking for update...</p>'
                    +'<p style="width: 100%;text-align: center">Your software is up to date (v0.2.4)</p><br><br>'
                    +'<div id="updateData" style="height: 50px;background-color: #30b457; width: 200px;padding: 10px;cursor: pointer;position:relative;left:50%;margin-left:-100px;color:#FFF">Update DB<br><span id="verdb"></span></div>'
                    +'</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="backBtn") {
                                App.app.dispatch({
                                    controller:'PageController',
                                    action:'goPage',
                                    args:[{nextPage:1, direction:'right'}]
                                });
                            } else if (node.id=="updateData") {
                                Ext.getCmp('mapPanel').updateDataStations( urlDATA );
                            }
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});