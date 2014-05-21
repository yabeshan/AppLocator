

Ext.define('App.view.PopupPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popupPanel',
    id:'popupPanel',

    config: {
        layout:'fit',
        style:'position:absolute',
        items:[{
            cls:'info-zoom',
            style:'background-color: rgba(255,255,255,.8);height:100%;width:100%;color:#6cb25e;font-weight:bold;padding:30px',
            html:'<div style="float:right">Fuel Type</div>'
                +'<div style="float:right">Vehicle Type</div>'
                +'<div style="float:right">Hours of Operation</div>'
                +'<div style="float:right">Flow Rate</div>'
                +'<div style="float:right">Payment Types</div>'
        },{
            cls:'info-zoom',
            style:'bottom:0px;height:36px',
            html:'<div style="background-color: #f1f2f2;height: 36px;width:100%;bottom:0px">'
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
        }]
    }
});

/*
Ext.define('App.view.Popup1Panel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popup1Panel',
    id:'popup1Panel',

    config: {
        items:[{
            cls:'info-zoom',
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
            cls:'info-zoom',
            html:'<div style="background-color: #FFF;height:309px;width:100%">'
                + '<img src="img/main-page-moreinfo-popup1.png" style="width:270px;height:299px;" /></div>'
        },{
            cls:'info-zoom',
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
            cls:'info-zoom',
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
            cls:'info-zoom',
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
            cls:'info-zoom',
            html:'<div style="background-color: #FFF;height:309px;width:100%">'
                + '<img src="img/main-page-moreinfo-popup2.png" style="width:270px;height:319px;" /></div>'
        }]
    }
});
*/


Ext.define('App.view.ChangeInfoPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.changeInfoPanel',
    id:'changeInfoPanel',

    config: {
        items:[
            {
                cls:'main-page-changeinfo-panel',
                xtype:'popupPanel'
//            },{
//                cls:'main-page-changeinfo-panel',
//                xtype:'popup1Panel'
//            },{
//                cls:'main-page-changeinfo-panel',
//                xtype:'popup2Panel'
            },{
                style:'position:absolute;background:#FFF;bottom:0px;height:50px;width:100%;pointer-events:all',
                title:'',
                html: '<div id="lngBtn" class="main-page-bottom-toolbar-select main-page-toolbar-lng"><img id="lngTop" src="img/main-page-toolbar-corner.png"></div>'
                    + '<div id="cngBtn" class="main-page-bottom-toolbar-select main-page-toolbar-cng"><img id="cngTop" src="img/main-page-toolbar-corner.png"></div>'
                    + '<div id="dotsBtn" class="main-page-bottom-toolbar main-page-toolbar-dots"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="dotsBtn") {
                                Ext.getCmp('changeInfoPanel').showPopup1();
                            } else if (node.id=="lngBtn") {
                                Ext.getCmp("changeInfoPanel").changeSelectFilter("lngBtn");
                            } else if (node.id=="cngBtn") {
                                Ext.getCmp("changeInfoPanel").changeSelectFilter("cngBtn");
                            }



                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    lngSelectFlag:true,
    cngSelectFlag:true,
    changeSelectFilter: function(id) {
        var flag, btn;
        if (id=="lngBtn") {
            flag = this.lngSelectFlag;
            if (flag) {
                Ext.get("lngTop").setVisible(false);
                Ext.get("lngBtn").removeCls("main-page-bottom-toolbar-select");
                Ext.get("lngBtn").addCls("main-page-bottom-toolbar");
                this.lngSelectFlag = false;
            } else {
                Ext.get("lngTop").setVisible(true);
                Ext.get("lngBtn").removeCls("main-page-bottom-toolbar");
                Ext.get("lngBtn").addCls("main-page-bottom-toolbar-select");
                this.lngSelectFlag = true;
            }
        } else if (id=="cngBtn") {
            flag = this.cngSelectFlag;
            if (flag) {
                Ext.get("cngTop").setVisible(false);
                Ext.get("cngBtn").removeCls("main-page-bottom-toolbar-select");
                Ext.get("cngBtn").addCls("main-page-bottom-toolbar");
                this.cngSelectFlag = false;
            } else {
                Ext.get("cngTop").setVisible(true);
                Ext.get("cngBtn").removeCls("main-page-bottom-toolbar");
                Ext.get("cngBtn").addCls("main-page-bottom-toolbar-select");
                this.cngSelectFlag = true;
            }
        } else {
            return;
        }

        Ext.getCmp('mapPanel').onSearchTypeStations( this.lngSelectFlag, this.cngSelectFlag );
    },

    initialize: function() {
        this.hidePopup1();
    },
    update:function(){

    },
    showPopup1: function() {
        Ext.getCmp('popupPanel').show();
        Ext.getCmp('popupPanel').setStyle({'pointer-events':'all'});
    },
    hidePopup1: function() {
        Ext.getCmp('popupPanel').hide();
        Ext.getCmp('popupPanel').setStyle({'pointer-events':'none'});
    }

});
