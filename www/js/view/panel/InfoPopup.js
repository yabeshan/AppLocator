
Ext.define('App.view.InfoPopup' ,{
    extend: 'Ext.Container',
    alias : 'widget.infoPopup',
    id:'infoPopup',

    config: {
        items:[
            {
                cls:'info-popup-zoom',
                style:'position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,1);top:0px;left:0px;',
                html:'<div style="position:absolute;width:100%;height:100%;background-image: url(img/popup-station-info.png);background-size: 300px 490px;background-position: center center;background-repeat: no-repeat;">'
                    +'<div id="stationName" style="overflow:hidden;height:24px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-60px;width:280px;color:#30b457"></div>'
                    +'<div id="stationStatus" style="position:absolute;left:50%;margin-left:-135px;top:50%;margin-top:-190px;color:#fff;font-style: italic;fony-size:30px;font-weight: normal;width:140px">Operational</div>'
                    +'<div id="stationAddress" style="overflow:hidden;height:84px;position:absolute;left:50%;margin-left:-140px;top:50%;margin-top:-35px;width:280px;color:#67686a;font-weight:bold;"></div>'
                    +'<div style="position: absolute;top:50%;margin-top: -195px;left: 50%;margin-left: 15px"><div id="goDirect"></div><div id="goPlanner"></div><div id="goShare"></div></div>'

                    +'<div id="fuel-type-redeem-info"></div><div id="fuel-type-cng-info"></div>'
                    +'<div id="fuel-type-lng-info"></div><div id="fuel-type-disel-info"></div>'
                    +'<div id="vehicle-type-cars-info"></div><div id="vehicle-type-box-info"></div><div id="vehicle-type-semi-info"></div>'
                    +'<div id="flow-rate-low-info"></div><div id="flow-rate-medium-info"></div><div id="flow-rate-hight-info"></div>'
                    +'</div>',
                listeners: {
                    tap: {
                        fn: function( e, node ) {
                            if (node.id=="goDirect") {
                                Ext.getCmp('tripPlaner').openPopup({'type':'get', 'point':Ext.getCmp('infoPopup').stationAddress });
                            } else if (node.id=="goPlanner") {
                                Ext.getCmp('tripPlaner').openPopup({'type':'add', 'point':Ext.getCmp('infoPopup').stationAddress });
                            } else if (node.id=="goShare") {
                                Ext.getCmp('searchPanel').showShare();
                            }
                            Ext.getCmp('infoPopup').closePopup();
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
    stationAddress:null,
    openPopup: function(model) {
        if (model==null) return;

        this.stationAddress = model.get('StationAddress')+", "+model.get('StationCity')+", "+model.get('StationState')+", "+model.get('StationZip');
        Ext.get("stationName").dom.innerHTML = model.get('StationName');
        var adress = '<font style="font-size:15px;line-height: 20px;">'+ this.stationAddress +'</font><br>',
            hoursTxt = (model.get('HoursOpenIs24H')=="Yes") ? 'Open 24/7' : 'M-F 8:00am - 6:00pm',
            hours = '<font style="font-size:12px;line-height: 24px;">Hours: <font style="font-weight:normal;font-style: italic">'+hoursTxt+'</font></font><br>',
            accepts = '<font style="font-size:12px;line-height: 24px;">Accepts: <font style="font-weight:normal;font-style: italic">Visa, Clean Fuel Energy Card, Amex</font></font><br>';

        Ext.get("stationAddress").dom.innerHTML = adress + hours + accepts;
            Ext.getCmp('infoPopup').show();

        if (model.get('StationStatus')=="Under Maintenance") {
            Ext.get("stationStatus").dom.innerHTML = "Under Maintenance";
        } else if (model.get('StationStatus')=="Coming Soon") {
            Ext.get("stationStatus").dom.innerHTML = "Coming Soon";
        } else {
            Ext.get("stationStatus").dom.innerHTML = "Operational";
        }

        if ( model.get('StationFuelTypeCNG')=="Yes" ) Ext.get("fuel-type-cng-info").addCls('select');
        else Ext.get("fuel-type-cng-info").removeCls('select');
        if ( model.get('StationFuelTypeLNG')=="Yes" ) Ext.get("fuel-type-lng-info").addCls('select');
        else Ext.get("fuel-type-lng-info").removeCls('select');
        if ( model.get('StationFuelTypeDSL')=="Yes" ) Ext.get("fuel-type-disel-info").addCls('select');
        else Ext.get("fuel-type-disel-info").removeCls('select');
        if ( model.get('StationFuelTypeRDM')=="Yes" ) Ext.get("fuel-type-redeem-info").addCls('select');
        else Ext.get("fuel-type-redeem-info").removeCls('select');

        if ( model.get('VehicleTypesCarsAndVans')=="Yes" ) Ext.get("vehicle-type-cars-info").addCls('select');
        else Ext.get("vehicle-type-cars-info").removeCls('select');
        if ( model.get('VehicleTypesBoxTrucks')=="Yes" ) Ext.get("vehicle-type-box-info").addCls('select');
        else Ext.get("vehicle-type-box-info").removeCls('select');
        if ( model.get('VehicleTypesSemiTrucks')=="Yes" ) Ext.get("vehicle-type-semi-info").addCls('select');
        else Ext.get("vehicle-type-semi-info").removeCls('select');

        if ( model.get('CNG3000PSI')=="Yes" ) Ext.get("flow-rate-low-info").addCls('select');
        else Ext.get("flow-rate-low-info").removeCls('select');
        if ( model.get('CNG3000StandardNozzle')=="Yes" ) Ext.get("flow-rate-medium-info").addCls('select');
        else Ext.get("flow-rate-medium-info").removeCls('select');
        if ( model.get('CNG3000HighFlowNozzle')=="Yes" ) Ext.get("flow-rate-hight-info").addCls('select');
        else Ext.get("flow-rate-hight-info").removeCls('select');
    },
    closePopup: function() {
        Ext.getCmp('infoPopup').hide();
    }

});