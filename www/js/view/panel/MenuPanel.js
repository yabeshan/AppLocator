


Ext.define('App.view.MenuPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.menuPanel',
    id:'menuPanel',

    config: {
        items:[
            {
                html: '<div style="position: absolute; background-color: rgba(100,240,100,.5); width: 400px; height: 70%;top:60px">'
                    + '<div id="homeBtn" class="button main-page-menupanel-button">Logo</div>'
                    + '<div id="planTripBtn" class="button main-page-menupanel-button">Plan a Trip</div>'
                    + '<div id="aboutBtn" class="button main-page-menupanel-button">About</div>'
                    + '<div id="settingsBtn" class="button main-page-menupanel-button">Settings</div>'
                    + '</div>',

                listeners: {
                    tap: {
                        fn: function( e, node ) {
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

    initialize: function() {},
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }

});