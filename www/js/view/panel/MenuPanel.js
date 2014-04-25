


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
                    + '<div id="homeBtn" class="button main-page-menupanel-button">Logo</div>'
                    + '<div id="planTripBtn" class="button main-page-menupanel-button">Plan a Trip</div>'
                    + '<div id="aboutBtn" class="button main-page-menupanel-button">About</div>'
                    + '<div id="settingsBtn" class="button main-page-menupanel-button">Settings</div>'
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