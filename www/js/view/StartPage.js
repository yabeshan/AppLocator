

Ext.define('App.view.StartPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.startPage',
    id:'StartPage',

    config: {
        cls:'start-page-zoom',
        items:[
            {
                html: '<div class="page"><img src="img/start-page-app-bg-mini.jpg" class="start-page-background"></div>'
            },{
                html: '<div class="page"><img src="img/start-page-header-bg.jpg" class="start-page-header-bg"></div>'
            },{
                html: '<div class="button start-page-menu start-page-menu-nearme"></div>',
                listeners: {
                    tap: {
                        fn: function( e ) {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:1, direction:'left'}]
                            });
                        },
                        element: 'element'
                    }
                }
            },{
                html: '<div class="button start-page-menu start-page-menu-plantrip"></div>',
                listeners: {
                    tap: {
                        fn: function( e ) {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:2, direction:'left'}]
                            });
                        },
                        element: 'element'
                    }
                }
            },{
                html: '<div class="button start-page-menu start-page-menu-about"></div>',
                listeners: {
                    tap: {
                        fn: function( e ) {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:3, direction:'left'}]
                            });
                        },
                        element: 'element'
                    }
                }
            },{
                html: '<div class="button start-page-menu start-page-menu-settings"></div>',
                listeners: {
                    tap: {
                        fn: function( e ) {
                            App.app.dispatch({
                                controller:'PageController',
                                action:'goPage',
                                args:[{nextPage:4, direction:'left'}]
                            });
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {

    },
    show: function() {
        setTimeout(hideSplash, 2000);
    },
    update:function(){
//        Ext.getCmp('MainPagePanel').hide();
//        Ext.getCmp('MainPagePanel').show();
    }
});
