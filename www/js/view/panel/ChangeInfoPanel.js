

Ext.define('App.view.PopupPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popupPanel',
    id:'popupPanel',

    config: {
        layout:'fit',
        style:'position:absolute',
        items:[{
            cls:'info-zoom',
            style:'zoom:80%;font-size:14px;position:relative;background-color: rgba(255,255,255,.9);height:100%;width:100%;color:#6cb25e;font-weight:bold;padding-top:10px',
            html:'<div class="holder-fuel-type">Fuel Type<div id="fuel-type-cng" class="select"></div>'
                    +'<div id="fuel-type-lng" class="select"></div><div id="fuel-type-disel" class="select"></div>'
                    +'<div id="fuel-type-redeem" class="select"></div></div>'
                +'<div class="holder-vehicle-type">Vehicle Type<div id="vehicle-type-cars"></div>'
                    +'<div id="vehicle-type-box"></div><div id="vehicle-type-semi"></div></div>'
                +'<div class="holder-hours-type">Hours of Operation<div id="hours-type-24">24/7</div>'
                    +'<div id="hours-type-now">Open Now</div></div>'
                +'<div class="holder-flow-type">Flow Rate<div id="flow-rate-low"></div>'
                    +'<div id="flow-rate-medium"></div><div id="flow-rate-hight"></div></div>'
                +'<div class="holder-payment-type">Payment Types<div id="payment-any">Any</div>'
                    +'<div id="payment-clean">Clean Energy Fuel Card</div><div id="payment-visa">Visa</div>'
                    +'<div id="payment-master">Mastercard</div><div id="payment-amex">Amex</div><div id="payment-discover">Discover</div><div id="payment-voyager">Voyager</div>'
                    +'<div id="payment-wex">WEX</div><div id="payment-cash">Cash</div><div id="payment-other">Other</div></div>',
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
            style:'bottom:0px;height:36px;',
            html:'<div style="background-color: #f1f2f2;height: 36px;width:100%;bottom:0px;">'
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

            case "vehicle-type-cars":
            case "vehicle-type-box":
            case "vehicle-type-semi":

            case "hours-type-24":
            case "hours-type-now":

            case "flow-rate-low":
            case "flow-rate-medium":
            case "flow-rate-hight":

            case "payment-any":
            case "payment-clean":
            case "payment-visa":
            case "payment-master":
            case "payment-amex":
            case "payment-discover":
            case "payment-voyager":
            case "payment-wex":
            case "payment-cash":
            case "payment-other":
                this.changeFuelType( Ext.get(id) );
                break;
        }

        if (id=="payment-any") {
            this.selectAllPayment( Ext.get("payment-any").hasCls("select") );
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

        Ext.get("vehicle-type-cars").removeCls('select');
        Ext.get("vehicle-type-box").removeCls('select');
        Ext.get("vehicle-type-semi").removeCls('select');

        Ext.get("hours-type-24").removeCls('select');
        Ext.get("hours-type-now").removeCls('select');

        Ext.get("flow-rate-low").removeCls('select');
        Ext.get("flow-rate-medium").removeCls('select');
        Ext.get("flow-rate-hight").removeCls('select');

        this.selectAllPayment(false);
    },

    selectAllPayment: function( flag ) {
        if (flag) {
            Ext.get("payment-any").addCls('select');
            Ext.get("payment-clean").addCls('select');
            Ext.get("payment-visa").addCls('select');
            Ext.get("payment-master").addCls('select');
            Ext.get("payment-amex").addCls('select');
            Ext.get("payment-discover").addCls('select');
            Ext.get("payment-voyager").addCls('select');
            Ext.get("payment-wex").addCls('select');
            Ext.get("payment-cash").addCls('select');
            Ext.get("payment-other").addCls('select');
        } else {
            Ext.get("payment-any").removeCls('select');
            Ext.get("payment-clean").removeCls('select');
            Ext.get("payment-visa").removeCls('select');
            Ext.get("payment-master").removeCls('select');
            Ext.get("payment-amex").removeCls('select');
            Ext.get("payment-discover").removeCls('select');
            Ext.get("payment-voyager").removeCls('select');
            Ext.get("payment-wex").removeCls('select');
            Ext.get("payment-cash").removeCls('select');
            Ext.get("payment-other").removeCls('select');
        }
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
