


Ext.define('App.view.TestPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.testPanel',
    id:'testPanel',

    config: {
        items:[
            {
                id:'modalBG2',
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
                id:'menuList2',
                cls:'menu-zoomer',
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
                                case "trafficBtn":
                                    Ext.getCmp('mapPanel').changeTraffic();
                                    break;
                                case "mapviewBtn":
                                    Ext.getCmp('mapPanel').changeType( google.maps.MapTypeId.ROADMAP );
                                    break;
                                case "aerialBtn":
                                    Ext.getCmp('mapPanel').changeType( google.maps.MapTypeId.HYBRID );
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
//        Ext.getCmp('menuPanel').closeMenu();
//        setTimeout( Ext.getCmp('menuPanel').openMenu, 1000);
    },
    update:function(){

    },
    openMenu: function() {
        Ext.getCmp('modalBG2').show();
        Ext.getCmp('menuList2').show();
    },
    closeMenu: function() {
        Ext.getCmp('modalBG2').hide();
        Ext.getCmp('menuList2').hide();
    }

});


/*
Ext.define('App.view.Popup1Panel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popup1Panel',
    id:'popup1Panel',

    config: {
        items:[{
            html:'<div style="background-color: #f1f2f2;height: 36px;width:100%">'
                + '<img id="defaultsBtn" src="img/main-page-moreinfo-defaults.png" style="width:102px;height:36px;float:left" />'
                + '<img id="checkBtn" src="img/main-page-moreinfo-check.png" style="width:36px;height:36px;float:right" /></div>',
            listeners: {
                tap: {
                    fn: function( e, node ) {
                        if (node.id=="checkBtn") {
                            Ext.getCmp('changeInfoPanel').hidePopup1();
                        }
                    },
                    element: 'element'
                }
            }
        },{
            html:'<div style="background-color: #FFF;height:309px;width:100%">'
                + '<img src="img/main-page-moreinfo-popup1.png" style="width:270px;height:299px;" /></div>'
        },{
            html:'<div class="main-page-changeinfo-bottom-arrow"></div>',
            listeners: {
                tap: {
                    fn: function( e, node ) {
                        Ext.getCmp('changeInfoPanel').showPopup2();
                        Ext.getCmp('changeInfoPanel').hidePopup1();
                    },
                    element: 'element'
                }
            }
        }]
    }
});


Ext.define('App.view.Popup2Panel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popup2Panel',
    id:'popup2Panel',

    config: {
        items:[{
            html:'<div style="background-color: #f1f2f2;height: 36px;width:100%">'
                + '<img id="defaultsBtn" src="img/main-page-moreinfo-defaults.png" style="width:102px;height:36px;float:left" />'
                + '<img id="checkBtn" src="img/main-page-moreinfo-check.png" style="width:36px;height:36px;float:right" /></div>',
            listeners: {
                tap: {
                    fn: function( e, node ) {
                        if (node.id=="checkBtn") {
                            Ext.getCmp('changeInfoPanel').hidePopup2();
                        }
                    },
                    element: 'element'
                }
            }
        },{
            html:'<div class="main-page-changeinfo-top-arrow"></div>',
            listeners: {
                tap: {
                    fn: function( e, node ) {
                        Ext.getCmp('changeInfoPanel').showPopup1();
                        Ext.getCmp('changeInfoPanel').hidePopup2();
                    },
                    element: 'element'
                }
            }
        },{
            html:'<div style="background-color: #FFF;height:299px;width:100%">'
                + '<img src="img/main-page-moreinfo-popup2.png" style="width:270px;height:319px;" /></div>'
        }]
    }
});



Ext.define('App.view.ChangeInfoPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.changeInfoPanel',
    id:'changeInfoPanel',

    config: {
        items:[
            {
                cls:'main-page-changeinfo-panel',
//                html:'<div style="background-color: #900;width:500px;height: 200px">1111111111</div>'
                xtype:'popup1Panel'
            },{
                cls:'main-page-changeinfo-panel',
                xtype:'popup2Panel'
            },{
                style:'position:absolute;background:#FFF;bottom:0px;height:50px;width:100%;',
                title:'',
                html: '<div id="lngBtn" class="main-page-bottom-toolbar main-page-toolbar-lng"></div>'
                    + '<div id="cngBtn" class="main-page-bottom-toolbar main-page-toolbar-cng"></div>'
                    + '<div id="bothBtn" class="main-page-bottom-toolbar main-page-toolbar-both"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="menuBtn") {}

                            Ext.getCmp('changeInfoPanel').showPopup1();

                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        this.hidePopup1();
        this.hidePopup2();
    },
    update:function(){

    },
    showPopup1: function() {
        Ext.getCmp('popup1Panel').show();
    },
    showPopup2: function() {
        Ext.getCmp('popup2Panel').show();
    },
    hidePopup1: function() {
        Ext.getCmp('popup1Panel').hide();
    },
    hidePopup2: function() {
        Ext.getCmp('popup2Panel').hide();
    }

});

    */