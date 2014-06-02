

Ext.define('App.view.PopupPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popupPanel',
    id:'popupPanel',

    config: {
        layout:'fit',
        style:'position:absolute',
        items:[{
            cls:'info-zoom',
            style:'position:relative;background-color: rgba(255,255,255,.9);height:100%;width:100%;color:#6cb25e;font-weight:bold;padding-top:10px',
            html:'<div class="holder-fuel-type">Fuel Type<div id="fuel-type-cng" class="select"></div>'
                    +'<div id="fuel-type-lng" class="select"></div><div id="fuel-type-disel" class="select"></div>'
                    +'<div id="fuel-type-redeem" class="select"></div></div>'
                +'<div class="holder-vehicle-type">Vehicle Type</div>'
                +'<div class="holder-hours-type">Hours of Operation</div>'
                +'<div class="holder-flow-type">Flow Rate</div>'
                +'<div class="holder-payment-type">Payment Types</div>',
            listeners: {
                tap: {
                    fn: function( e, node ) {
                        Ext.getCmp('popupPanel').clickHandler(node.id);
                    },
                    element: 'element'
                }
            }
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
                            Ext.getCmp('popupPanel').applyHandler();
                        } else if (node.id=="defaultsBtn") {
                            Ext.getCmp('popupPanel').defaultHandler();
                        }
                    },
                    element: 'element'
                }
            }
        }]
    },

    clickHandler: function(id) {
        switch(id) {
            case "fuel-type-cng":
            case "fuel-type-lng":
            case "fuel-type-disel":
            case "fuel-type-redeem":
                this.changeFuelType( Ext.get(id) );
                break;
        }
    },

    changeFuelType: function(cmp) {
        if (cmp.hasCls('select')) cmp.removeCls('select');
        else cmp.addCls('select');
    },

    applyHandler: function() {
        var cngFlag = Ext.get("fuel-type-cng").hasCls('select'),
            lngFlag = Ext.get("fuel-type-lng").hasCls('select'),
            parent = Ext.getCmp('changeInfoPanel'),
            changeFlag = false;
        if (parent.cngSelectFlag != cngFlag) {
            changeFlag = true;
            parent.changeSelectFilter("cngBtn");
        }
        if (parent.lngSelectFlag != lngFlag) {
            changeFlag = true;
            parent.changeSelectFilter("lngBtn");
        }
        if (changeFlag) {
            Ext.getCmp('mapPanel').onSearchTypeStations( parent.lngSelectFlag, parent.cngSelectFlag );
        }
        parent.hidePopup1();
    },

    defaultHandler: function() {
        Ext.get("fuel-type-cng").addCls('select');
        Ext.get("fuel-type-lng").addCls('select');
        Ext.get("fuel-type-disel").addCls('select');
        Ext.get("fuel-type-redeem").addCls('select');
    }

});


Ext.define('App.view.ChangeInfoPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.changeInfoPanel',
    id:'changeInfoPanel',

    config: {
        items:[
            {
                style:'position:absolute;background:#FFF;bottom:0px;height:50px;width:100%;pointer-events:all',
                title:'',
                html: '<div id="lngBtn" class="main-page-bottom-toolbar-select main-page-toolbar-lng"><img id="lngTop" src="img/main-page-toolbar-corner.png"></div>'
                    + '<div id="cngBtn" class="main-page-bottom-toolbar-select main-page-toolbar-cng"><img id="cngTop" src="img/main-page-toolbar-corner.png"></div>'
                    + '<div id="dotsBtn" class="main-page-bottom-toolbar main-page-toolbar-dots"></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            var that = Ext.getCmp('changeInfoPanel');
                            if (node.id=="dotsBtn") {
                                that.showPopup1();
                            } else if (node.id=="lngBtn") {
                                that.changeSelectFilter("lngBtn");
                                Ext.getCmp('mapPanel').onSearchTypeStations( that.lngSelectFlag, that.cngSelectFlag );
                            } else if (node.id=="cngBtn") {
                                that.changeSelectFilter("cngBtn");
                                Ext.getCmp('mapPanel').onSearchTypeStations( that.lngSelectFlag, that.cngSelectFlag );
                            }
                        },
                        element: 'element'
                    }
                }
            },{
                cls:'main-page-changeinfo-panel',
                xtype:'popupPanel'
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
        }
    },

    initialize: function() {
//        this.showPopup1();
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
