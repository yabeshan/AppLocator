

Ext.define('App.view.PopupPanel' ,{
    extend: 'Ext.Container',
    alias : 'widget.popupPanel',
    id:'popupPanel',

    config: {
        layout:'fit',
        style:'position:absolute',
        items:[{
            cls:'info-zoom',
            id:'filter-type',
            style:'zoom:89%;font-size:25px;position:relative;background-color: #FFF;height:100%;width:100%;padding-top:10px;',
            html:'<div class="holder-fuel-type"><span class="holder-title">Fuel Type</span><div id="fuel-type-cng" class="select filter-img-zoom"></div>'
                    +'<div id="fuel-type-lng" class="select filter-img-zoom"></div><div id="fuel-type-redeem" class="select filter-img-zoom"></div>'
                    +'<div id="fuel-type-disel" class="select filter-img-zoom"></div></div>'
                +'<div class="holder-vehicle-type"><span class="holder-title">Vehicle Type</span><div id="vehicle-type-cars" class="filter-img-zoom"></div>'
                    +'<div id="vehicle-type-box" class="filter-img-zoom"></div><div id="vehicle-type-tractor" class="filter-img-zoom"></div><div id="vehicle-type-semi" class="filter-img-zoom"></div></div>'
                +'<div class="holder-station-status"><span class="holder-title">Station Status</span><div id="station-operational" class="select filter-lbl-zoom">Operational</div>'
                    +'<div id="station-under" class="select filter-lbl-zoom">Under Maintenance</div><div id="station-coming" class="filter-lbl-zoom">Coming Soon</div></div>'
                +'<div class="holder-hours-type"><span class="holder-title">Hours of Operation</span><div id="hours-type-24" class="filter-lbl-zoom">24/7</div>'
                    +'<div id="hours-type-now" class="filter-lbl-zoom">Open Now</div></div>'
                +'<div class="holder-flow-type"><span class="holder-title">Flow Rate</span><div id="flow-rate-low" class="filter-img-zoom"></div>'
                    +'<div id="flow-rate-medium" class="filter-img-zoom"></div><div id="flow-rate-hight" class="filter-img-zoom"></div></div>'
                +'<div id="scroll-next" style="width: 100%;height: 80px;position: absolute;cursor:pointer;bottom:5px;background-image: url(img/main-page-moreinfo-bottom-arrow.png);background-position: center center;background-repeat: no-repeat;background-size: 161px 115px;"></div>',
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
            id:'filter-pay',
            style:'zoom:89%;background-color:#FFF;position:absolute;top:0px;left:0px;width:100%;height:100%;',
            html:
                '<div id="scroll-back" style="width: 100%;height: 80px;position: absolute;cursor:pointer;top:10px;background-image: url(img/main-page-moreinfo-top-arrow.png);background-position: center center;background-repeat: no-repeat;background-size: 161px 115px;"></div>'
                +'<div class="holder-payment-type">' +
                '<span class="holder-title">Payment Types</span>' +
                '<div id="payment-any" class="filter-lbl-zoom">All</div>'
                +'<div id="payment-clean" class="filter-lbl-zoom">Clean Energy Fuel Card</div><div id="payment-visa" class="filter-lbl-zoom">Visa</div>'
                +'<div id="payment-master" class="filter-lbl-zoom">Mastercard</div><div id="payment-amex" class="filter-lbl-zoom">Amex</div><div id="payment-discover" class="filter-lbl-zoom">Discover</div><div id="payment-voyager" class="filter-lbl-zoom">Voyager</div>'
                +'<div id="payment-wex" class="filter-lbl-zoom">WEX</div><div id="payment-cash" class="filter-lbl-zoom">Cash</div>' +
                '<div id="payment-other" class="filter-lbl-zoom">Other</div><div id="payment-comdata" class="filter-lbl-zoom">ComData</div><div id="payment-master-fleet" class="filter-lbl-zoom">MasterCard Fleet</div>' +
                '<div id="payment-tch" class="filter-lbl-zoom">TCH</div><div id="payment-tcheck" class="filter-lbl-zoom">Tcheck</div><div id="payment-efs" class="filter-lbl-zoom">EFS</div>' +
                '<div id="payment-fuelman" class="filter-lbl-zoom">Fuelman Fleetwide</div><div id="payment-legacy" class="filter-lbl-zoom">Legacy EFS</div><div id="payment-gift" class="filter-lbl-zoom">PFGiftCard</div>' +
                '<div id="payment-speedway" class="filter-lbl-zoom">Speedway</div><div id="payment-visa-fleet" class="filter-lbl-zoom">Visa Fleet</div><div id="payment-wex-fleet" class="filter-lbl-zoom">WEX Fleetone</div>' +
                '</div>',
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
        if (id=="scroll-next") {
            Ext.getCmp('filter-pay').show();
            return;
        } else if (id=="scroll-back") {
            Ext.getCmp('filter-pay').hide();
            return;
        }

        switch(id) {
            case "fuel-type-cng":
            case "fuel-type-lng":
            case "fuel-type-disel":
            case "fuel-type-redeem":

            case "vehicle-type-cars":
            case "vehicle-type-box":
            case "vehicle-type-tractor":
            case "vehicle-type-semi":

            case "station-operational":
            case "station-under":
            case "station-coming":

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

            case "payment-comdata":
            case "payment-master-fleet":
            case "payment-tch":
            case "payment-tcheck":
            case "payment-efs":
            case "payment-fuelman":
            case "payment-speedway":
            case "payment-visa-fleet":
            case "payment-legacy":
            case "payment-wex-fleet":
            case "payment-gift":
                this.changeFuelType( Ext.get(id) );
                break;
        }
    },

    changeFuelType: function(cmp) {
        if (cmp.hasCls('select')) {
            cmp.removeCls('select');
            if( cmp.id.indexOf("payment")==0 ) {
                this.changePaymentType( cmp.id, true);
            }
        } else {
            cmp.addCls('select');

            if (cmp.id=="vehicle-type-semi") {
                Ext.get("vehicle-type-tractor").addCls('select');
                Ext.get("vehicle-type-box").addCls('select');
                Ext.get("vehicle-type-cars").addCls('select');
            } else if (cmp.id=="vehicle-type-tractor") {
                Ext.get("vehicle-type-box").addCls('select');
                Ext.get("vehicle-type-cars").addCls('select');
            } else if (cmp.id=="vehicle-type-box") {
                Ext.get("vehicle-type-cars").addCls('select');
            }

            if( cmp.id.indexOf("payment")==0 ) {
                this.changePaymentType( cmp.id, false);
            }

        }
    },

    changePaymentType: function(id, flag) {
        var searchFilter = Ext.getCmp('mapPanel').searchFilter;
        searchFilter.paymentSelect = true;

        if (id=="payment-any") {
            searchFilter.paymentAny = flag;
            if (flag) searchFilter.paymentSelect = false;
            Ext.getCmp('popupPanel').selectAllPayment( !flag );
        } else if (id=="payment-clean") {
            searchFilter.paymentCleanEnergy = flag;
        } else if (id=="payment-master") {
            searchFilter.paymentMastercard = flag;
        } else if (id=="payment-wex") {
            searchFilter.paymentWEX = flag;
        } else if (id=="payment-amex") {
            searchFilter.paymentAmex = flag;
        } else if (id=="payment-discover") {
            searchFilter.paymentDiscover = flag;
        } else if (id=="payment-voyager") {
            searchFilter.paymentVoyager = flag;
        } else if (id=="payment-comdata") {
            searchFilter.paymentComdata = flag;
        } else if (id=="payment-tch") {
            searchFilter.paymentTCH = flag;
        } else if (id=="payment-tcheck") {
            searchFilter.paymentTcheck = flag;
        } else if (id=="payment-efs") {
            searchFilter.paymentEFS = flag;
        } else if (id=="payment-master-fleet") {
            searchFilter.paymentMasterFleet = flag;
        } else if (id=="payment-fuelman") {
            searchFilter.paymentFuelman = flag;
        } else if (id=="payment-speedway") {
            searchFilter.paymentSpeedway = flag;
        } else if (id=="payment-visa-fleet") {
            searchFilter.paymentVisaFleet = flag;
        } else if (id=="payment-legacy") {
            searchFilter.paymentLegacy = flag;
        } else if (id=="payment-wex-fleet") {
            searchFilter.paymentWexFleet = flag;
        } else if (id=="payment-visa") {
            searchFilter.paymentVisa = flag;
        } else if (id=="payment-cash") {
            searchFilter.paymentCash = flag;
        } else if (id=="payment-gift") {
            searchFilter.paymentGift = flag;
        } else if (id=="payment-other") {
            searchFilter.paymentOther = flag;
        }
    },

    applyHandler: function() {
        var parent = Ext.getCmp('changeInfoPanel'),
            panel = Ext.getCmp('mapPanel'),

            cngFlag = Ext.get("fuel-type-cng").hasCls('select'),
            lngFlag = Ext.get("fuel-type-lng").hasCls('select'),

            operFlag = Ext.get("station-operational").hasCls('select'),
            underFlag = Ext.get("station-under").hasCls('select'),
            comingFlag = Ext.get("station-coming").hasCls('select');

        if (cngFlag != panel.searchFilter.StationFuelTypeCNG) {
            parent.changeSelectFilter("cngBtn");
        }
        if (lngFlag != panel.searchFilter.StationFuelTypeLNG) {
            parent.changeSelectFilter("lngBtn");
        }
        panel.searchFilter.StationFuelTypeRDM = Ext.get("fuel-type-redeem").hasCls('select');

        panel.searchFilter.StationStatusActive = operFlag;
        panel.searchFilter.StationStatusUnder = underFlag;
        panel.searchFilter.StationStatusComing = comingFlag;

        panel.searchFilter.VehicleTypesCarsAndVans = Ext.get("vehicle-type-cars").hasCls('select');
        panel.searchFilter.VehicleTypesBoxTrucks = Ext.get("vehicle-type-box").hasCls('select');
        panel.searchFilter.VehicleTypesTractor = Ext.get("vehicle-type-tractor").hasCls('select');
        panel.searchFilter.VehicleTypesSemiTrucks = Ext.get("vehicle-type-semi").hasCls('select');

        panel.searchFilter.HoursOpenIs24H = Ext.get("hours-type-24").hasCls('select');
        panel.searchFilter.HoursOpenNow = Ext.get("hours-type-now").hasCls('select');

        panel.searchFilter.FlowRateLow = Ext.get("flow-rate-low").hasCls('select');
        panel.searchFilter.FlowRateMedium = Ext.get("flow-rate-medium").hasCls('select');
        panel.searchFilter.FlowRateHigh = Ext.get("flow-rate-hight").hasCls('select');

        panel.searchFilter.paymentAny = Ext.get("payment-any").hasCls('select');
        panel.searchFilter.paymentMastercard = Ext.get("payment-master").hasCls('select');
        panel.searchFilter.paymentWEX = Ext.get("payment-wex").hasCls('select');
        panel.searchFilter.paymentCleanEnergy = Ext.get("payment-clean").hasCls('select');
        panel.searchFilter.paymentAmex = Ext.get("payment-amex").hasCls('select');
        panel.searchFilter.paymentCash = Ext.get("payment-cash").hasCls('select');
        panel.searchFilter.paymentDiscover = Ext.get("payment-discover").hasCls('select');
        panel.searchFilter.paymentOther = Ext.get("payment-other").hasCls('select');
        panel.searchFilter.paymentVisa = Ext.get("payment-visa").hasCls('select');
        panel.searchFilter.paymentVoyager = Ext.get("payment-voyager").hasCls('select');

        panel.onSearchTypeStations();
        parent.hidePopup1();
    },

    defaultHandler: function() {
        Ext.get("fuel-type-cng").addCls('select');
        Ext.get("fuel-type-lng").addCls('select');
        Ext.get("fuel-type-disel").addCls('select');
        Ext.get("fuel-type-redeem").addCls('select');

        Ext.get("vehicle-type-cars").removeCls('select');
        Ext.get("vehicle-type-box").removeCls('select');
        Ext.get("vehicle-type-tractor").removeCls('select');
        Ext.get("vehicle-type-semi").removeCls('select');

        Ext.get("station-operational").addCls('select');
        Ext.get("station-under").addCls('select');
        Ext.get("station-coming").removeCls('select');

        Ext.get("hours-type-24").removeCls('select');
        Ext.get("hours-type-now").removeCls('select');

        Ext.get("flow-rate-low").removeCls('select');
        Ext.get("flow-rate-medium").removeCls('select');
        Ext.get("flow-rate-hight").removeCls('select');

        this.selectAllPayment(false);

        var parent = Ext.getCmp('changeInfoPanel');
        parent.hidePopup1();
        if (Ext.get("cngBtn").hasCls('main-page-bottom-toolbar') ) parent.changeSelectFilter("cngBtn");
        if (Ext.get("lngBtn").hasCls('main-page-bottom-toolbar') ) parent.changeSelectFilter("lngBtn");

        Ext.getCmp('mapPanel').searchFilter = Ext.getCmp('mapPanel').searchFilterDefault();
        Ext.getCmp('mapPanel').onSearchTypeStations();
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

            Ext.get("payment-comdata").addCls('select');
            Ext.get("payment-master-fleet").addCls('select');
            Ext.get("payment-tch").addCls('select');
            Ext.get("payment-tcheck").addCls('select');
            Ext.get("payment-efs").addCls('select');
            Ext.get("payment-fuelman").addCls('select');
            Ext.get("payment-speedway").addCls('select');
            Ext.get("payment-visa-fleet").addCls('select');
            Ext.get("payment-legacy").addCls('select');
            Ext.get("payment-wex-fleet").addCls('select');
            Ext.get("payment-gift").addCls('select');
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

            Ext.get("payment-comdata").removeCls('select');
            Ext.get("payment-master-fleet").removeCls('select');
            Ext.get("payment-tch").removeCls('select');
            Ext.get("payment-tcheck").removeCls('select');
            Ext.get("payment-efs").removeCls('select');
            Ext.get("payment-fuelman").removeCls('select');
            Ext.get("payment-speedway").removeCls('select');
            Ext.get("payment-visa-fleet").removeCls('select');
            Ext.get("payment-legacy").removeCls('select');
            Ext.get("payment-wex-fleet").removeCls('select');
            Ext.get("payment-gift").removeCls('select');
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
                    + '<div id="dotsBtn" class="main-page-bottom-toolbar main-page-toolbar-dots"></div>'
                    + '<div id="listToTripBtn" style="position: absolute;bottom:60px;left:10px;background-color: rgba(255,255,255,.6);padding:10px;visibility:hidden;cursor: pointer">Trip Details</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            var that = Ext.getCmp('changeInfoPanel');
                            if (node.id=="dotsBtn") {
                                that.showPopup1();
                            } else if (node.id=="lngBtn") {
                                that.changeSelectFilter("lngBtn");
                                Ext.getCmp('mapPanel').onSearchTypeStations();
                            } else if (node.id=="cngBtn") {
                                that.changeSelectFilter("cngBtn");
                                Ext.getCmp('mapPanel').onSearchTypeStations();
                            } else if (node.id=="listToTripBtn") {
                                Ext.getCmp('tripPlaner').openRouteViewer();
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

    changeSelectFilter: function(id) {
        Ext.getCmp('mapPanel').searchFilter.StationFuelTypeRDM = false;
        var selectFlag, panel = Ext.getCmp('mapPanel');
        if (id=="lngBtn") {
            selectFlag = Ext.get("lngBtn").hasCls('main-page-bottom-toolbar-select');
            if( selectFlag ) {
                Ext.get("lngTop").setVisible(false);
                Ext.get("lngBtn").removeCls("main-page-bottom-toolbar-select");
                Ext.get("lngBtn").addCls("main-page-bottom-toolbar");
                panel.searchFilter.StationFuelTypeLNG = false;
            } else {
                Ext.get("lngTop").setVisible(true);
                Ext.get("lngBtn").removeCls("main-page-bottom-toolbar");
                Ext.get("lngBtn").addCls("main-page-bottom-toolbar-select");
                panel.searchFilter.StationFuelTypeLNG = true;
            }
        } else if (id=="cngBtn") {
            selectFlag = Ext.get("cngBtn").hasCls('main-page-bottom-toolbar-select');
            if ( selectFlag ) {
                Ext.get("cngTop").setVisible(false);
                Ext.get("cngBtn").removeCls("main-page-bottom-toolbar-select");
                Ext.get("cngBtn").addCls("main-page-bottom-toolbar");
                panel.searchFilter.StationFuelTypeCNG = false;
            } else {
                Ext.get("cngTop").setVisible(true);
                Ext.get("cngBtn").removeCls("main-page-bottom-toolbar");
                Ext.get("cngBtn").addCls("main-page-bottom-toolbar-select");
                panel.searchFilter.StationFuelTypeCNG = true;
            }
        }
    },

    initialize: function() {
        this.hidePopup1();
//        this.showPopup1();
    },
    update:function(){

    },
    showPopup1: function() {
        Ext.getCmp('popupPanel').show();
        Ext.getCmp('popupPanel').setStyle({'pointer-events':'all'});

        Ext.getCmp('filter-pay').hide();
    },
    hidePopup1: function() {
        Ext.getCmp('popupPanel').hide();
        Ext.getCmp('popupPanel').setStyle({'pointer-events':'none'});
    }

});
