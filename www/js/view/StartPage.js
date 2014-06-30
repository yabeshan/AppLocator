


Ext.define('App.view.StartPage' ,{
    extend: 'Ext.Container',
    alias : 'widget.startPage',
    id:'StartPage',

    config: {
        layout: 'hbox',
        items:[
            {
                flex:1
            },{
                id:'page-holder',
                layout: 'vbox',
                items:[
                    {
                        flex:5,
                        id:'logo-holder'
                    },{
                        layout: 'hbox',
                        items:[
                            {
                                id:'map-btn',
                                flex:1,
                                cls:'start-page-menu-nearme start-page-menu'
                            },{
                                id:'planner-btn',
                                flex:1,
                                cls:'start-page-menu-plantrip start-page-menu'
                            }
                        ]
                    },{
                        layout: 'hbox',
                        items:[
                            {
                                id:'about-btn',
                                flex:1,
                                cls:'start-page-menu-about start-page-menu'
                            },{
                                id:'settings-btn',
                                flex:1,
                                cls:'start-page-menu-settings start-page-menu'
                            }
                        ]
                    }
                ]
            },{
                flex:1
            }
        ]
    },

    initialize: function() {
//        var pixelRatio = window.devicePixelRatio || 1,
//            windowWidth = window.innerWidth / pixelRatio,
//            windowHeight = window.innerHeight / pixelRatio,
        var windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            maxBtnWidth = windowWidth * .5;

        if (maxBtnWidth > 512) maxBtnWidth = 512;
        if (maxBtnWidth*3 > windowHeight) maxBtnWidth = windowHeight / 3;

        var holderWidth = maxBtnWidth*2+'px',
            btnHeight = maxBtnWidth + 'px',
            btnArr = ['map-btn', 'planner-btn', 'about-btn', 'settings-btn'];

        if (maxBtnWidth*2 < windowWidth) {
            this.setStyle({'background-image':'url(img/start-page-app-bg.jpg)', 'background-size':'100% 100%'});
        }

        Ext.get('page-holder').setStyle({'width':holderWidth});

        var k = 0, lng = btnArr.length;
        for (k;k<lng;k++) {
            Ext.get( btnArr[k] )
                .setStyle({'height':btnHeight})
                .on('tap', function(b, e){
                    var nextPageID = 1;
                    switch(this.id) {
                        case 'planner-btn':
                            Ext.getCmp('tripPlaner').openPopup();
                            break;
                        case 'about-btn':
                            nextPageID = 3;
                            break;
                        case 'settings-btn':
                            nextPageID = 4;
                            break;
                    }

                    App.app.dispatch({
                        controller:'PageController',
                        action:'goPage',
                        args:[{nextPage:nextPageID, direction:'left'}]
                    });
                });
        }

        setTimeout( this.hideSplash, 2000);
    },
    hideSplash: function() {
        if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
    },
    update:function(){

    }
});

