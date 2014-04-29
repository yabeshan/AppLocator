

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
                cls:'info-zoom',
                html: '<div class="main-page-menu-panel">'
                    + '<div id="homeBtn" class="button main-page-menupanel-button main-page-menupanel-logo"></div>'

                    + '<div id="mapviewBtn" class="button main-page-menupanel-button main-page-menupanel-mapview"></div>'
                    + '<div id="aerialBtn" class="button main-page-menupanel-button main-page-menupanel-aerialview"></div>'
                    + '<div id="trafficBtn" class="button main-page-menupanel-button main-page-menupanel-traffic"></div>'

                    + '<div id="planTripBtn" class="button main-page-menupanel-button main-page-menupanel-tripplanner"></div>'
                    + '<div id="shareBtn" class="button main-page-menupanel-button main-page-menupanel-share"></div>'

                    + '<div id="settingsBtn" class="button main-page-menupanel-button main-page-menupanel-settings"></div>'
                    + '<div id="aboutBtn" class="button main-page-menupanel-button main-page-menupanel-about"></div>'
                    + '</div>'
//                html:'<div style="position:absolute;top:40px;left:40px;background-color: #900;width: 500px;height: 200px">222222</div>'
//                xtype: 'changeInfoPanel'
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