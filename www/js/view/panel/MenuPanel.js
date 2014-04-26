


Ext.define('App.view.MenuPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.menuPanel',
    id:'menuPanel',

    config: {
        items:[
            {
                id:'modalBG',
                html:'<div class="main-page-menu-popup-panel"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            Ext.getCmp('menuPanel').closeMenu();
                        },
                        element: 'element'
                    }
                }
            },{
                id:'menuList',
                html: '<div class="main-page-menu-panel">'
                    + '<div id="homeBtn" class="button main-page-menupanel-button main-page-menupanel-logo"></div>'

                    + '<div id="mapviewBtn" class="button main-page-menupanel-button main-page-menupanel-mapview"></div>'
                    + '<div id="aerialBtn" class="button main-page-menupanel-button main-page-menupanel-aerialview"></div>'
                    + '<div id="trafficBtn" class="button main-page-menupanel-button main-page-menupanel-traffic"></div>'

                    + '<div id="planTripBtn" class="button main-page-menupanel-button main-page-menupanel-tripplanner"></div>'
                    + '<div id="shareBtn" class="button main-page-menupanel-button main-page-menupanel-share"></div>'

                    + '<div id="settingsBtn" class="button main-page-menupanel-button main-page-menupanel-settings"></div>'
                    + '<div id="aboutBtn" class="button main-page-menupanel-button main-page-menupanel-about"></div>'
                    + '</div>',

                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            Ext.getCmp('menuPanel').closeMenu();
                            var id, direction='left';
                            switch (node.id) {
                                case "homeBtn":
                                    id = 0;
                                    direction='right';
                                    break;
                                case "planTripBtn":
                                    id = 2;
                                    break;
                                case "aboutBtn":
                                    id = 3;
                                    break;
                                case "settingsBtn":
                                    id = 4;
                                    break;
                                case "shareBtn":
                                    id = 5;
                                    break;
                            }
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:id, direction:direction}]
                            });
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        Ext.getCmp('menuPanel').closeMenu();
    },
    update:function(){

    },
    openMenu: function() {
        Ext.getCmp('modalBG').show();
        Ext.getCmp('menuList').show();
    },
    closeMenu: function() {
        Ext.getCmp('modalBG').hide();
        Ext.getCmp('menuList').hide();
    }

});