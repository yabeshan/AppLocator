
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
                cls:'menu-zoom',
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
                            var id=-1, direction='left';
                            switch (node.id) {
                                case "homeBtn":
                                    id = 0;
                                    direction='right';
                                    break;
                                case "planTripBtn":
                                    Ext.getCmp('tripPlaner').openPopup();
                                    break;
                                case "aboutBtn":
                                    id = 3;
                                    break;
                                case "settingsBtn":
                                    id = 4;
                                    break;
                                case "shareBtn":
                                    Ext.getCmp('sharePanel').showShare();
                                    break;
                                case "trafficBtn":
                                    Ext.getCmp('mapPanel').changeTraffic();
                                    break;
                                case "mapviewBtn":
                                    Ext.get('aerialBtn').setVisible(true);
                                    Ext.get('mapviewBtn').setVisible(false);
                                    Ext.getCmp('mapPanel').changeType( google.maps.MapTypeId.ROADMAP );
                                    break;
                                case "aerialBtn":
                                    Ext.get('aerialBtn').setVisible(false);
                                    Ext.get('mapviewBtn').setVisible(true);
                                    Ext.getCmp('mapPanel').changeType( google.maps.MapTypeId.HYBRID );
                                    break;
                            }
                            if (id>=0) {
                                App.app.dispatch({
                                    controller:'PageController',
                                    action:'goPage',
                                    args:[{nextPage:id, direction:direction}]
                                });
                            }
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        Ext.getCmp('menuPanel').closeMenu();
        setTimeout(function(){
            Ext.get('mapviewBtn').setVisible(false);
        },500)
    },
    openMenu: function() {
        Ext.getCmp('menuPanel').setStyle({'pointer-events':'all'});
        Ext.getCmp('modalBG').show();
        Ext.getCmp('menuList').show();
    },
    closeMenu: function() {
        Ext.getCmp('menuPanel').setStyle({'pointer-events':'none'});
        Ext.getCmp('modalBG').hide();
        Ext.getCmp('menuList').hide();
    }

});