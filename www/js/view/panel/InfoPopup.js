
Ext.define('App.view.InfoPopup' ,{
    extend: 'Ext.Container',
    alias : 'widget.infoPopup',
    id:'infoPopup',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:#FFF;top:0px;left:0px;font-size:16px;font-weight:bold',
                html:'<img id="info-close" src="img/popup-close-button.png" >' +
                    '<div class="info-popup-header"><div id="goDirect">Get Directions</div><div id="goPlanner">Add to Trip</div><div id="goShare">Share</div>' +
                    '<div id="stationStatus">Operational</div>' +
                    '<div class="info-popup-flow-rate">Flow Rate</div><div id="flow-rate-low-info">Standard</div><div id="flow-rate-medium-info">Quick</div><div id="flow-rate-hight-info">Rapid</div></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="goDirect") {
                                var flag1 = (document.getElementById('tp-end-point-0').value.length>0),
                                    flag2 = (document.getElementById('tp-end-point-1').value.length>0),
                                    flag3 = (document.getElementById('item-end-point-1') != null );
                                Ext.getCmp('infoPopup').closePopup();
                                if ( flag1 || flag2 || flag3 ) {
                                    var message = 'Your current trip will be cleared';
                                    viewInfoPopup(" ", message, function(key) {
                                        if (key==1) {
                                            Ext.getCmp('tripPlaner').openPopup({'type':'get', 'point':Ext.getCmp('infoPopup').stationAddress });
                                        }
                                    }, 'OK,Cancel');
                                } else {
                                    Ext.getCmp('tripPlaner').openPopup({'type':'get', 'point':Ext.getCmp('infoPopup').stationAddress });
                                }
                            } else if (node.id=="goPlanner") {
                                Ext.getCmp('tripPlaner').openPopup({'type':'add', 'point':Ext.getCmp('infoPopup').stationAddress });
                                Ext.getCmp('infoPopup').closePopup();
                            } else if (node.id=="goShare") {
                                Ext.getCmp('sharePanel').showShare( true );
                                Ext.getCmp('infoPopup').closePopup();
                            } else if (node.id=="info-close") {
                                Ext.getCmp('infoPopup').closePopup();
                            }
                        },
                        element: 'element'
                    }
                }

            },{
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;bottom:10px;top:170px;left:0px;font-size:16px;font-weight:bold',
                scrollable: {
                    direction: 'vertical'
                },
                html:'<div class="info-popup-details">' +
                    '<div id="stationName"></div>' +
                    '<div id="stationAddressHolder"><div id="stationAddress"></div></div>' +
                    '<div id="stationDetails"></div></div>' +
                    '<div class="info-popup-fuel-types"><div style="padding-left: 10px">Fuel Types Offered</div><div id="fuel-type-cng-info"></div>' +
                    '<div id="fuel-type-lng-info"></div><div id="fuel-type-redeem-info"></div><div id="fuel-type-disel-info"></div></div>' +
                    '<div class="info-popup-vehicle-types"><div style="clear: both">Vehicle Types Accepted</div>' +
                    '<div id="vehicle-type-cars-info"></div><div id="vehicle-type-box-info"></div><div id="vehicle-type-tractor-info"></div><div id="vehicle-type-semi-info"></div></div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="stationAddressHolder") {
                                if (window && window.plugins && window.plugins.clipboard) {
                                    window.plugins.clipboard.copy(Ext.get("stationAddress").dom.innerText);
                                    viewInfoPopup(" ", "The address has been copied.");
                                }
                            }
                        },
                        element: 'element'
                    }
                }
            }
        ]
    },

    initialize: function() {
        Ext.getCmp('infoPopup').closePopup();
    },
    stationName:null,
    stationAddress:null,
    stationHours:null,
    stationAccepts:null,
    openPopup: function(model) {
        if (model==null) return;
        Ext.getCmp('infoPopup').show();

        this.stationName = model.get('StationName');
        this.stationAddress = model.get('StationAddress')+" "+model.get('StationCity')+", "+model.get('StationState')+" "+model.get('StationZip');
        this.stationHours = (model.get('HoursOpenIs24H')=="Yes") ? 'Open 24/7' : (model.get('HoursOpen')||"");//'M-F 8:00am - 6:00pm';


//        if (station.HoursOpenIs24H == "Yes")
//            stBottomStHours.text("Open 24/7");
//        else if (station.HoursOpen == '')
//            stBottomStHours.text('Not Avail');
//        else
//            stBottomStHours.text(station.HoursOpen);


        this.stationAccepts  = "";
        this.stationAccepts += (model.get('PaymentTypesAcceptedAmex')=="Yes") ? "Amex, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedCleanEnergyFuelCard')=="Yes") ? "Clean Energy Fuel Card, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedComData')=="Yes") ? "ComData, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedDiscover')=="Yes") ? "Discover, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedEFS')=="Yes") ? "EFS, " : "" ;

        this.stationAccepts += (model.get('PaymentTypesAcceptedFuelmanFleetwide')=="Yes") ? "Fuelman Fleetwide, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedLegacyEFS')=="Yes") ? "Legacy EFS, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedMasterCard')=="Yes") ? "MasterCard, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedMasterCardFleet')=="Yes") ? "MasterCard Fleet, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedPFGiftCard')=="Yes") ? "PFGiftCard, " : "" ;

        this.stationAccepts += (model.get('PaymentTypesAcceptedSpeedway')=="Yes") ? "Speedway, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedTCH')=="Yes") ? "TCH, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedTcheck')=="Yes") ? "Tcheck, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedVisa')=="Yes") ? "Visa, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedVisaFleet')=="Yes") ? "Visa Fleet, " : "" ;

        this.stationAccepts += (model.get('PaymentTypesAcceptedVoyager')=="Yes") ? "Voyager, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedWrightExpress')=="Yes") ? "WEX, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedWEXFleetone')=="Yes") ? "WEX Fleetone, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedTranStar')=="Yes") ? "Other" : "";//"TranStar, " : "" ;
        this.stationAccepts += (model.get('PaymentTypesAcceptedNaturalFuels')=="Yes") ? "Other" : "";//"NaturalFuels, " : "" ;

        if ( this.stationAccepts.lastIndexOf(",")==(this.stationAccepts.length-2) ) this.stationAccepts = this.stationAccepts.substr(0, this.stationAccepts.length-2);
        else if ( this.stationAccepts.indexOf("OtherOther")>=0 ) this.stationAccepts = this.stationAccepts.substr(0, this.stationAccepts.length-5);

        Ext.get("stationName").dom.innerHTML = this.stationName;
        var adress = ' '+ this.stationAddress,
            hours = '<font style="font-size:12px;">Hours: <font style="font-weight:normal;font-style: italic">'+this.stationHours+'</font></font><br/>',
            accepts = '<font style="font-size:12px;">Accepts: <font style="font-weight:normal;font-style: italic">'+this.stationAccepts+'</font></font>';


        Ext.get("stationAddress").dom.innerHTML = adress;
        Ext.get("stationDetails").dom.innerHTML = hours + accepts;

        if (model.get('StationStatus')=="Under Maintenance") {
            Ext.get("stationStatus").dom.innerHTML = "Under Maintenance";
            Ext.get("stationStatus").setStyle({'top':'11px'});
        } else if (model.get('StationStatus')=="Coming Soon") {
            Ext.get("stationStatus").dom.innerHTML = "Coming<br>Soon";
            Ext.get("stationStatus").setStyle({'top':'11px'});
        } else {
            Ext.get("stationStatus").dom.innerHTML = "Operational";
            Ext.get("stationStatus").setStyle({'top':'26px'});
        }

        if ( model.get('StationFuelTypeCNG')=="Yes" ) Ext.get("fuel-type-cng-info").addCls('select');
        else Ext.get("fuel-type-cng-info").removeCls('select');
        if ( model.get('StationFuelTypeLNG')=="Yes" ) Ext.get("fuel-type-lng-info").addCls('select');
        else Ext.get("fuel-type-lng-info").removeCls('select');
        if ( model.get('StationFuelTypeDSL')=="Yes" ) Ext.get("fuel-type-disel-info").addCls('select');
        else Ext.get("fuel-type-disel-info").removeCls('select');
        if ( model.get('StationFuelTypeRDM')=="Yes" ) Ext.get("fuel-type-redeem-info").addCls('select');
        else Ext.get("fuel-type-redeem-info").removeCls('select');

        if ( model.get('VehicleTypesCarsAndVans')=="Yes" || model.get('VehicleTypesBoxTrucks')=="Yes" || model.get('VehicleTypesSemiTrucks')=="Yes" ) Ext.get("vehicle-type-cars-info").addCls('select');
        else Ext.get("vehicle-type-cars-info").removeCls('select');
        if ( model.get('VehicleTypesBoxTrucks')=="Yes" || model.get('VehicleTypesSemiTrucks')=="Yes" ) {
            Ext.get("vehicle-type-box-info").addCls('select');
            Ext.get("vehicle-type-tractor-info").addCls('select');
        } else {
            Ext.get("vehicle-type-box-info").removeCls('select');
            Ext.get("vehicle-type-tractor-info").removeCls('select');
        }
        if ( model.get('VehicleTypesSemiTrucks')=="Yes" ) Ext.get("vehicle-type-semi-info").addCls('select');
        else Ext.get("vehicle-type-semi-info").removeCls('select');

        if ( model.get('CNG3000HighFlowNozzle')=="Yes" ) {
            Ext.get("flow-rate-low-info").removeCls('select');
            Ext.get("flow-rate-medium-info").removeCls('select');
            Ext.get("flow-rate-hight-info").addCls('select');
        } else if ( model.get('CNG3000StandardNozzle')=="Yes" ) {
            Ext.get("flow-rate-low-info").removeCls('select');
            Ext.get("flow-rate-medium-info").addCls('select');
            Ext.get("flow-rate-hight-info").removeCls('select');
        } else if ( model.get('CNG3000PSI')=="Yes" ) {
            Ext.get("flow-rate-low-info").addCls('select');
            Ext.get("flow-rate-medium-info").removeCls('select');
            Ext.get("flow-rate-hight-info").removeCls('select');
        }
    },
    closePopup: function() {
        Ext.getCmp('infoPopup').hide();
    }

});